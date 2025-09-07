import { NextRequest, NextResponse } from 'next/server';
import { GroupController } from '@/controllers/GroupController';
import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/groups/[id]/expenses - Get group expenses
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const expenses = await GroupController.getGroupExpenses(params.id);
    return NextResponse.json({ success: true, data: expenses });
    
  } catch (error) {
    console.error('Error fetching group expenses:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch group expenses' },
      { status: 500 }
    );
  }
}
