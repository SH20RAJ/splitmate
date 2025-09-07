import { NextRequest, NextResponse } from 'next/server';
import { GroupController } from '@/controllers/GroupController';
import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/groups - Get user's groups
export async function GET(request: NextRequest) {
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
    
    const groups = await GroupController.getUserGroups(userId);
    return NextResponse.json({ success: true, data: groups });
    
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch groups' },
      { status: 500 }
    );
  }
}

// POST /api/groups - Create new group
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json() as {
      name: string;
      description?: string;
      currency: string;
      category: string;
      monthlyBudget?: number;
      createdBy: string;
    };
    
    const { name, description, currency, category, monthlyBudget, createdBy } = body;
    
    if (!name || !currency || !category || !createdBy) {
      return NextResponse.json(
        { error: 'Name, currency, category, and createdBy are required' },
        { status: 400 }
      );
    }
    
    const group = await GroupController.createGroup({
      name,
      description,
      currency,
      category,
      monthlyBudget,
      createdBy
    });
    
    return NextResponse.json({ success: true, data: group }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating group:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create group' },
      { status: 500 }
    );
  }
}
