import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { createClient } from '../../../../lib/db';

// POST /api/user/sync - Sync user data between StackAuth and Supabase
export async function POST(req: NextRequest) {
  try {
    // Get the current user from StackAuth
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get Supabase client
    const supabase = createClient();

    // Check if user exists in Supabase
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    // If user doesn't exist, create them in Supabase
    if (!existingUser) {
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          name: user.displayName || 'Anonymous User',
          email: user.primaryEmail || '',
          created_at: new Date().toISOString(),
        });

      if (insertError) {
        return NextResponse.json({ error: 'Failed to create user in Supabase' }, { status: 500 });
      }
    } else {
      // If user exists, update their information
      const { error: updateError } = await supabase
        .from('users')
        .update({
          name: user.displayName || existingUser.name,
          email: user.primaryEmail || existingUser.email,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) {
        return NextResponse.json({ error: 'Failed to update user in Supabase' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: 'User synced successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/user/sync - Get user sync status
export async function GET(req: NextRequest) {
  try {
    // Get the current user from StackAuth
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get Supabase client
    const supabase = createClient();

    // Check if user exists in Supabase
    const { data: existingUser, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to check user in Supabase' }, { status: 500 });
    }

    return NextResponse.json({
      synced: !!existingUser,
      user: existingUser || null,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}