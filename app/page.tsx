import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { 
  UsersIcon, 
  QrCodeIcon, 
  CalculatorIcon, 
  MessageCircleIcon,
  Share2Icon,
  ZapIcon,
  SparklesIcon,
  ArrowRightIcon
} from "lucide-react";
import { stackServerApp } from "@/stack";
import { redirect } from "next/navigation";
import AnimatedTags from "@/components/smoothui/AnimatedTags";
import SiriOrb from "@/components/smoothui/SiriOrb";

export default async function Home() {
  // Get the current user
  const user = await stackServerApp.getUser({ or: "redirect" });
  
  // Redirect to sign in if user is not authenticated
  if (!user) {
    redirect("/sign-in");
  }

  const featureTags = [
    "AI-Powered",
    "Real-time Sync", 
    "UPI Payments",
    "Group Management",
    "Smart Splitting",
    "Bill Tracking",
    "Expense Analytics",
    "WhatsApp Integration"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      
      <div className="container mx-auto px-4 py-12 relative">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex flex-col items-center mb-8">
            {/* AI Orb Effect - Using SmoothUI SiriOrb */}
            <div className="mb-6 relative group">
              <SiriOrb 
                size="128px" 
                className="animate-pulse"
                colors={{
                  c1: "oklch(75% 0.15 150)", // Green
                  c2: "oklch(80% 0.12 180)", // Teal
                  c3: "oklch(78% 0.14 120)", // Light green
                }}
                animationDuration={15}
              />
              <div className="absolute inset-2 w-28 h-28 rounded-full bg-gradient-to-r from-white/20 to-green-50/20 flex items-center justify-center pointer-events-none">
                <SparklesIcon className="h-8 w-8 text-white animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="w-6 h-6 bg-green-500 rounded-full animate-bounce shadow-lg"></div>
              </div>
            </div>
            
            {/* Feature Tags - Using SmoothUI AnimatedTags */}
            <div className="mb-8">
              <AnimatedTags 
                initialTags={featureTags}
                className="w-full max-w-4xl"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Split Bills with{" "}
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 bg-clip-text text-transparent animate-gradient">
                AI Magic
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
              The most intelligent expense sharing app that learns from your spending patterns 
              and makes bill splitting effortless with natural language AI.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:scale-105">
              <Link href="/dashboard" className="flex items-center gap-2">
                Start Splitting Bills
                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <Link href="/chat" className="flex items-center gap-2">
                <MessageCircleIcon className="h-4 w-4" />
                Try AI Assistant
              </Link>
            </Button>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Powerful Features for Modern Expense Sharing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm group">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CalculatorIcon className="h-7 w-7 text-green-600" />
                </div>
                <CardTitle className="text-xl">AI-Powered Bill Splitting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Our AI automatically detects bill patterns and suggests fair splits. Just tell it what you spent and it handles the complex calculations.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm group">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <QrCodeIcon className="h-7 w-7 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Instant UPI Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Generate beautiful QR codes for instant UPI payments. Your friends can pay you back with just a quick scan.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm group">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-100 to-purple-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UsersIcon className="h-7 w-7 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Smart Group Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Create groups for roommates, family, colleagues, or friends. Each group maintains its own expense history and balances.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm group">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-yellow-100 to-yellow-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircleIcon className="h-7 w-7 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Natural Language AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Simply type &ldquo;I paid ₹500 for dinner with John and Sarah&rdquo; and watch AI automatically create and split the expense.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm group">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-red-100 to-red-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Share2Icon className="h-7 w-7 text-red-600" />
                </div>
                <CardTitle className="text-xl">Smart Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  Automated WhatsApp and SMS reminders ensure everyone settles their share. No more awkward conversations about money.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm group">
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-100 to-indigo-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ZapIcon className="h-7 w-7 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Real-time Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  All transactions and balances sync instantly across devices. Everyone stays updated on the latest expense activity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-purple-600/10 rounded-3xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 text-center border border-white/20">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SparklesIcon className="h-4 w-4" />
              AI-Powered Expense Management
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to experience the future of expense sharing?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Join thousands of users who have simplified their financial relationships with AI-powered bill splitting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Link href="/dashboard" className="flex items-center gap-2">
                  Start Your Journey
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 shadow-sm hover:shadow-md transition-all duration-300">
                <Link href="/chat" className="flex items-center gap-2">
                  <MessageCircleIcon className="h-4 w-4" />
                  Try AI Assistant
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            How SplitMate Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-200 rounded-full opacity-60 group-hover:scale-125 transition-transform"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">Chat with AI</h3>
              <p className="text-gray-600 leading-relaxed">
                Simply tell our AI about your expense: &ldquo;I paid ₹1,200 for dinner with 3 friends.&rdquo; No forms to fill.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-200 rounded-full opacity-60 group-hover:scale-125 transition-transform"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">Auto-Split & Share</h3>
              <p className="text-gray-600 leading-relaxed">
                AI calculates fair shares and sends payment requests via WhatsApp, SMS, or in-app notifications.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-200 rounded-full opacity-60 group-hover:scale-125 transition-transform"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">Instant Settlement</h3>
              <p className="text-gray-600 leading-relaxed">
                Friends pay via UPI QR codes or other methods. Balances update in real-time across all devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
