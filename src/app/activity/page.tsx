"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Users, Plus, Minus } from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { AppContainer } from "@/components/app-container";

const mockActivities = [
  {
    id: 1,
    type: "expense_added",
    description: "Hotel booking",
    amount: 8000,
    group: "Goa Trip 2024",
    user: "You",
    timestamp: "2 hours ago",
    icon: Plus,
    color: "text-blue-600",
  },
  {
    id: 2,
    type: "payment_received",
    description: "Payment from Rahul",
    amount: 400,
    group: "Goa Trip 2024",
    user: "Rahul",
    timestamp: "4 hours ago",
    icon: ArrowDownLeft,
    color: "text-green-600",
  },
  {
    id: 3,
    type: "expense_added",
    description: "Grocery shopping",
    amount: 1200,
    group: "Apartment 3B",
    user: "Priya",
    timestamp: "1 day ago",
    icon: Plus,
    color: "text-blue-600",
  },
  {
    id: 4,
    type: "payment_sent",
    description: "Payment to Amit",
    amount: 300,
    group: "Office Lunch",
    user: "You",
    timestamp: "2 days ago",
    icon: ArrowUpRight,
    color: "text-red-600",
  },
  {
    id: 5,
    type: "group_created",
    description: "Created new group",
    group: "Weekend Trip",
    user: "You",
    timestamp: "3 days ago",
    icon: Users,
    color: "text-purple-600",
  },
  {
    id: 6,
    type: "expense_settled",
    description: "Dinner bill settled",
    amount: 800,
    group: "Friends",
    user: "Sneha",
    timestamp: "4 days ago",
    icon: Minus,
    color: "text-gray-600",
  },
];

const getActivityMessage = (activity: typeof mockActivities[0]) => {
  switch (activity.type) {
    case "expense_added":
      return `${activity.user} added "${activity.description}"`;
    case "payment_received":
      return `Received payment from ${activity.user}`;
    case "payment_sent":
      return `You paid ${activity.user}`;
    case "group_created":
      return `${activity.user} created "${activity.group}"`;
    case "expense_settled":
      return `${activity.user} settled "${activity.description}"`;
    default:
      return activity.description;
  }
};

export default function ActivityPage() {
  return (
    <>
      <AppContainer>
        <div className="pb-20">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Activity
          </h1>

          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {getActivityMessage(activity)}
                        </p>
                        {activity.amount && (
                          <span className={`text-sm font-semibold ml-2 ${activity.type === "payment_received"
                              ? "text-green-600 dark:text-green-400"
                              : activity.type === "payment_sent"
                                ? "text-red-600 dark:text-red-400"
                                : "text-gray-900 dark:text-white"
                            }`}>
                            {activity.type === "payment_received" ? "+" :
                              activity.type === "payment_sent" ? "-" : ""}
                            ₹{activity.amount.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {activity.group}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {activity.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-6 text-center">
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
              Load more activities
            </button>
          </div>
        </div>
      </AppContainer>
      <BottomNav />
    </>
  );
}