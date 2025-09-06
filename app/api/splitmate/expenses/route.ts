import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { createClient } from '@/lib/db';

interface CreateExpenseRequest {
  amount: number;
  description: string;
  category: string;
  participants: string[];
  groupId?: string;
  notes?: string;
}

export async function GET(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create Supabase client
    const supabase = createClient();
    
    // Ensure user exists in our database
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!existingUser && !fetchError) {
      // Create user if they don't exist
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.primaryEmail!,
          display_name: user.displayName || null,
          first_name: null,
          last_name: null,
          profile_image_url: user.profileImageUrl || null,
        });

      if (insertError) {
        return NextResponse.json({ error: 'Failed to create user in database', details: insertError.message }, { status: 500 });
      }
    } else if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is expected if user doesn't exist
      return NextResponse.json({ error: 'Failed to check user in database', details: fetchError.message }, { status: 500 });
    }

    // Fetch expenses from database
    const { data: expenses, error: expensesError } = await supabase
      .from('expenses')
      .select(`
        *,
        users!expenses_paid_by_fkey (display_name)
      `)
      .or(`paid_by.eq.${user.id},expense_participants.user_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (expensesError) {
      return NextResponse.json({ error: 'Failed to fetch expenses', details: expensesError.message }, { status: 500 });
    }
    
    // Transform to match the expected format
    const transformedExpenses = expenses.map(expense => ({
      id: expense.id,
      amount: parseFloat(expense.amount),
      description: expense.description,
      category: expense.category,
      date: new Date(expense.created_at).toISOString().split('T')[0], // Format as YYYY-MM-DD
      participants: [], // For now, we're not fetching participants
      paidBy: expense.users?.display_name || 'Unknown'
    }));

    return NextResponse.json(transformedExpenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create Supabase client
    const supabase = createClient();
    
    // Ensure user exists in our database
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!existingUser && !fetchError) {
      // Create user if they don't exist
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.primaryEmail!,
          display_name: user.displayName || null,
          first_name: null,
          last_name: null,
          profile_image_url: user.profileImageUrl || null,
        });

      if (insertError) {
        return NextResponse.json({ error: 'Failed to create user in database', details: insertError.message }, { status: 500 });
      }
    } else if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is expected if user doesn't exist
      return NextResponse.json({ error: 'Failed to check user in database', details: fetchError.message }, { status: 500 });
    }

    const body: CreateExpenseRequest = await req.json();
    
    // Validate request body
    if (!body.amount || !body.description || !body.category || !body.participants || body.participants.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (body.amount <= 0) {
      return NextResponse.json({ error: 'Amount must be greater than 0' }, { status: 400 });
    }

    // Create expense
    const { data: newExpense, error: expenseError } = await supabase
      .from('expenses')
      .insert({
        amount: body.amount.toString(),
        description: body.description,
        category: body.category,
        paid_by: user.id,
        group_id: body.groupId || null,
        notes: body.notes || null,
        receipt_url: null,
      })
      .select()
      .single();

    if (expenseError) {
      return NextResponse.json({ error: 'Failed to create expense', details: expenseError.message }, { status: 500 });
    }

    // Calculate split amount
    const splitAmount = body.amount / body.participants.length;
    
    // Add participants
    const participantData = body.participants.map(userId => ({
      expense_id: newExpense.id,
      user_id: userId,
      owed_amount: splitAmount.toString(),
    }));
    
    const { error: participantsError } = await supabase
      .from('expense_participants')
      .insert(participantData);

    if (participantsError) {
      return NextResponse.json({ error: 'Failed to add expense participants', details: participantsError.message }, { status: 500 });
    }

    // Return the created expense
    const createdExpense = {
      id: newExpense.id,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      category: newExpense.category,
      date: new Date(newExpense.created_at).toISOString().split('T')[0],
      participants: body.participants,
      paidBy: user.displayName || user.primaryEmail!
    };

    return NextResponse.json(createdExpense, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
  }
}