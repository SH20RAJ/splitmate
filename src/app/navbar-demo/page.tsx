import { Navbar1 } from '@/components/ui/navbar1';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NavbarDemoPage() {
  const demoData = {
    logo: {
      url: "/",
      src: "https://www.shadcnblocks.com/images/block/block-1.svg",
      alt: "SplitMate Logo",
      title: "SplitMate",
    },
    menu: [
      {
        title: "Home",
        url: "/",
      },
      {
        title: "Features",
        url: "#",
        items: [
          {
            title: "Expense Tracking",
            description: "Track and categorize all your expenses automatically",
            url: "/features/expense-tracking",
          },
          {
            title: "Group Management",
            description: "Manage expenses across different friend groups and trips",
            url: "/features/group-management",
          },
          {
            title: "AI Assistant",
            description: "Get instant help with expense splitting and financial calculations",
            url: "/features/ai-assistant",
          },
          {
            title: "Real-time Sync",
            description: "Keep everyone in sync with instant updates and notifications",
            url: "/features/real-time-sync",
          },
        ],
      },
      {
        title: "Resources",
        url: "#",
        items: [
          {
            title: "Help Center",
            description: "Get all the answers you need right here",
            url: "/help",
          },
          {
            title: "Contact Us",
            description: "We are here to help you with any questions you have",
            url: "/contact",
          },
          {
            title: "Status",
            description: "Check the current status of our services and APIs",
            url: "/status",
          },
          {
            title: "Terms of Service",
            description: "Our terms and conditions for using our services",
            url: "/terms",
          },
        ],
      },
      {
        title: "Pricing",
        url: "/pricing",
      },
      {
        title: "Blog",
        url: "/blog",
      },
    ],
    mobileExtraLinks: [
      { name: "Press", url: "/press" },
      { name: "Contact", url: "/contact" },
      { name: "Imprint", url: "/imprint" },
      { name: "Sitemap", url: "/sitemap" },
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
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Navbar Component Demo
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            This is a demo page showcasing the Navbar1 component with a responsive design 
            that works on both desktop and mobile devices.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Responsive Design</h3>
              <p className="text-sm text-muted-foreground">
                The navbar automatically adapts to different screen sizes with a hamburger menu on mobile.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Dropdown Menus</h3>
              <p className="text-sm text-muted-foreground">
                Complex navigation with dropdown menus for nested items on desktop.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Mobile Accordion</h3>
              <p className="text-sm text-muted-foreground">
                Collapsible sections for mobile navigation with smooth animations.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Back to Home</Link>
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