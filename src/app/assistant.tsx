"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlusIcon,
  CalculatorIcon,
  QrCodeIcon,
  ShareIcon,
  UserPlusIcon,
  TrendingUpIcon,
  MessageSquareIcon,
  SparklesIcon
} from "lucide-react";

interface SplitMateAssistantProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const Assistant = ({ user }: SplitMateAssistantProps) => {
  const runtime = useChatRuntime({
    api: "/api/assistant",
  });

  // Quick action suggestions for the AI
  const quickActions = [
    {
      icon: PlusIcon,
      label: "Add Expense",
      prompt: "I want to add a new expense. Help me split it with my friends.",
      color: "bg-blue-500"
    },
    {
      icon: CalculatorIcon,
      label: "Calculate Split",
      prompt: "I paid ₹1200 for dinner with 3 friends. How much does each person owe me?",
      color: "bg-green-500"
    },
    {
      icon: UserPlusIcon,
      label: "Create Group",
      prompt: "I want to create a new group for tracking expenses with my friends.",
      color: "bg-purple-500"
    },
    {
      icon: QrCodeIcon,
      label: "Payment Request",
      prompt: "Generate a UPI payment request for someone who owes me money.",
      color: "bg-orange-500"
    },
    {
      icon: TrendingUpIcon,
      label: "Analytics",
      prompt: "Show me my spending patterns and who owes me money.",
      color: "bg-pink-500"
    },
    {
      icon: ShareIcon,
      label: "Send Reminder",
      prompt: "I need to send a payment reminder to someone via WhatsApp.",
      color: "bg-indigo-500"
    }
  ];

  const handleQuickAction = (prompt: string) => {
    // This would integrate with the chat runtime to send the prompt
    // For now, we'll just log it
    console.log("Quick action:", prompt);
  };

  if (!user) {
    return (
      <div className="h-dvh flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <MessageSquareIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to SplitMate AI</h2>
              <p className="text-gray-600">
                Your intelligent expense splitting assistant. Chat with AI to manage expenses, split bills, and track payments effortlessly.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <SparklesIcon className="h-4 w-4 text-yellow-500" />
                  What you can do:
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Add expenses with natural language</li>
                  <li>• Split bills automatically with friends</li>
                  <li>• Generate UPI payment requests</li>
                  <li>• Send WhatsApp reminders</li>
                  <li>• Get spending insights & analytics</li>
                </ul>
              </div>

              <Button className="w-full" size="lg">
                Sign in to start chatting
              </Button>

              <p className="text-xs text-gray-500">
                Authentication required to protect your financial data
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex h-dvh bg-gray-50">
        {/* Thread List Sidebar */}
        <div className="w-64 border-r bg-white shadow-sm hidden lg:block">
          <div className="p-4 border-b">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <MessageSquareIcon className="h-5 w-5" />
              Chat History
            </h2>
            <p className="text-sm text-gray-500">Your AI conversations</p>
          </div>
          <ThreadList />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Welcome Header */}
          <div className="bg-white border-b p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-blue-600" />
                  SplitMate AI Assistant
                </h1>
                <p className="text-sm text-gray-500">
                  Hi {user.name}! I&apos;m here to help you manage expenses and split bills.
                </p>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Online
              </Badge>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 bg-white border-b">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Actions:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start gap-2 h-auto p-3 text-left"
                  onClick={() => handleQuickAction(action.prompt)}
                >
                  <div className={`w-6 h-6 rounded ${action.color} flex items-center justify-center flex-shrink-0`}>
                    <action.icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs truncate">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Thread */}
          <div className="flex-1 overflow-hidden">
            <Thread />
          </div>
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
};
