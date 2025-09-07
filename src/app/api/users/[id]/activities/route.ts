import { NextRequest, NextResponse } from 'next/server';
import { ActivityController } from '@/controllers/ActivityController';
import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/users/[id]/activities - Get user activities across all groups
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '30');
    
    const activities = await ActivityController.getRecentUserActivities(params.id, limit);
    return NextResponse.json({ success: true, data: activities });
    
  } catch (error) {
    console.error('Error fetching user activities:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch user activities' },
      { status: 500 }
    );
  }
}