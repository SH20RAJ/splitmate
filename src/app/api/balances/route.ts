import { NextRequest, NextResponse } from 'next/server';
import { ExpenseController } from '@/controllers/ExpenseController';
import { PaymentController } from '@/controllers/PaymentController';
import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/balances?groupId=xxx&userId=xxx - Get user balance in group
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('groupId');
    const userId = searchParams.get('userId');
    
    if (!groupId || !userId) {
      return NextResponse.json(
        { error: 'Both groupId and userId are required' },
        { status: 400 }
      );
    }
    
    const balance = await ExpenseController.calculateUserBalance(groupId, userId);
    return NextResponse.json({ success: true, data: balance });
    
  } catch (error) {
    console.error('Error calculating balance:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to calculate balance' },
      { status: 500 }
    );
  }
}
