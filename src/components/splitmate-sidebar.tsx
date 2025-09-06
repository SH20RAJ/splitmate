"use client"

import * as React from "react"
import {
  BarChart3,
  Bot,
  Home,
  MessageSquare,
  Users,
  Wallet,
  DollarSign,
  Receipt,
  Target,
  Zap,
  Smartphone,
  Upload,
  Link,
  Send,
  IndianRupee,
  LogIn,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "@/components/chat-interface"
import { useState } from "react"
import { useUser } from "@stackframe/stack"
import { useRouter } from "next/navigation"
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler"
import { it } from "node:test"

const splitMateData = {
  teams: [
    {
      name: "SplitMate",
      logo: IndianRupee,
      plan: "Pro",
    },
    {
      name: "Personal",
      logo: Wallet,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard",
        },
        {
          title: "Activity",
          url: "/dashboard/activity",
        },
        {
          title: "Friends",
          url:"/friends"
        }
      ],
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: Receipt,
      items: [
        {
          title: "Expense",
          url: "/expenses",
        },
        {
          title: "Add Expense",
          url: "/expenses/add-expense",
        },
        {
          title: "Recent",
          url: "/expenses/recent",
        },
        {
          title: "Categories",
          url: "/expenses/categories",
        },
      ],
    },
    {
      title: "Groups",
      url: "/groups",
      icon: Users,
      items: [
        {
          title: "My Groups",
          url: "/groups",
        },
        {
          title: "Create Group",
          url: "/groups/create",
        },
        {
          title: "Invitations",
          url: "/groups/invitations",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
      items: [
        {
          title: "Overview",
          url: "/analytics",
        },
        {
          title: "Insights",
          url: "/analytics/insights",
        },
        {
          title: "Reports",
          url: "/analytics/reports",
        },
      ],
    },
    {
      title: "Auto Fetch & Split",
      url: "/auto-fetch",
      icon: Zap,
      items: [
        {
          title: "Connect Accounts",
          url: "/auto-fetch",
        },
        {
          title: "Payment Apps",
          url: "/auto-fetch/payment-apps",
        },
        {
          title: "Food Delivery",
          url: "/auto-fetch/food-delivery",
        },
        {
          title: "SMS/Email Parser",
          url: "/auto-fetch/sms-parser",
        },
        {
          title: "Screenshot OCR",
          url: "/auto-fetch/screenshot-ocr",
        },
      ],
    },
    {
      title: "AI Assistant",
      url: "/chat",
      icon: Bot,
      items: [
        {
          title: "Chat",
          url: "/chat",
        },
        {
          title: "Suggestions",
          url: "/chat/suggestions",
        },
        {
          title: "History",
          url: "/chat/history",
        },
      ],
    },
    {
      title: "Telegram Bot",
      url: "/telegram",
      icon: Send,
      items: [
        {
          title: "Setup Bot",
          url: "/telegram/setup",
        },
        {
          title: "Commands",
          url: "/telegram/commands",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Goa Trip 2024",
      url: "/groups/goa-trip-2024",
      icon: Target,
    },
    {
      name: "Office Lunches",
      url: "/groups/office-lunches",
      icon: Target,
    },
    {
      name: "Apartment 3B",
      url: "/groups/apartment-3b",
      icon: Target,
    },
  ],
}

export function SplitMateSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [showChat, setShowChat] = useState(false)
  const user = useUser() // Get the current user

  // Create a user object to pass to NavUser
  const currentUser = user ? {
    name: user.displayName || user.primaryEmail || "Guest",
    email: user.primaryEmail || "",
    avatar: "", // Remove avatar for now since property doesn't exist
  } : {
    name: "Guest",
    email: "",
    avatar: "",
  };

    const router = useRouter();

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={splitMateData.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={splitMateData.navMain} />
          <NavProjects projects={splitMateData.projects} />
        </SidebarContent>
        <SidebarFooter>
          <div className="p-2 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Button 
                variant="outline" 
                className="flex-1 justify-start gap-2"
                onClick={() => router.push('/chat')}
              >
                <MessageSquare className="h-4 w-4" />
                AI Assistant
              </Button>
              <AnimatedThemeToggler className="flex-shrink-0" />
            </div>
          </div>
          {user ? (
            <NavUser user={currentUser} />
          ) : (
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  size="lg" 
                  onClick={() => router.push('/handler/sign-up')}
                  className="w-full"
                >
                  <div className="flex items-center gap-2 w-full">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* AI Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="flex flex-col h-full">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">AI Expense Assistant</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowChat(false)}
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <ChatInterface />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

