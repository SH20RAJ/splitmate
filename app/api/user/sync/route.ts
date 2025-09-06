import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { 
  getUserById, 
  createUser, 
  updateUser 
} from '@/lib/db/queries';

// POST /api/user/sync - Sync user data between StackAuth and database
export async function POST(req: NextRequest) {
  try {
    // Get the current user from StackAuth
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user exists in database
    const existingUser = await getUserById(user.id);

    // If user doesn't exist, create them in database
    if (!existingUser) {
      const newUser = await createUser({
        id: user.id,
        email: user.primaryEmail!,
        displayName: user.displayName || null,
        firstName: null,
        lastName: null,
        profileImageUrl: user.profileImageUrl || null,
      });

      if (!newUser) {
        return NextResponse.json({ error: 'Failed to create user in database' }, { status: 500 });
      }
    } else {
      // If user exists, update their information
      const updatedUser = await updateUser(user.id, {
        email: user.primaryEmail!,
        displayName: user.displayName || null,
        profileImageUrl: user.profileImageUrl || null,
      });

      if (!updatedUser) {
        return NextResponse.json({ error: 'Failed to update user in database' }, { status: 500 });
      }
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

    // Check if user exists in database
    const existingUser = await getUserById(user.id);

    return NextResponse.json({
      synced: !!existingUser,
      user: existingUser || null,
    });
  } catch (error) {
    console.error('Error checking user sync status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}