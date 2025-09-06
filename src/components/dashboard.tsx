"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { InsightsSection } from "@/components/insights-section";
import { EnhancedCharts } from "@/components/enhanced-charts";
import { 
  PlusIcon, 
  UsersIcon, 
  TrendingUpIcon, 
  TrendingDownIcon,
  DollarSignIcon,
  ShareIcon,
  QrCodeIcon,
  MessageSquareIcon
} from "lucide-react";
import Link from "next/link";

interface Balance {
  name: string;
  amount: number;
  type: 'owes' | 'owed';
}

interface RecentExpense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  splitAmong: string[];
  date: string;
  category: string;
}

interface Group {
  id: string;
  name: string;
  memberCount: number;
  totalExpenses: number;
  emoji: string;
}

export function Dashboard() {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showQRPayment, setShowQRPayment] = useState(false);
  
  // Mock data for demonstration
  const balances: Balance[] = [
    { name: "Rahul Sharma", amount: 850, type: "owed" },
    { name: "Priya Patel", amount: 420, type: "owes" },
    { name: "Amit Kumar", amount: 300, type: "owed" },
    { name: "Meera Singh", amount: 150, type: "owes" },
  ];

  const recentExpenses: RecentExpense[] = [
    {
      id: "1",
      description: "Dinner at Pizza Palace",
      amount: 1200,
      paidBy: "You",
      splitAmong: ["Rahul", "Priya", "You"],
      date: "2 hours ago",
      category: "Food"
    },
    {
      id: "2", 
      description: "Uber to Airport",
      amount: 850,
      paidBy: "Amit",
      splitAmong: ["Amit", "You"],
      date: "Yesterday",
      category: "Travel"
    },
    {
      id: "3",
      description: "Movie Tickets",
      amount: 600,
      paidBy: "You",
      splitAmong: ["Meera", "You"],
      date: "2 days ago",
      category: "Entertainment"
    }
  ];

  const groups: Group[] = [
    { id: "1", name: "Goa Trip", memberCount: 5, totalExpenses: 15420, emoji: "🏖️" },
    { id: "2", name: "Roommates", memberCount: 3, totalExpenses: 8750, emoji: "🏠" },
    { id: "3", name: "Office Team", memberCount: 8, totalExpenses: 12300, emoji: "💼" },
  ];

  const totalOwed = balances.filter(b => b.type === 'owed').reduce((sum, b) => sum + b.amount, 0);
  const totalOwes = balances.filter(b => b.type === 'owes').reduce((sum, b) => sum + b.amount, 0);
  const netBalance = totalOwed - totalOwes;

  return (
    <div className="space-y-6">
      {/* Net Balance Card */}
      <Card className="border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Your Balance</CardTitle>
          <CardDescription>Overall financial standing</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className={`text-4xl font-bold mb-4 ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{Math.abs(netBalance).toLocaleString()}
          </div>
          <Badge variant={netBalance >= 0 ? "default" : "destructive"} className="text-sm px-4 py-1">
            {netBalance >= 0 ? "You are owed overall" : "You owe overall"}
          </Badge>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                <TrendingUpIcon className="h-5 w-5" />
                <span className="text-sm font-medium">You are owed</span>
              </div>
              <div className="text-2xl font-semibold">₹{totalOwed.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                <TrendingDownIcon className="h-5 w-5" />
                <span className="text-sm font-medium">You owe</span>
              </div>
              <div className="text-2xl font-semibold">₹{totalOwes.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

    {/* Quick Actions */}
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/add-expense">
          <Button className="h-20 flex-col gap-2 w-full">
            <PlusIcon className="h-6 w-6" />
            <span>Add Expense</span>
          </Button>
        </Link>
        <Button 
          variant="outline" 
          className="h-20 flex-col gap-2"
          onClick={() => setShowCreateGroup(true)}
        >
          <UsersIcon className="h-6 w-6" />
          <span>Create Group</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-20 flex-col gap-2"
          onClick={() => setShowQRPayment(true)}
        >
          <QrCodeIcon className="h-6 w-6" />
          <span>QR Payment</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <ShareIcon className="h-6 w-6" />
          <span>Send Reminder</span>
        </Button>
        </div>
      </CardContent>
    </Card>

      {/* Balances */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Balances</CardTitle>
          <CardDescription>Who owes whom</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {balances.map((balance, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {balance.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{balance.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {balance.type === 'owed' ? 'owes you' : 'you owe'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`font-semibold ${balance.type === 'owed' ? 'text-green-600' : 'text-red-600'}`}>
                      ₹{balance.amount.toLocaleString()}
                    </div>
                    <Button size="sm" variant="ghost">
                      <MessageSquareIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {index < balances.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Groups */}
      <Card>
        <CardHeader>
          <CardTitle>Your Groups</CardTitle>
          <CardDescription>Expense groups you&apos;re part of</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groups.map((group) => (
              <Link key={group.id} href={`/groups/${group.id}`}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{group.emoji}</div>
                    <div>
                      <div className="font-semibold">{group.name}</div>
                      <div className="text-sm text-muted-foreground">{group.memberCount} members</div>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-primary">
                    ₹{group.totalExpenses.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total expenses</div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Your latest transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div key={expense.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <DollarSignIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{expense.description}</div>
                      <div className="text-sm text-muted-foreground">
                        Paid by {expense.paidBy} • {expense.splitAmong.join(', ')} • {expense.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{expense.amount.toLocaleString()}</div>
                    <Badge variant="outline" className="text-xs">
                      {expense.category}
                    </Badge>
                  </div>
                </div>
                {recentExpenses.indexOf(expense) < recentExpenses.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics & Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics & Insights</CardTitle>
          <CardDescription>Detailed analysis of your spending patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <InsightsSection />
          <EnhancedCharts />
        </CardContent>
      </Card>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Create New Group</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="text"
                placeholder="Group name"
                className="w-full p-3 border rounded-lg"
              />
              <select className="w-full p-3 border rounded-lg">
                <option>Trip</option>
                <option>Flatmates</option>
                <option>Office</option>
                <option>Friends</option>
              </select>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowCreateGroup(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    setShowCreateGroup(false);
                    // Add success toast here
                  }}
                >
                  Create
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* QR Payment Modal */}
      {showQRPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>QR Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto">
                <QrCodeIcon className="h-24 w-24 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scan this QR code to pay via UPI
              </p>
              <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                splitmate@paytm
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowQRPayment(false)}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
