import { GroupsList } from '@/components/splitmate/groups-list';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function GroupsPage() {
    // Get the current user
    const user = await stackServerApp.getUser();

    // Redirect to sign in if user is not authenticated
    if (!user) {
        redirect('/sign-in');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Your Groups</h1>
                    <p className="text-gray-600 mt-2">Manage your expense sharing groups</p>
                </div>

                <GroupsList />
            </div>
        </div>
    );
}