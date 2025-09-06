import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { 
  getGroupsByUserId, 
  getGroupMembers, 
  createGroup, 
  addGroupMember,
  getUserById,
  createUser
} from '@/lib/db/queries';

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

    // Ensure user exists in our database
    let dbUser = await getUserById(user.id);
    if (!dbUser) {
      dbUser = await createUser({
        id: user.id,
        email: user.primaryEmail!,
        displayName: user.displayName || null,
        firstName: null,
        lastName: null,
        profileImageUrl: user.profileImageUrl || null,
      });
    }

    // Fetch groups from database
    const userGroups = await getGroupsByUserId(user.id);
    
    if (!userGroups) {
      return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 });
    }
    
    // Transform to match the expected format
    const transformedGroups = await Promise.all(
      userGroups.map(async (group) => {
        // Get group members
        const members = await getGroupMembers(group.id);
        
        // Transform members to match expected format
        const transformedMembers = members.map(member => ({
          id: member.id,
          name: member.displayName || member.email,
          email: member.email,
          avatar: member.profileImageUrl || undefined
        }));

        return {
          id: group.id,
          name: group.name,
          description: group.description || '',
          members: transformedMembers,
          createdAt: group.createdAt.toISOString().split('T')[0] // Format as YYYY-MM-DD
        };
      })
    );

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

    // Ensure user exists in our database
    let dbUser = await getUserById(user.id);
    if (!dbUser) {
      dbUser = await createUser({
        id: user.id,
        email: user.primaryEmail!,
        displayName: user.displayName || null,
        firstName: null,
        lastName: null,
        profileImageUrl: user.profileImageUrl || null,
      });
    }

    const body: CreateGroupRequest = await req.json();
    
    // Validate request body
    if (!body.name || !body.memberIds || body.memberIds.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create group
    const newGroup = await createGroup({
      name: body.name,
      description: body.description || null,
      createdBy: user.id,
    });

    if (!newGroup) {
      return NextResponse.json({ error: 'Failed to create group' }, { status: 500 });
    }

    // Add members to the group
    await Promise.all(
      body.memberIds.map(async (memberId) => {
        // Add member (first member is admin)
        const isAdmin = memberId === user.id;
        await addGroupMember(newGroup.id, memberId, isAdmin);
      })
    );

    // Get group members for response
    const members = await getGroupMembers(newGroup.id);
    
    // Transform members to match expected format
    const transformedMembers = members.map(member => ({
      id: member.id,
      name: member.displayName || member.email,
      email: member.email,
      avatar: member.profileImageUrl || undefined
    }));

    // Return the created group
    const createdGroup = {
      id: newGroup.id,
      name: newGroup.name,
      description: newGroup.description || '',
      members: transformedMembers,
      createdAt: newGroup.createdAt.toISOString().split('T')[0] // Format as YYYY-MM-DD
    };

    return NextResponse.json(createdGroup, { status: 201 });
  } catch (error) {
    console.error('Error creating group:', error);
    return NextResponse.json({ error: 'Failed to create group' }, { status: 500 });
  }
}