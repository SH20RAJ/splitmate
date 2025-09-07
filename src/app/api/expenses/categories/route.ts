import { NextRequest, NextResponse } from 'next/server';
import { CategoryDrizzleService } from '@/services/category.drizzle.service';
import { NewCategory } from '@/db/schema';

export const runtime = 'nodejs';

// GET /api/expenses/categories - Get categories related to expenses
export async function GET(request: NextRequest) {
  try {
    const categories = await CategoryDrizzleService.getAllCategories();
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching expense categories:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch expense categories' },
      { status: 500 }
    );
  }
}

// POST /api/expenses/categories - Create new expense category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as NewCategory;
    
    // Validate required fields
    if (!body.name || !body.color) {
      return NextResponse.json(
        { error: 'Name and color are required fields' },
        { status: 400 }
      );
    }
    
    const category = await CategoryDrizzleService.createCategory(body);
    return NextResponse.json({
      success: true,
      data: category
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating expense category:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create expense category' },
      { status: 500 }
    );
  }
}

// PUT /api/expenses/categories/[id] - Update a specific category
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    
    if (!id || id === 'categories') {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }
    
    const body = await request.json() as Partial<NewCategory>;
    const category = await CategoryDrizzleService.updateCategory(id, body);
    
    return NextResponse.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error updating expense category:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update expense category' },
      { status: 500 }
    );
  }
}

// DELETE /api/expenses/categories - Delete multiple categories
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const idsParam = url.searchParams.get('ids');
    
    if (!idsParam) {
      return NextResponse.json(
        { error: 'Category IDs are required' },
        { status: 400 }
      );
    }
    
    const ids = idsParam.split(',');
    const deletedCount = await CategoryDrizzleService.deleteCategories(ids);
    
    return NextResponse.json({
      success: true,
      data: { deletedCount }
    });
  } catch (error) {
    console.error('Error deleting expense categories:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete expense categories' },
      { status: 500 }
    );
  }
}
