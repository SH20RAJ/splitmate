import { NextRequest, NextResponse } from 'next/server';
import { PaymentController } from '@/controllers/PaymentController';
import { connectToDatabase } from '@/db/mongodb';

export const runtime = 'edge';

// GET /api/settlements?groupId=xxx - Get settlement suggestions
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('groupId');
    
    if (!groupId) {
      return NextResponse.json(
        { error: 'GroupId is required' },
        { status: 400 }
      );
    }
    
    const suggestions = await PaymentController.generateSettlementSuggestions(groupId);
    return NextResponse.json({ success: true, data: suggestions });
    
  } catch (error) {
    console.error('Error generating settlement suggestions:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate settlement suggestions' },
      { status: 500 }
    );
  }
}
