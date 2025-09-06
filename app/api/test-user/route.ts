import { NextRequest, NextResponse } from 'next/server';
import {
    getUserById,
    createUser,
    updateUser
} from '@/lib/db/queries';

export async function GET(req: NextRequest) {
    try {
        // First check if user exists
        let user = await getUserById('test-user-id');

        if (!user) {
            // Test creating a user
            user = await createUser({
                id: 'test-user-id',
                email: 'test@example.com',
                displayName: 'Test User',
                firstName: 'Test',
                lastName: 'User',
                profileImageUrl: null,
            });

            if (!user) {
                return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
            }
        } else {
            // Test updating the user
            user = await updateUser('test-user-id', {
                displayName: 'Updated Test User',
            });

            if (!user) {
                return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
            }
        }

        return NextResponse.json({
            success: true,
            user: user,
            message: 'User operations successful'
        });
    } catch (error) {
        console.error('Test user error:', error);
        return NextResponse.json({ error: 'Test failed', details: (error as Error).message }, { status: 500 });
    }
}