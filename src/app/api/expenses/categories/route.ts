import { NextRequest, NextResponse } from 'next/server';
import { CategoryController } from '@/controllers/CategoryController';
import { connectToDatabase } from '@/db/mongodb';

// GET /api/expenses/categories - Get categories related to expenses
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Optional query parameters
    const includeUsage = searchParams.get('includeUsage') === 'true';
    const userId = searchParams.get('userId');
    const timeframe = searchParams.get('timeframe') || '30d'; // 7d, 30d, 90d, 1y
    
    let categories;
    
    if (includeUsage && userId) {
      // Get categories with expense usage statistics
      categories = await CategoryController.getCategoriesWithUsage(userId, timeframe);
    } else {
      // Get all categories (default behavior)
      categories = await CategoryController.getAllCategories();
    }
    
    return NextResponse.json({ 
      success: true, 
      data: categories,
      meta: {
        includeUsage,
        timeframe: includeUsage ? timeframe : null,
        count: categories.length
      }
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
    await connectToDatabase();
    
    const body = await request.json() as {
      name: string;
      icon?: string;
      color?: string;
      description?: string;
      keywords?: string[];
      parentCategory?: string;
      isDefault?: boolean;
    };
    
    const { 
      name, 
      icon, 
      color = '#6366f1', 
      description,
      keywords = [],
      parentCategory,
      isDefault = false 
    } = body;
    
    if (!name) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }
    
    // Check if category already exists
    const existingCategory = await CategoryController.getCategoryByName(name);
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category already exists' },
        { status: 409 }
      );
    }
    
    const category = await CategoryController.createCategory({
      name,
      icon,
      color,
      description,
      keywords,
      parentCategory,
      isDefault
    });
    
    return NextResponse.json({ 
      success: true, 
      data: category,
      message: 'Expense category created successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating expense category:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create expense category' },
      { status: 500 }
    );
  }
}

// PUT /api/expenses/categories - Bulk update categories
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json() as {
      categories: Array<{
        id: string;
        name?: string;
        icon?: string;
        color?: string;
        description?: string;
        keywords?: string[];
        isActive?: boolean;
      }>;
    };
    
    if (!body.categories || !Array.isArray(body.categories)) {
      return NextResponse.json(
        { error: 'Categories array is required' },
        { status: 400 }
      );
    }
    
    const updatedCategories = [];
    
    for (const categoryUpdate of body.categories) {
      if (!categoryUpdate.id) {
        continue; // Skip categories without ID
      }
      
      const updated = await CategoryController.updateCategory(categoryUpdate.id, categoryUpdate);
      updatedCategories.push(updated);
    }
    
    return NextResponse.json({ 
      success: true, 
      data: updatedCategories,
      message: `${updatedCategories.length} categories updated successfully`
    });
    
  } catch (error) {
    console.error('Error bulk updating expense categories:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update expense categories' },
      { status: 500 }
    );
  }
}

// DELETE /api/expenses/categories - Delete multiple categories
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const url = new URL(request.url);
    const categoryIds = url.searchParams.get('ids')?.split(',') || [];
    
    if (categoryIds.length === 0) {
      return NextResponse.json(
        { error: 'Category IDs are required' },
        { status: 400 }
      );
    }
    
    // Check if categories are being used in expenses
    const categoriesInUse = await CategoryController.checkCategoriesInUse(categoryIds);
    
    if (categoriesInUse.length > 0) {
      return NextResponse.json(
        { 
          error: 'Cannot delete categories that are in use',
          categoriesInUse: categoriesInUse
        },
        { status: 409 }
      );
    }
    
    const deletedCount = await CategoryController.deleteCategories(categoryIds);
    
    return NextResponse.json({ 
      success: true, 
      data: { deletedCount },
      message: `${deletedCount} categories deleted successfully`
    });
    
  } catch (error) {
    console.error('Error deleting expense categories:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete expense categories' },
      { status: 500 }
    );
  }
}
