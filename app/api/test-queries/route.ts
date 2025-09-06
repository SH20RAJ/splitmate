import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import {
    getUserById,
    createUser,
    getGroupsByUserId
} from '@/lib/db/queries';

export async function GET(req: NextRequest) {
    try {
        // Get the current user from StackAuth
        const user = await stackServerApp.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Test getUserById
        const dbUser = await getUserById(user.id);

        let resultUser = dbUser;

        // If user doesn't exist, create them
        if (!dbUser) {
            resultUser = await createUser({
              id: user.id,
              email: user.primaryEmail!,
              displayName: user.displayName || null,
              firstName: null,
              lastName: null,
              profileImageUrl: user.profileImageUrl || null,
            });
        }

        // Test getGroupsByUserId
        const groups = await getGroupsByUserId(user.id);

        return NextResponse.json({
            success: true,
            user: resultUser,
            groups: groups,
            message: 'Database queries working correctly'
        });
    } catch (error) {
      console.error('Test queries error:', error);
      return NextResponse.json({ error: 'Test failed', details: (error as Error).message }, { status: 500 });
    }
}