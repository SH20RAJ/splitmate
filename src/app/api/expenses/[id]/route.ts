import { NextRequest, NextResponse } from 'next/server';
import { ExpenseController } from '@/controllers/ExpenseController';
import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/expenses/[id] - Get expense by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const expense = await ExpenseController.getExpenseById(params.id);
    return NextResponse.json({ success: true, data: expense });
    
  } catch (error) {
    console.error('Error fetching expense:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch expense' },
      { status: error instanceof Error && error.message === 'Expense not found' ? 404 : 500 }
    );
  }
}

// PUT /api/expenses/[id] - Update expense
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const body = await request.json() as {
      name?: string;
      description?: string;
      amount?: number;
      currency?: string;
      category?: string;
      receiptUrl?: string;
      expenseDate?: string;
    };
    
    const updateData: any = { ...body };
    if (body.expenseDate) {
      updateData.expenseDate = new Date(body.expenseDate);
    }
    
    const expense = await ExpenseController.updateExpense(params.id, updateData);
    return NextResponse.json({ success: true, data: expense });
    
  } catch (error) {
    console.error('Error updating expense:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update expense' },
      { status: error instanceof Error && error.message === 'Expense not found' ? 404 : 500 }
    );
  }
}

// DELETE /api/expenses/[id] - Delete expense
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const result = await ExpenseController.deleteExpense(params.id);
    return NextResponse.json({ success: true, data: result });
    
  } catch (error) {
    console.error('Error deleting expense:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete expense' },
      { status: error instanceof Error && error.message === 'Expense not found' ? 404 : 500 }
    );
  }
}
