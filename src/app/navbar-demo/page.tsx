import { Navbar1 } from '@/components/ui/navbar1';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NavbarDemoPage() {
  const demoData = {
    logo: {
      url: "/dashboard",
      src: "https://www.shadcnblocks.com/images/block/block-1.svg",
      alt: "SplitMate Logo",
      title: "SplitMate",
    },
    menu: [
      {
        title: "Dashboard",
        url: "/dashboard",
        items: [
          {
            title: "Overview",
            description: "View your expense summary and recent activity",
            url: "/dashboard",
          },
          {
            title: "Activity",
            description: "See all recent transactions and updates",
            url: "/dashboard/activity",
          },
          {
            title: "Friends",
            description: "Manage your friends and their balances",
            url: "/friends",
          }
        ],
      },
      {
        title: "Expenses",
        url: "/expenses",
        items: [
          {
            title: "All Expenses",
            description: "View and manage all your expenses",
            url: "/expenses",
          },
          {
            title: "Add Expense",
            description: "Quickly add a new expense",
            url: "/expenses/add-expense",
          },
          {
            title: "Recent",
            description: "See your most recent expenses",
            url: "/expenses/recent",
          },
          {
            title: "Categories",
            description: "Manage expense categories",
            url: "/expenses/categories",
          },
        ],
      },
      {
        title: "Groups",
        url: "/groups",
        items: [
          {
            title: "My Groups",
            description: "View and manage your expense groups",
            url: "/groups",
          },
          {
            title: "Create Group",
            description: "Create a new group for shared expenses",
            url: "/groups/create",
          },
          {
            title: "Invitations",
            description: "Manage group invitations",
            url: "/groups/invitations",
          },
        ],
      },
      {
        title: "Analytics",
        url: "/analytics",
        items: [
          {
            title: "Overview",
            description: "View spending patterns and insights",
            url: "/analytics",
          },
          {
            title: "Insights",
            description: "Get AI-powered financial insights",
            url: "/analytics/insights",
          },
          {
            title: "Reports",
            description: "Generate detailed expense reports",
            url: "/analytics/reports",
          },
        ],
      },
      {
        title: "AI Assistant",
        url: "/chat",
        items: [
          {
            title: "Chat",
            description: "Chat with our AI expense assistant",
            url: "/chat",
          },
          {
            title: "Suggestions",
            description: "Get prompt suggestions for the AI assistant",
            url: "/chat/suggestions",
          },
          {
            title: "History",
            description: "View your chat history with the AI",
            url: "/chat/history",
          },
        ],
      },
    ],
    mobileExtraLinks: [
      { name: "Settings", url: "/settings" },
      { name: "Help", url: "/help" },
      { name: "About", url: "/about" },
      { name: "Contact", url: "/contact" },
    ],
    auth: {
      login: { text: "Log in", url: "/login" },
      signup: { text: "Sign up", url: "/signup" },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar1 {...demoData} />
      
      <div className="container py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            SplitMate Navigation
          </h1>
          <p className="text-muted-foreground mb-10">
            This demo showcases the navigation structure used throughout SplitMate
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Intuitive Navigation</h3>
              <p className="text-sm text-muted-foreground">
                Easily access all features through our organized menu structure
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Mobile Friendly</h3>
              <p className="text-sm text-muted-foreground">
                Responsive design that works perfectly on all devices
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">AI Integration</h3>
              <p className="text-sm text-muted-foreground">
                Access our AI assistant from anywhere in the app
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/about">About SplitMate</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}