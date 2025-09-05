import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  IndianRupeeIcon, 
  UsersIcon, 
  QrCodeIcon, 
  CalculatorIcon, 
  MessageCircleIcon,
  SmartphoneIcon,
  Share2Icon,
  ZapIcon
} from "lucide-react";
import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";

export default async function Home() {
  // Get the current user
  const user = await stackServerApp.getUser({ or: "redirect" });
  
  // Redirect to sign in if user is not authenticated
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-green-600">SplitMate</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            The smart way to split bills, track expenses, and settle debts with friends and family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/dashboard">
                Get Started
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/chat">
                Chat with AI
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CalculatorIcon className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Smart Bill Splitting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Easily split bills with friends and family. Our AI-powered system calculates fair shares automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <QrCodeIcon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>UPI QR Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Generate QR codes for instant UPI payments. No more sharing bank details or account numbers.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <UsersIcon className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Group Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create and manage groups for different circles - roommates, family, colleagues, or friends.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <MessageCircleIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>AI Expense Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Chat with our AI assistant to add expenses, check balances, and get financial insights.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <Share2Icon className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Easy Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Share payment requests via WhatsApp, SMS, or social media with one click.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <ZapIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Real-time Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  See all transactions and balances update in real-time across all devices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to simplify expense sharing?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of users who are already using SplitMate to manage their shared expenses effortlessly.
          </p>
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/dashboard">
              Start Splitting Bills
            </Link>
          </Button>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How SplitMate Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Add an Expense</h3>
              <p className="text-gray-600">
                Enter the amount and details of your shared expense.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Split & Share</h3>
              <p className="text-gray-600">
                Split the bill and share payment requests with your group.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Settle Up</h3>
              <p className="text-gray-600">
                Pay via UPI QR code or other payment methods and settle debts instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
