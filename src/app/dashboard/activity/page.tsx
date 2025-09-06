import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  CheckCircle
} from "lucide-react"

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Activity - SplitMate Dashboard',
  description: 'Track all expense activities and transactions across your groups.',
}

const mockActivities = [
  {
    id: 1,
    type: "expense_added",
    title: "Hotel Booking - Taj Resort",
    description: "Shared accommodation for weekend trip",
    amount: 12500,
    group: "Goa Trip 2024",
    user: "You",
    timestamp: "2 hours ago",
    date: "2024-09-07",
    icon: Plus,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    status: "pending"
  },
  {
    id: 2,
    type: "payment_received",
    title: "Payment Received",
    description: "Settlement for restaurant bill",
    amount: 850,
    group: "Office Lunch",
    user: "Rahul Kumar",
    timestamp: "4 hours ago",
    date: "2024-09-07",
    icon: ArrowDownLeft,
    iconColor: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    status: "completed"
  },
  {
    id: 3,
    type: "expense_added",
    title: "Weekly Groceries",
    description: "Monthly household supplies",
    amount: 2400,
    group: "Apartment 3B",
    user: "Priya Sharma",
    timestamp: "1 day ago",
    date: "2024-09-06",
    icon: Plus,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    status: "settled"
  },
  {
    id: 4,
    type: "payment_sent",
    title: "Payment Sent",
    description: "Movie tickets reimbursement",
    amount: 600,
    group: "Weekend Plans",
    user: "You",
    timestamp: "1 day ago",
    date: "2024-09-06",
    icon: ArrowUpRight,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    status: "processing"
  },
  {
    id: 5,
    type: "group_created",
    title: "New Group Created",
    description: "Created group for upcoming project",
    amount: 0,
    group: "Project Alpha",
    user: "You",
    timestamp: "2 days ago",
    date: "2024-09-05",
    icon: Users,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    status: "active"
  },
  {
    id: 6,
    type: "expense_updated",
    title: "Expense Updated",
    description: "Updated amount for taxi ride",
    amount: 350,
    group: "Airport Transfer",
    user: "Amit Patel",
    timestamp: "3 days ago",
    date: "2024-09-04",
    icon: Eye,
    iconColor: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    status: "updated"
  }
]

const stats = {
  totalTransactions: 156,
  totalAmount: 45800,
  pendingPayments: 12,
  activeGroups: 8
}

export default function DashboardActivityPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-6 py-6">
          
          {/* Header */}
          <div className="px-4 lg:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Activity Dashboard</h1>
                <p className="text-muted-foreground">Monitor all your group expenses and transactions</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  Real-time updates
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Transactions</p>
                      <p className="text-lg font-semibold">{stats.totalTransactions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <DollarSign className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-lg font-semibold">₹{stats.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-lg font-semibold">{stats.pendingPayments}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <Users className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Groups</p>
                      <p className="text-lg font-semibold">{stats.activeGroups}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Filters */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search activities..." 
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date Range
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  All your expense activities and group transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockActivities.map((activity) => (
                    <div key={activity.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-4">
                        
                        {/* Icon */}
                        <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                          <activity.icon className={`h-4 w-4 ${activity.iconColor}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-sm">{activity.title}</h4>
                                <Badge variant="secondary" className="text-xs">
                                  {activity.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {activity.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {activity.group}
                                </span>
                                <span>{activity.user}</span>
                                <span>{activity.timestamp}</span>
                              </div>
                            </div>
                            
                            {/* Amount */}
                            {activity.amount > 0 && (
                              <div className="text-right">
                                <div className="font-semibold text-sm">
                                  ₹{activity.amount.toLocaleString()}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Load More */}
          <div className="px-4 lg:px-6">
            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Activities
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
