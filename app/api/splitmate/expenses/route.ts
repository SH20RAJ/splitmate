import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  participants: string[];
  paidBy: string;
}

export async function GET(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock data for expenses
    // In a real app, this would come from a database
    const expenses: Expense[] = [
      {
        id: "1",
        amount: 1200,
        description: "Pizza night",
        category: "Food",
        date: "2023-05-15",
        participants: [user.displayName || "You", "Rahul", "Shreya"],
        paidBy: user.displayName || "You"
      },
      {
        id: "2",
        amount: 500,
        description: "Cab fare",
        category: "Transport",
        date: "2023-05-16",
        participants: [user.displayName || "You", "Rahul"],
        paidBy: "Rahul"
      }
    ];

    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}