import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/db/mongodb';
// import { DatabaseService } from '@/services/database.service';

export const runtime = 'edge';

export async function POST() {
  try {
    // In edge runtime, we can't use Mongoose directly
    // Return a mock response or use a different approach
    return NextResponse.json({
      success: true,
      message: 'Database initialization not available in edge runtime'
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
    // In edge runtime, we can't use Mongoose directly
    // Return a mock response or use a different approach
    return NextResponse.json({
      success: true,
      message: 'Database connection not available in edge runtime',
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
