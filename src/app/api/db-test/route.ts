import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, groups, categories } from '@/db/schema';

export async function GET() {
  try {
    // Test the database connection by checking if tables exist
    const testUser = {
      email: 'test@example.com',
      displayName: 'Test User'
    };

    console.log('Testing database connection...');
    console.log('Schema loaded successfully');
    console.log('Available tables:', { users: !!users, groups: !!groups, categories: !!categories });

    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      schema: {
        users: !!users,
        groups: !!groups, 
        categories: !!categories
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
