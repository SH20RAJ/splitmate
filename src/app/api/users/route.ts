import { NextRequest, NextResponse } from 'next/server';
import { UserController } from '@/controllers/UserController';
import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/users - Get user by email (query param)
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }
    
    const user = await UserController.getUserByEmail(email);
    return NextResponse.json({ success: true, data: user });
    
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch user' },
      { status: error instanceof Error && error.message === 'User not found' ? 404 : 500 }
    );
  }
}

// POST /api/users - Create or update user
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { email, displayName, avatarUrl } = body;
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    const user = await UserController.upsertUser({
      email,
      displayName,
      avatarUrl
    });
    
    return NextResponse.json({ success: true, data: user }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create/update user' },
      { status: 500 }
    );
  }
}
