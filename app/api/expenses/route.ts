import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { createClient } from '../../../lib/db';

// Define types for our expense data
interface Expense {
  id: string;
  user_id: string;
  amount: number;
  description: string;
 category: string;
 date: string;
 group_id: string | null;
  created_at: string;
}

// GET /api/expenses - Get all expenses for the current user
export async function GET(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get Supabase client
    const supabase = createClient();

    // Get all expenses for the user
    const { data: expenses, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
    }

    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/expenses - Create a new expense
export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const body = await req.json();
    const { amount, description, category, date, group_id } = body;

    // Validate required fields
    if (!amount || !description) {
      return NextResponse.json({ error: 'Amount and description are required' }, { status: 400 });
    }

    // Get Supabase client
    const supabase = createClient();

    // Insert new expense
    const { data: expense, error } = await supabase
      .from('expenses')
      .insert({
        user_id: user.id,
        amount,
        description,
        category: category || 'Other',
        date: date || new Date().toISOString(),
        group_id: group_id || null,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
    }

    // If this is a group expense, update balances
    if (group_id && expense) {
      await updateGroupBalances(supabase, group_id, expense as Expense);
    }

    return NextResponse.json(expense);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper function to update group balances when a new expense is added
async function updateGroupBalances(
  supabase: ReturnType<typeof createClient>, 
  groupId: string, 
  expense: Expense
) {
  try {
    // Get all group members
    const { data: members, error: membersError } = await supabase
      .from('group_members')
      .select('user_id')
      .eq('group_id', groupId);

    if (membersError) {
      console.error('Failed to fetch group members:', membersError);
      return;
    }

    // Calculate share per person (equal split)
    const share = expense.amount / members.length;

    // Update each member's balance
    for (const member of members) {
      const { error: balanceError } = await supabase
        .from('balances')
        .upsert({
          user_id: member.user_id,
          group_id: groupId,
          amount: member.user_id === expense.user_id ? 
            (expense.amount - share) : // User who paid gets positive balance
            -share, // Other members get negative balance (owe money)
        }, {
          onConflict: 'user_id,group_id'
        });

      if (balanceError) {
        console.error('Failed to update balance:', balanceError);
      }
    }
  } catch (error) {
    console.error('Error updating group balances:', error);
  }
}