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
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ChatInterface } from "@/components/chat-interface"
import { useState } from "react"
import { useUser } from "@stackframe/stack"

const splitMateData = {
  teams: [
    {
      name: "SplitMate",
      logo: DollarSign,
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
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: Receipt,
      items: [
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
      title: "AI Assistant",
      url: "/chat",
      icon: Bot,
      items: [
        {
          title: "Chat",
          url: "/chat",
        },
        {
          title: "History",
          url: "/chat/history",
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
    avatar: user.photoURL || "", // Assuming photoURL exists
  } : {
    name: "Guest",
    email: "",
    avatar: "",
  };

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
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2"
              onClick={() => setShowChat(true)}
            >
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </Button>
          </div>
          <NavUser user={currentUser} />
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

