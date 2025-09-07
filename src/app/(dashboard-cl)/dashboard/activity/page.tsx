"use client"

export const runtime = 'edge';

import { useState, useEffect } from 'react'
import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Filter,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Minus,
  Eye,
  Clock,
  CheckCircle,
  Activity,
  Bell,
  CreditCard,
  UserPlus,
  Settings,
  Trash2,
  Edit,
  Share2,
  Download
} from "lucide-react"
import NumberTicker from "@/components/magicui/number-ticker"

const mockActivities = [
  {
    id: 1,
    type: "expense_added",
    title: "Dinner at Domino's Pizza",
    description: "Group dinner with friends",
    amount: 1200,
    group: "Friends Circle",
    groupId: "friends-circle",
    user: "You",
    userAvatar: "Y",
    timestamp: "2 hours ago",
    date: "2024-09-07",
    icon: Plus,
    iconColor: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    status: "completed",
    participants: ["You", "Rahul", "Priya", "Arjun"]
  },
  {
    id: 2,
    type: "payment_received",
    title: "Payment Received from Alex",
    description: "Settlement for Goa trip expenses",
    amount: 2500,
    group: "Goa Trip 2024",
    groupId: "goa-trip-2024", 
    user: "Alex Kumar",
    userAvatar: "AK",
    timestamp: "5 hours ago",
    date: "2024-09-07",
    icon: ArrowDownLeft,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    status: "completed"
  },
  {
    id: 3,
    type: "expense_split",
    title: "Uber Ride to Airport", 
    description: "Shared transportation cost",
    amount: 850,
    group: "Travel Buddies",
    groupId: "travel-buddies",
    user: "Sneha Roy",
    userAvatar: "SR",
    timestamp: "1 day ago",
    date: "2024-09-06",
    icon: Users,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    status: "pending",
    participants: ["You", "Sneha Roy", "Rohan"]
  },
  {
    id: 4,
    type: "payment_sent",
    title: "Payment Sent to Sarah",
    description: "Monthly rent contribution",
    amount: 15000,
    group: "Roommates",
    groupId: "roommates",
    user: "You",
    userAvatar: "Y",
    timestamp: "2 days ago", 
    date: "2024-09-05",
    icon: ArrowUpRight,
    iconColor: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    status: "completed"
  },
  {
    id: 5,
    type: "group_created",
    title: "New Group Created",
    description: "Office Lunch Club - Monthly food expenses",
    amount: 0,
    group: "Office Lunch Club",
    groupId: "office-lunch",
    user: "You",
    userAvatar: "Y",
    timestamp: "3 days ago",
    date: "2024-09-04",
    icon: UserPlus,
    iconColor: "text-indigo-600", 
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
    status: "completed"
  },
  {
    id: 6,
    type: "expense_edited",
    title: "Updated Grocery Bill",
    description: "Corrected amount and added items",
    amount: 3200,
    group: "Roommates",
    groupId: "roommates",
    user: "Mike Chen",
    userAvatar: "MC", 
    timestamp: "4 days ago",
    date: "2024-09-03",
    icon: Edit,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    status: "completed"
  },
  {
    id: 7,
    type: "reminder_sent",
    title: "Payment Reminder",
    description: "Reminded Jane about pending electricity bill",
    amount: 1050,
    group: "Roommates", 
    groupId: "roommates",
    user: "You",
    userAvatar: "Y",
    timestamp: "1 week ago",
    date: "2024-08-31",
    icon: Bell,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    status: "completed"
  },
  {
    id: 8,
    type: "expense_settled",
    title: "Restaurant Bill Settled",
    description: "All participants have paid their share",
    amount: 4500,
    group: "Friends Circle",
    groupId: "friends-circle",
    user: "System",
    userAvatar: "S",
    timestamp: "1 week ago",
    date: "2024-08-30", 
    icon: CheckCircle,
    iconColor: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    status: "completed"
  }
]

const activityStats = {
  totalActivities: 156,
  thisWeek: 23,
  pendingActions: 8,
  completedActions: 148,
  totalAmount: 45600,
  receivedAmount: 18200,
  paidAmount: 27400
}

export default function DashboardActivityPage() {
  const [activities, setActivities] = useState(mockActivities)
  const [filteredActivities, setFilteredActivities] = useState(mockActivities)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'expense_added' | 'payment_received' | 'payment_sent' | 'group_created'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all')

  // Filter activities based on search and filters
  useEffect(() => {
    let filtered = activities

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(activity => 
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.user.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(activity => activity.type === filterType)
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(activity => activity.status === filterStatus)
    }

    setFilteredActivities(filtered)
  }, [activities, searchTerm, filterType, filterStatus])

  const getActivityTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      expense_added: 'Expense Added',
      payment_received: 'Payment Received', 
      payment_sent: 'Payment Sent',
      expense_split: 'Expense Split',
      group_created: 'Group Created',
      expense_edited: 'Expense Edited',
      reminder_sent: 'Reminder Sent',
      expense_settled: 'Expense Settled'
    }
    return labels[type] || type
  }

  const getStatusBadge = (status: string) => {
    if (status === 'completed') {
      return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">Completed</Badge>
    } else if (status === 'pending') {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">Pending</Badge>
    }
    return <Badge variant="outline">{status}</Badge>
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 py-6">
        
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Activity className="h-8 w-8 text-primary" />
                Activity Feed
              </h1>
              <p className="text-muted-foreground">
                Track all expense activities and transactions across your groups
              </p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Activities</p>
                    <div className="text-2xl font-bold">
                      <NumberTicker value={activityStats.totalActivities} />
                    </div>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <span className="text-green-600">+{activityStats.thisWeek}</span> this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Actions</p>
                    <div className="text-2xl font-bold text-orange-600">
                      <NumberTicker value={activityStats.pendingActions} />
                    </div>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Need attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Amount Received</p>
                    <div className="text-2xl font-bold text-green-600">
                      ₹<NumberTicker value={activityStats.receivedAmount} />
                    </div>
                  </div>
                  <ArrowDownLeft className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Incoming payments</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Amount Paid</p>
                    <div className="text-2xl font-bold text-red-600">
                      ₹<NumberTicker value={activityStats.paidAmount} />
                    </div>
                  </div>
                  <ArrowUpRight className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Outgoing payments</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Activity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="expense_added">Expenses Added</SelectItem>
                <SelectItem value="payment_received">Payments Received</SelectItem>
                <SelectItem value="payment_sent">Payments Sent</SelectItem>
                <SelectItem value="group_created">Groups Created</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                {filteredActivities.length} activities found
                {searchTerm && ` for "${searchTerm}"`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredActivities.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No activities found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                      ? "Try adjusting your search or filters"
                      : "Start by adding an expense or creating a group"
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                      {/* Activity Icon */}
                      <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                        <activity.icon className={`h-5 w-5 ${activity.iconColor}`} />
                      </div>

                      {/* Activity Content */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{activity.title}</h3>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                          <div className="text-right">
                            {activity.amount > 0 && (
                              <p className="font-semibold text-lg">₹{activity.amount.toLocaleString()}</p>
                            )}
                            {getStatusBadge(activity.status)}
                          </div>
                        </div>

                        {/* Activity Meta */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Avatar className="h-4 w-4">
                                <AvatarFallback className="text-xs">{activity.userAvatar}</AvatarFallback>
                              </Avatar>
                              <span>{activity.user}</span>
                            </div>
                            {activity.group && (
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                <span>{activity.group}</span>
                              </div>
                            )}
                            {activity.participants && (
                              <div className="flex items-center gap-1">
                                <span>{activity.participants.length} participants</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{activity.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
