import { NextRequest, NextResponse } from 'next/server';
import { ExpenseController } from '@/controllers/ExpenseController';
import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/expenses - Get expenses by group
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('groupId');
    const userId = searchParams.get('userId');
    
    if (groupId) {
      const expenses = await ExpenseController.getGroupExpenses(groupId);
      return NextResponse.json({ success: true, data: expenses });
    } else if (userId) {
      const expenses = await ExpenseController.getUserExpenses(userId);
      return NextResponse.json({ success: true, data: expenses });
    } else {
      return NextResponse.json(
        { error: 'Either groupId or userId parameter is required' },
        { status: 400 }
      );
    }
    
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch expenses' },
      { status: 500 }
    );
  }
}

// POST /api/expenses - Create new expense
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json() as {
      groupId: string;
      name: string;
      description?: string;
      amount: number;
      currency: string;
      category: string;
      paidById: string;
      receiptUrl?: string;
      splitType: 'equal' | 'percentage' | 'amount' | 'custom';
      expenseDate: string;
      participants: Array<{
        userId: string;
        shareAmount: number;
        sharePercentage?: number;
      }>;
    };
    
    const {
      groupId,
      name,
      description,
      amount,
      currency,
      category,
      paidById,
      receiptUrl,
      splitType,
      expenseDate,
      participants
    } = body;
    
    if (!groupId || !name || !amount || !currency || !category || !paidById || !participants) {
      return NextResponse.json(
        { error: 'Required fields: groupId, name, amount, currency, category, paidById, participants' },
        { status: 400 }
      );
    }
    
    const expense = await ExpenseController.createExpense({
      groupId,
      name,
      description,
      amount,
      currency,
      category,
      paidById,
      receiptUrl,
      splitType,
      expenseDate: new Date(expenseDate),
      participants
    });
    
    return NextResponse.json({ success: true, data: expense }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating expense:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create expense' },
      { status: 500 }
    );
  }
}
