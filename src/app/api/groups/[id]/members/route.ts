import { NextRequest, NextResponse } from 'next/server';
import { GroupController } from '@/controllers/GroupController';
import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/groups/[id]/members - Get group members
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const members = await GroupController.getGroupMembers(params.id);
    return NextResponse.json({ success: true, data: members });
    
  } catch (error) {
    console.error('Error fetching group members:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch group members' },
      { status: error instanceof Error && error.message === 'Group not found' ? 404 : 500 }
    );
  }
}

// POST /api/groups/[id]/members - Add member to group
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const body = await request.json() as {
      userId: string;
      role?: 'member' | 'admin';
    };
    
    const { userId, role = 'member' } = body;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'UserId is required' },
        { status: 400 }
      );
    }
    
    const member = await GroupController.addMember(params.id, userId, role);
    return NextResponse.json({ success: true, data: member }, { status: 201 });
    
  } catch (error) {
    console.error('Error adding group member:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add member' },
      { status: 500 }
    );
  }
}

// DELETE /api/groups/[id]/members - Remove member from group
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'UserId parameter is required' },
        { status: 400 }
      );
    }
    
    const result = await GroupController.removeMember(params.id, userId);
    return NextResponse.json({ success: true, data: result });
    
  } catch (error) {
    console.error('Error removing group member:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to remove member' },
      { status: 500 }
    );
  }
}
