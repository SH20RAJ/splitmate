import { NextRequest, NextResponse } from 'next/server';
import { PaymentController } from '@/controllers/PaymentController';
import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/payments - Get payments by group or user
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('groupId');
    const userId = searchParams.get('userId');
    
    if (groupId) {
      const payments = await PaymentController.getGroupPayments(groupId);
      return NextResponse.json({ success: true, data: payments });
    } else if (userId) {
      const payments = await PaymentController.getUserPayments(userId);
      return NextResponse.json({ success: true, data: payments });
    } else {
      return NextResponse.json(
        { error: 'Either groupId or userId parameter is required' },
        { status: 400 }
      );
    }
    
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

// POST /api/payments - Create new payment
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json() as {
      groupId: string;
      fromUserId: string;
      toUserId: string;
      amount: number;
      currency: string;
      description?: string;
      method: 'cash' | 'upi' | 'bank_transfer' | 'card' | 'other';
      transactionId?: string;
      paymentDate?: string;
    };
    
    const {
      groupId,
      fromUserId,
      toUserId,
      amount,
      currency,
      description,
      method,
      transactionId,
      paymentDate
    } = body;
    
    if (!groupId || !fromUserId || !toUserId || !amount || !currency || !method) {
      return NextResponse.json(
        { error: 'Required fields: groupId, fromUserId, toUserId, amount, currency, method' },
        { status: 400 }
      );
    }
    
    const payment = await PaymentController.createPayment({
      groupId,
      fromUserId,
      toUserId,
      amount,
      currency,
      description,
      method,
      transactionId,
      paymentDate: paymentDate ? new Date(paymentDate) : new Date()
    });
    
    return NextResponse.json({ success: true, data: payment }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create payment' },
      { status: 500 }
    );
  }
}
