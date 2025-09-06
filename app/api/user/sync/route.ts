import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { createClient } from '@/lib/db';

// POST /api/user/sync - Sync user data between StackAuth and database
export async function POST(req: NextRequest) {
  try {
    // Get the current user from StackAuth
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create Supabase client
    const supabase = createClient();
    
    // Check if user exists in database
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    // If user doesn't exist, create them in database
    if (!existingUser && !fetchError) {
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.primaryEmail!,
          display_name: user.displayName || null,
          first_name: null,
          last_name: null,
          profile_image_url: user.profileImageUrl || null,
        });

      if (insertError) {
        return NextResponse.json({ error: 'Failed to create user in database', details: insertError.message }, { status: 500 });
      }
    } else if (existingUser) {
      // If user exists, update their information
      const { error: updateError } = await supabase
        .from('users')
        .update({
          email: user.primaryEmail!,
          display_name: user.displayName || null,
          profile_image_url: user.profileImageUrl || null,
          updated_at: new Date(),
        })
        .eq('id', user.id);

      if (updateError) {
        return NextResponse.json({ error: 'Failed to update user in database', details: updateError.message }, { status: 500 });
      }
    } else if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is expected if user doesn't exist
      return NextResponse.json({ error: 'Failed to check user in database', details: fetchError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'User synced successfully' });
  } catch (error) {
    console.error('Error syncing user:', error);
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

    // Create Supabase client
    const supabase = createClient();
    
    // Check if user exists in database
    const { data: existingUser, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is expected if user doesn't exist
      return NextResponse.json({ error: 'Failed to check user in database', details: error.message }, { status: 500 });
    }

    return NextResponse.json({
      synced: !!existingUser,
      user: existingUser || null,
    });
  } catch (error) {
    console.error('Error checking user sync status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}