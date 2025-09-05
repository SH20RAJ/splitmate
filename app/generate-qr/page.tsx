import { QrGenerator } from '@/components/splitmate/qr-generator';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function GenerateQrPage() {
  // Get the current user
  const user = await stackServerApp.getUser();
  
  // Redirect to sign in if user is not authenticated
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Generate Payment QR Code</h1>
          <p className="text-gray-600 mt-2">Create a QR code for easy UPI payments</p>
        </div>
        
        <QrGenerator />
      </div>
    </div>
  );
}