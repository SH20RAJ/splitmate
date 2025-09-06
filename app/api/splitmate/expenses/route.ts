import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { getExpensesByUserId, createExpense, getUserById, createUser } from '@/lib/db/queries';

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

    // Ensure user exists in our database
    let dbUser = await getUserById(user.id);
    if (!dbUser) {
      dbUser = await createUser({
        id: user.id,
        email: user.primaryEmail!,
        displayName: user.displayName || null,
        firstName: null,
        lastName: null,
        profileImageUrl: user.profileImageUrl || null,
      });
    }

    // Fetch expenses from database
    const expenses = await getExpensesByUserId(user.id);
    
    if (!expenses) {
      return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
    }
    
    // Transform to match the expected format
    const transformedExpenses = expenses.map(expense => ({
      id: expense.id,
      amount: parseFloat(expense.amount),
      description: expense.description,
      category: expense.category,
      date: expense.createdAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
      participants: expense.participants,
      paidBy: expense.paidByName || 'Unknown'
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

    // Ensure user exists in our database
    let dbUser = await getUserById(user.id);
    if (!dbUser) {
      dbUser = await createUser({
        id: user.id,
        email: user.primaryEmail!,
        displayName: user.displayName || null,
        firstName: null,
        lastName: null,
        profileImageUrl: user.profileImageUrl || null,
      });
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
    const newExpense = await createExpense({
      amount: body.amount.toString(),
      description: body.description,
      category: body.category as 'food' | 'transport' | 'entertainment' | 'shopping' | 'utilities' | 'healthcare' | 'education' | 'travel' | 'other',
      paidBy: user.id,
      groupId: body.groupId || null,
      notes: body.notes || null,
      receiptUrl: null,
    }, body.participants);

    if (!newExpense) {
      return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
    }

    // Return the created expense
    const createdExpense = {
      id: newExpense.id,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      category: newExpense.category,
      date: newExpense.createdAt.toISOString().split('T')[0],
      participants: body.participants,
      paidBy: user.displayName || user.primaryEmail!
    };

    return NextResponse.json(createdExpense, { status: 201 });
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
  }
}