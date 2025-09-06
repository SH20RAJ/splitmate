'use client'

export const runtime = 'edge';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  SearchIcon,
  FilterIcon,
  MoreHorizontalIcon,
  CalendarIcon,
  UsersIcon,
  ReceiptIcon,
  TrendingUpIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from "lucide-react"

// Mock data for recent expenses
const recentExpenses = [
  {
    id: '1',
    description: 'Dinner at The Goa Restaurant',
    amount: 1200,
    category: 'Food & Dining',
    date: '2025-09-05',
    group: '🏖️ Goa Trip 2024',
    paidBy: 'You',
    splitBetween: ['You', 'Rahul', 'Priya', 'Suresh'],
    status: 'settled',
    yourShare: 300
  },
  {
    id: '2',
    description: 'Uber to Airport',
    amount: 450,
    category: 'Transportation',
    date: '2025-09-04',
    group: '🏖️ Goa Trip 2024',
    paidBy: 'Rahul',
    splitBetween: ['You', 'Rahul', 'Priya'],
    status: 'pending',
    yourShare: 150
  },
  {
    id: '3',
    description: 'Groceries - Monthly',
    amount: 2800,
    category: 'Groceries',
    date: '2025-09-03',
    group: '🏠 Roommates',
    paidBy: 'You',
    splitBetween: ['You', 'Raj', 'Priya', 'Suresh'],
    status: 'partially_settled',
    yourShare: 700
  },
  {
    id: '4',
    description: 'Team Lunch',
    amount: 850,
    category: 'Food & Dining',
    date: '2025-09-02',
    group: '💼 Office Team',
    paidBy: 'Amit',
    splitBetween: ['You', 'Amit', 'Vikash', 'Sonal'],
    status: 'settled',
    yourShare: 212.50
  },
  {
    id: '5',
    description: 'Movie Night',
    amount: 600,
    category: 'Entertainment',
    date: '2025-09-01',
    group: '🏠 Roommates',
    paidBy: 'Priya',
    splitBetween: ['You', 'Raj', 'Priya'],
    status: 'pending',
    yourShare: 200
  }
]

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    'Food & Dining': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    'Transportation': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Groceries': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'Entertainment': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Utilities': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  }
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const getStatusColor = (status: string) => {
  const colors: { [key: string]: string } = {
    'settled': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'partially_settled': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  }
  return colors[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const formatStatus = (status: string) => {
  const statusMap: { [key: string]: string } = {
    'settled': 'Settled',
    'pending': 'Pending',
    'partially_settled': 'Partially Settled',
  }
  return statusMap[status] || status
}

export default function RecentExpensesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2 h-full">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          
          {/* Header */}
          <div className="px-4 lg:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Recent Expenses</h1>
                <p className="text-muted-foreground">View and manage your recent expenses</p>
              </div>
              <Button>
                <ReceiptIcon className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Week</CardTitle>
                  <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹4,100</div>
                  <div className="flex items-center text-xs text-green-600">
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                    +12% from last week
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹350</div>
                  <p className="text-xs text-muted-foreground">
                    2 expenses to settle
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">You Owe</CardTitle>
                  <ArrowUpIcon className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">₹562.50</div>
                  <p className="text-xs text-muted-foreground">
                    To be paid
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">You&apos;re Owed</CardTitle>
                  <ArrowDownIcon className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">₹200</div>
                  <p className="text-xs text-muted-foreground">
                    To be received
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Filters */}
          <div className="px-4 lg:px-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search expenses..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all-groups">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Groups" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-groups">All Groups</SelectItem>
                    <SelectItem value="goa-trip">🏖️ Goa Trip 2024</SelectItem>
                    <SelectItem value="roommates">🏠 Roommates</SelectItem>
                    <SelectItem value="office">💼 Office Team</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-categories">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">All Categories</SelectItem>
                    <SelectItem value="food">Food & Dining</SelectItem>
                    <SelectItem value="transport">Transportation</SelectItem>
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <FilterIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Expenses List */}
          <div className="px-4 lg:px-6">
            <div className="space-y-4">
              {recentExpenses.map((expense) => (
                <Card key={expense.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-full">
                          <ReceiptIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{expense.description}</h3>
                            <Badge className={getCategoryColor(expense.category)} variant="secondary">
                              {expense.category}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{expense.group}</span>
                            <span>•</span>
                            <span>{expense.date}</span>
                            <span>•</span>
                            <span>Paid by {expense.paidBy}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-1">
                              {expense.splitBetween.slice(0, 3).map((person, index) => (
                                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                                  <AvatarFallback className="text-xs">{person.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                              {expense.splitBetween.length > 3 && (
                                <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                  <span className="text-xs text-muted-foreground">+{expense.splitBetween.length - 3}</span>
                                </div>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {expense.splitBetween.length} people
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right space-y-1">
                          <div className="font-semibold">₹{expense.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            Your share: ₹{expense.yourShare.toLocaleString()}
                          </div>
                          <Badge className={getStatusColor(expense.status)} variant="outline">
                            {formatStatus(expense.status)}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="px-4 lg:px-6">
            <div className="flex justify-center">
              <Button variant="outline">Load More Expenses</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
