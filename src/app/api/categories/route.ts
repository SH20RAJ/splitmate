import { NextRequest, NextResponse } from 'next/server';
import { CategoryController } from '@/controllers/CategoryController';
import { connectToDatabase } from '@/db/mongodb';

// GET /api/categories - Get all categories
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const categories = await CategoryController.getAllCategories();
    return NextResponse.json({ success: true, data: categories });
    
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
    await connectToDatabase();
    
    const body = await request.json() as {
      name: string;
      icon?: string;
      color?: string;
      isDefault?: boolean;
    };
    
    const { name, icon, color = '#6366f1', isDefault = false } = body;
    
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    const category = await CategoryController.createCategory({
      name,
      icon,
      color,
      isDefault
    });
    
    return NextResponse.json({ success: true, data: category }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create category' },
      { status: 500 }
    );
  }
}
