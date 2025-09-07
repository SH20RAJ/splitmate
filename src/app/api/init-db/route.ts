import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/db/mongodb';
import { DatabaseService } from '@/services/database.service';

export const runtime = 'edge';

export async function POST() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');
    
    const dbService = DatabaseService.getInstance();
    await dbService.connect();
    
    // Initialize default data (categories, etc.)
    await dbService.initializeDefaultData();
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully with default data'
    });
    
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to initialize database'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to connect to database'
    }, { status: 500 });
  }
}
