import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    console.log('Testing Supabase connection...');
    
    // Create Supabase client
    const supabase = createClient();
    
    // Test a simple query
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return NextResponse.json({ error: 'Supabase connection error', details: error.message }, { status: 500 });
    }
    
    console.log('Supabase connection successful!');
    return NextResponse.json({ success: true, message: 'Supabase connection successful!', data });
  } catch (error) {
    console.error('Connection test failed:', error);
    return NextResponse.json({ error: 'Connection test failed', details: (error as Error).message }, { status: 500 });
  }
}