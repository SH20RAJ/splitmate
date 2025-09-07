import { NextRequest, NextResponse } from 'next/server';
import { GroupController } from '@/controllers/GroupController';
import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/groups/[id] - Get group by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const group = await GroupController.getGroupById(params.id);
    return NextResponse.json({ success: true, data: group });
    
  } catch (error) {
    console.error('Error fetching group:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch group' },
      { status: error instanceof Error && error.message === 'Group not found' ? 404 : 500 }
    );
  }
}

// PUT /api/groups/[id] - Update group
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const body = await request.json() as {
      name?: string;
      description?: string;
      currency?: string;
      category?: string;
      monthlyBudget?: number;
    };
    
    const group = await GroupController.updateGroup(params.id, body);
    return NextResponse.json({ success: true, data: group });
    
  } catch (error) {
    console.error('Error updating group:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update group' },
      { status: error instanceof Error && error.message === 'Group not found' ? 404 : 500 }
    );
  }
}

// DELETE /api/groups/[id] - Delete group
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const result = await GroupController.deleteGroup(params.id);
    return NextResponse.json({ success: true, data: result });
    
  } catch (error) {
    console.error('Error deleting group:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete group' },
      { status: error instanceof Error && error.message === 'Group not found' ? 404 : 500 }
    );
  }
}
