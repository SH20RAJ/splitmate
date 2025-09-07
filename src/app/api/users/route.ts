import { NextRequest, NextResponse } from 'next/server';
// import { UserController } from '@/controllers/UserController';
// import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/users - Get user by email (query param)
export async function GET(request: NextRequest) {
  try {
    // In edge runtime, we can't use Mongoose directly
    // Return a mock response or use a different approach
    return NextResponse.json({ 
      success: true, 
      data: null,
      message: 'Users endpoint not available in edge runtime'
    });
    
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create or update user
export async function POST(request: NextRequest) {
  try {
    // In edge runtime, we can't use Mongoose directly
    // Return a mock response or use a different approach
    return NextResponse.json({ 
      success: true, 
      data: null,
      message: 'Users endpoint not available in edge runtime'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating/updating user:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create/update user' },
      { status: 500 }
    );
  }
}
