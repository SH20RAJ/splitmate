import { NextRequest, NextResponse } from 'next/server';
import { GroupController } from '@/controllers/GroupController';
import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/groups/[id]/activities - Get group activities
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const activities = await GroupController.getGroupActivities(params.id);
    return NextResponse.json({ success: true, data: activities });
    
  } catch (error) {
    console.error('Error fetching group activities:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch group activities' },
      { status: 500 }
    );
  }
}
