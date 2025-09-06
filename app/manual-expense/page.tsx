import { ManualExpenseManager } from '@/components/splitmate/manual-expense-manager';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function ManualExpensePage() {
  // Get the current user
  const user = await stackServerApp.getUser();
  
  // Redirect to sign in if user is not authenticated
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ManualExpenseManager />
    </div>
  );
}