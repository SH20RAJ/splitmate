"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  PlusIcon, 
  UsersIcon, 
  TrendingUpIcon, 
  TrendingDownIcon,
  DollarSignIcon,
  ShareIcon,
  QrCodeIcon,
  MessageSquareIcon,
  PieChartIcon,
  BarChart3Icon,
  CalendarIcon,
  IndianRupeeIcon,
  CreditCardIcon
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

export function DashboardNew() {
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

  // Analytics data
  const totalSpent = 95950;
  const avgMonthlySpend = 15992;
  const totalTransactions = 181;

  const categorySpending = [
    { category: "Food & Dining", amount: 24680, percentage: 35, color: "#3B82F6" },
    { category: "Travel", amount: 17920, percentage: 25, color: "#10B981" },
    { category: "Entertainment", amount: 14250, percentage: 20, color: "#8B5CF6" },
    { category: "Shopping", amount: 9840, percentage: 14, color: "#F59E0B" },
    { category: "Utilities", amount: 4310, percentage: 6, color: "#EF4444" }
  ];

  const paymentMethods = [
    { method: "UPI", amount: 45680, percentage: 65, color: "#3B82F6" },
    { method: "Cash", amount: 17250, percentage: 25, color: "#10B981" },
    { method: "Card", amount: 7020, percentage: 10, color: "#8B5CF6" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back!</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Here's what's happening with your expenses today.</p>
      </div>

      {/* Net Balance Card */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-lg font-semibold">Your Balance</CardTitle>
          <CardDescription>Overall financial standing</CardDescription>
        </CardHeader>
        <CardContent className="text-center pt-2">
          <div className={`text-3xl font-bold mb-3 ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{Math.abs(netBalance).toLocaleString()}
          </div>
          <Badge variant={netBalance >= 0 ? "default" : "destructive"} className="text-xs px-3 py-1">
            {netBalance >= 0 ? "You are owed overall" : "You owe overall"}
          </Badge>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
                <TrendingUpIcon className="h-4 w-4" />
                <span className="text-xs font-medium">You are owed</span>
              </div>
              <div className="text-lg font-semibold">₹{totalOwed.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-red-600 mb-1">
                <TrendingDownIcon className="h-4 w-4" />
                <span className="text-xs font-medium">You owe</span>
              </div>
              <div className="text-lg font-semibold">₹{totalOwes.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          <CardDescription>Common tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/add-expense">
              <Button variant="outline" className="h-16 flex-col gap-1 w-full">
                <PlusIcon className="h-5 w-5" />
                <span className="text-xs">Add Expense</span>
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="h-16 flex-col gap-1"
              onClick={() => setShowCreateGroup(true)}
            >
              <UsersIcon className="h-5 w-5" />
              <span className="text-xs">Create Group</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-16 flex-col gap-1"
              onClick={() => setShowQRPayment(true)}
            >
              <QrCodeIcon className="h-5 w-5" />
              <span className="text-xs">QR Payment</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1">
              <ShareIcon className="h-5 w-5" />
              <span className="text-xs">Send Reminder</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <CardDescription>Your latest transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <DollarSignIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{expense.description}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {expense.date}
                    </div>
                  </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">₹{expense.amount.toLocaleString()}</div>
                  <Badge variant="secondary" className="text-xs mt-1">
                    {expense.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-sm" asChild>
            <Link href="/activity">View all activity</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Analytics Overview */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Analytics Overview</CardTitle>
          <CardDescription>Spending insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Card className="border-0 shadow-none bg-blue-50 dark:bg-blue-900/30">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <IndianRupeeIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Spent</div>
                    <div className="text-sm font-semibold">₹{totalSpent.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-none bg-green-50 dark:bg-green-900/30">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <TrendingUpIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Avg Monthly</div>
                    <div className="text-sm font-semibold">₹{avgMonthlySpend.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-none bg-purple-50 dark:bg-purple-900/30">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <BarChart3Icon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Transactions</div>
                    <div className="text-sm font-semibold">{totalTransactions}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-none bg-amber-50 dark:bg-amber-900/30">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Most Active</div>
                    <div className="text-sm font-semibold">Saturday</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Breakdown */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <PieChartIcon className="h-4 w-4" />
                Spending by Category
              </h3>
              <div className="space-y-3">
                {categorySpending.map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">₹{item.amount.toLocaleString()}</span>
                      <Badge variant="secondary" className="text-xs">
                        {item.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <CreditCardIcon className="h-4 w-4" />
                Payment Methods
              </h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.method} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: method.color }}
                      />
                      <span className="text-sm">{method.method}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">₹{method.amount.toLocaleString()}</span>
                      <Badge variant="secondary" className="text-xs">
                        {method.percentage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Groups */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Your Groups</CardTitle>
          <CardDescription>Expense groups you're part of</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {groups.map((group) => (
              <Link key={group.id} href={`/groups/${group.id}`}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-xl">{group.emoji}</div>
                      <div>
                        <div className="font-semibold text-sm">{group.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{group.memberCount} members</div>
                      </div>
                    </div>
                    <div className="text-base font-semibold text-primary">
                      ₹{group.totalExpenses.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Total expenses</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-sm" asChild>
            <Link href="/groups">View all groups</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Individual Balances */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Individual Balances</CardTitle>
          <CardDescription>Who owes whom</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {balances.map((balance, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-xs">
                      {balance.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{balance.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {balance.type === 'owed' ? 'owes you' : 'you owe'}
                    </div>
                  </div>
                <div className="flex items-center gap-2">
                  <div className={`font-semibold text-sm ${balance.type === 'owed' ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{balance.amount.toLocaleString()}
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MessageSquareIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-sm" asChild>
            <Link href="/friends">View all friends</Link>
          </Button>
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
                className="w-full p-3 border rounded-lg text-sm"
              />
              <select className="w-full p-3 border rounded-lg text-sm">
                <option>Trip</option>
                <option>Flatmates</option>
                <option>Office</option>
                <option>Friends</option>
              </select>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1 text-sm"
                  onClick={() => setShowCreateGroup(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 text-sm"
                  onClick={() => {
                    setShowCreateGroup(false);
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
              <div className="w-40 h-40 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto">
                <QrCodeIcon className="h-20 w-20 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scan this QR code to pay via UPI
              </p>
              <p className="font-mono text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                splitmate@paytm
              </p>
              <Button 
                variant="outline" 
                className="w-full text-sm"
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
