import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { createClient } from '../../../lib/db';

// GET /api/groups - Get all groups for the current user
export async function GET(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get Supabase client
    const supabase = createClient();

    // Get all groups where the user is a member
    const { data: groups, error } = await supabase
      .from('groups')
      .select(`
        *,
        group_members!inner(user_id),
        expenses(amount, description, created_at)
      `)
      .eq('group_members.user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 });
    }

    return NextResponse.json(groups);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/groups - Create a new group
export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const body = await req.json();
    const { name, description, member_emails } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json({ error: 'Group name is required' }, { status: 400 });
    }

    // Get Supabase client
    const supabase = createClient();

    // Create new group
    const { data: group, error: groupError } = await supabase
      .from('groups')
      .insert({
        name,
        description: description || '',
        created_by: user.id,
      })
      .select()
      .single();

    if (groupError) {
      return NextResponse.json({ error: 'Failed to create group' }, { status: 500 });
    }

    // Add the creator as a member
    const { error: memberError } = await supabase
      .from('group_members')
      .insert({
        group_id: group.id,
        user_id: user.id,
        joined_at: new Date().toISOString(),
      });

    if (memberError) {
      return NextResponse.json({ error: 'Failed to add creator to group' }, { status: 500 });
    }

    // Add other members by email if provided
    if (member_emails && Array.isArray(member_emails)) {
      for (const email of member_emails) {
        // In a real implementation, you would look up users by email and add them
        // For now, we'll just log this for demonstration
        console.log(`Would invite user with email: ${email}`);
      }
    }

    return NextResponse.json(group);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}