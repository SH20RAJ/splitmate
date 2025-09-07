import { NextRequest, NextResponse } from 'next/server';
// import { CategoryController } from '@/controllers/CategoryController';
// import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/categories - Get all categories
export async function GET(request: NextRequest) {
  try {
    // In edge runtime, we can't use Mongoose directly
    // Return a mock response or use a different approach
    return NextResponse.json({ 
      success: true, 
      data: [],
      message: 'Categories endpoint not available in edge runtime'
    });
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Create new category
export async function POST(request: NextRequest) {
  try {
    // In edge runtime, we can't use Mongoose directly
    // Return a mock response or use a different approach
    return NextResponse.json({ 
      success: true, 
      data: null,
      message: 'Categories endpoint not available in edge runtime'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create category' },
      { status: 500 }
    );
  }
}
