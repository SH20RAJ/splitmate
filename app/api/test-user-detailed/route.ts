import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        // Create Supabase client
        const supabase = createClient();

        // First check if user exists
        const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('id', 'test-user-id')
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
            // PGRST116 means no rows returned, which is expected if user doesn't exist
            console.error('Error fetching user:', fetchError);
            return NextResponse.json({ error: 'Error fetching user', details: fetchError.message }, { status: 500 });
        }

        let user;
        if (!existingUser) {
            // Create a user
            const { data, error: insertError } = await supabase
                .from('users')
                .insert({
                    id: 'test-user-id',
                    email: 'test@example.com',
                    display_name: 'Test User',
                    first_name: 'Test',
                    last_name: 'User',
                    profile_image_url: null,
                })
                .select()
                .single();

            if (insertError) {
                console.error('Error creating user:', insertError);
                return NextResponse.json({ error: 'Error creating user', details: insertError.message }, { status: 500 });
            }

            user = data;
        } else {
            // Update the user
            const { data, error: updateError } = await supabase
                .from('users')
                .update({
                    display_name: 'Updated Test User',
                    updated_at: new Date(),
                })
                .eq('id', 'test-user-id')
                .select()
                .single();

            if (updateError) {
                console.error('Error updating user:', updateError);
                return NextResponse.json({ error: 'Error updating user', details: updateError.message }, { status: 500 });
            }

            user = data;
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