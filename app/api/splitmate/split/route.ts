import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';

interface SplitBillRequest {
  amount: number;
  description: string;
  participants: string[];
}

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const body: SplitBillRequest = await req.json();
    const { amount, description, participants } = body;

    // Validate required fields
    if (!amount || !description || !participants || !Array.isArray(participants)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate split amount
    const splitAmount = amount / participants.length;

    // Create split result
    const splitResult = {
      totalAmount: amount,
      splits: participants.map((person: string) => ({
        person,
        amount: parseFloat(splitAmount.toFixed(2))
      })),
      description,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(splitResult);
  } catch (error) {
    console.error('Error splitting bill:', error);
    return NextResponse.json({ error: 'Failed to split bill' }, { status: 500 });
  }
}