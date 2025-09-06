import type { Metadata } from 'next'
import { SplitMateSidebar } from "@/components/splitmate-sidebar"
import { SiteHeader } from "@/components/site-header"
import { BottomNav } from "@/components/bottom-nav"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  SendIcon, 
  BotIcon,
  UserIcon,
  SparklesIcon
} from "lucide-react"

export const metadata: Metadata = {
  title: 'AI Assistant - SplitMate',
  description: 'Chat with your AI financial assistant.',
}
export const runtime = 'edge';
const chatHistory = [
  {
    id: '1',
    type: 'user' as const,
    message: 'How much did I spend on food this month?',
    time: '2 minutes ago'
  },
  {
    id: '2',
    type: 'assistant' as const,
    message: 'You spent ₹4,850 on food this month, which is 15% more than last month. Your largest food expense was ₹1,200 at "The Goa Restaurant" during your trip.',
    time: '2 minutes ago'
  },
  {
    id: '3',
    type: 'user' as const,
    message: 'Can you help me settle up with my roommates?',
    time: '5 minutes ago'
  },
  {
    id: '4',
    type: 'assistant' as const,
    message: 'I can help you settle up! Based on your "Roommates" group:\n\n• You owe Rahul ₹650\n• Priya owes you ₹320\n• You&apos;re even with Suresh\n\nWould you like me to send payment reminders or create a settlement plan?',
    time: '5 minutes ago'
  }
]

const suggestions = [
  "Show my expense summary for this week",
  "Which group has the highest expenses?",
  "Help me create a budget plan",
  "Remind everyone in Goa Trip group to settle up",
  "Export my tax-related expenses"
]

export default function ChatPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <SplitMateSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            
            {/* Chat Header */}
            <div className="px-4 lg:px-6 py-4 border-b">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                  <SparklesIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">SplitMate AI Assistant</h1>
                  <p className="text-sm text-muted-foreground">Your personal finance helper</p>
                </div>
                <div className="ml-auto">
                  <Badge variant="secondary">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Online
                  </Badge>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4 lg:px-6">
              <div className="max-w-3xl mx-auto py-6 space-y-6">
                
                {/* Welcome Message */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex-shrink-0">
                    <BotIcon className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm">
                        👋 Hi there! I&apos;m your SplitMate AI assistant. I can help you with expense tracking, 
                        group settlements, budget planning, and financial insights. What would you like to know?
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Just now</p>
                  </div>
                </div>

                {/* Chat History */}
                {chatHistory.map((chat) => (
                  <div key={chat.id} className={`flex items-start gap-4 ${chat.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
                      chat.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-gradient-to-br from-blue-500 to-purple-600'
                    }`}>
                      {chat.type === 'user' ? (
                        <UserIcon className="h-4 w-4" />
                      ) : (
                        <BotIcon className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className={`rounded-lg p-4 ${
                        chat.type === 'user' 
                          ? 'bg-primary text-primary-foreground ml-12' 
                          : 'bg-muted/50 mr-12'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{chat.message}</p>
                      </div>
                      <p className={`text-xs text-muted-foreground mt-1 ${chat.type === 'user' ? 'text-right' : ''}`}>
                        {chat.time}
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Suggestions */}
            <div className="px-4 lg:px-6 py-2">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {suggestions.map((suggestion, index) => (
                    <Button 
                      key={index}
                      variant="outline" 
                      size="sm"
                      className="text-xs h-8"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="px-4 lg:px-6 pb-4 border-t bg-background/95 backdrop-blur">
              <div className="max-w-3xl mx-auto pt-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input 
                      placeholder="Ask me anything about your expenses, groups, or finances..." 
                      className="pr-12"
                    />
                    <Button 
                      size="sm" 
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                    >
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  AI can make mistakes. Please verify important information.
                </p>
              </div>
            </div>

          </div>
        </div>
      </SidebarInset>
      
      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </SidebarProvider>
  )
}
