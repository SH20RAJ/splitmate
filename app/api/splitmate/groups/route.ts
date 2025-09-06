import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { createClient } from '@/lib/db';

interface CreateGroupRequest {
  name: string;
  description?: string;
  memberIds: string[];
}

export async function GET(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create Supabase client
    const supabase = createClient();
    
    // Ensure user exists in our database
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!existingUser && !fetchError) {
      // Create user if they don't exist
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
    } else if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is expected if user doesn't exist
      return NextResponse.json({ error: 'Failed to check user in database', details: fetchError.message }, { status: 500 });
    }

    // Fetch groups from database
    const { data: groupMembers, error: membersError } = await supabase
      .from('group_members')
      .select('group_id, is_admin')
      .eq('user_id', user.id);
    
    if (membersError) {
      return NextResponse.json({ error: 'Failed to fetch group members', details: membersError.message }, { status: 500 });
    }
    
    if (groupMembers.length === 0) {
      return NextResponse.json([]);
    }
    
    // Get the group details
    const groupIds = groupMembers.map(gm => gm.group_id);
    const { data: groups, error: groupsError } = await supabase
      .from('groups')
      .select('*')
      .in('id', groupIds);
    
    if (groupsError) {
      return NextResponse.json({ error: 'Failed to fetch groups', details: groupsError.message }, { status: 500 });
    }
    
    // Get member counts for each group
    const { data: memberCounts, error: countError } = await supabase
      .from('group_members')
      .select('group_id')
      .in('group_id', groupIds);
    
    if (countError) {
      return NextResponse.json({ error: 'Failed to fetch member counts', details: countError.message }, { status: 500 });
    }
    
    // Count members for each group
    const memberCountMap: Record<string, number> = {};
    memberCounts.forEach(mc => {
      memberCountMap[mc.group_id] = (memberCountMap[mc.group_id] || 0) + 1;
    });
    
    // Get group members with user details
    const { data: allGroupMembers, error: allMembersError } = await supabase
      .from('group_members')
      .select(`
        group_id,
        is_admin,
        users (
          id,
          email,
          display_name,
          profile_image_url
        )
      `)
      .in('group_id', groupIds);
    
    if (allMembersError) {
      return NextResponse.json({ error: 'Failed to fetch group members', details: allMembersError.message }, { status: 500 });
    }
    
    // Transform to match the expected format
    const transformedGroups = groups.map(group => {
      const memberInfo = groupMembers.find(gm => gm.group_id === group.id);
      const groupMembersData = allGroupMembers
        .filter(gm => gm.group_id === group.id)
        .map(gm => {
          const user = Array.isArray(gm.users) ? gm.users[0] : gm.users;
          return {
            id: user?.id || '',
            name: user?.display_name || user?.email || '',
            email: user?.email || '',
            avatar: user?.profile_image_url || undefined
          };
        });

      return {
        id: group.id,
        name: group.name,
        description: group.description || '',
        members: groupMembersData,
        createdAt: new Date(group.created_at).toISOString().split('T')[0] // Format as YYYY-MM-DD
      };
    });

    return NextResponse.json(transformedGroups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create Supabase client
    const supabase = createClient();
    
    // Ensure user exists in our database
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!existingUser && !fetchError) {
      // Create user if they don't exist
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
    } else if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is expected if user doesn't exist
      return NextResponse.json({ error: 'Failed to check user in database', details: fetchError.message }, { status: 500 });
    }

    const body: CreateGroupRequest = await req.json();
    
    // Validate request body
    if (!body.name || !body.memberIds || body.memberIds.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create group
    const { data: newGroup, error: groupError } = await supabase
      .from('groups')
      .insert({
        name: body.name,
        description: body.description || null,
        created_by: user.id,
      })
      .select()
      .single();

    if (groupError) {
      return NextResponse.json({ error: 'Failed to create group', details: groupError.message }, { status: 500 });
    }

    // Add members to the group
    const memberData = body.memberIds.map(memberId => ({
      group_id: newGroup.id,
      user_id: memberId,
      is_admin: memberId === user.id,
    }));
    
    const { error: membersError } = await supabase
      .from('group_members')
      .insert(memberData);

    if (membersError) {
      return NextResponse.json({ error: 'Failed to add group members', details: membersError.message }, { status: 500 });
    }

    // Get group members for response
    const { data: groupMembers, error: allMembersError } = await supabase
      .from('group_members')
      .select(`
        is_admin,
        users (
          id,
          email,
          display_name,
          profile_image_url
        )
      `)
      .eq('group_id', newGroup.id);
    
    if (allMembersError) {
      return NextResponse.json({ error: 'Failed to fetch group members', details: allMembersError.message }, { status: 500 });
    }
    
    // Transform members to match expected format
    const transformedMembers = groupMembers.map(member => {
      const user = Array.isArray(member.users) ? member.users[0] : member.users;
      return {
        id: user?.id || '',
        name: user?.display_name || user?.email || '',
        email: user?.email || '',
        avatar: user?.profile_image_url || undefined
      };
    });

    // Return the created group
    const createdGroup = {
      id: newGroup.id,
      name: newGroup.name,
      description: newGroup.description || '',
      members: transformedMembers,
      createdAt: new Date(newGroup.created_at).toISOString().split('T')[0] // Format as YYYY-MM-DD
    };

    return NextResponse.json(createdGroup, { status: 201 });
  } catch (error) {
    console.error('Error creating group:', error);
    return NextResponse.json({ error: 'Failed to create group' }, { status: 500 });
  }
}