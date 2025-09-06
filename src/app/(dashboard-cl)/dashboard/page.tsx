export const runtime = 'edge';
import type { Metadata } from 'next'
import { SplitMateSidebar } from "@/components/splitmate-sidebar"
import { SiteHeader } from "@/components/site-header"
import { BottomNav } from "@/components/bottom-nav"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { EnhancedCharts } from "@/components/enhanced-charts"
import { InsightsSection } from "@/components/insights-section"
import { ExpenseContributionGraph } from "@/components/expense-contribution-graph"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  PlusIcon, 
  UsersIcon, 
  TrendingUpIcon,
  DollarSignIcon,
  BarChart3Icon,
  ActivityIcon
} from "lucide-react"
import Link from "next/link"

// Mock data for the table
const mockTableData = [
  {
    id: 1,
    header: "Pizza Palace Dinner",
    type: "Food & Dining",
    status: "Settled",
    target: "₹1,200",
    limit: "₹400 per person",
    reviewer: "You"
  },
  {
    id: 2,
    header: "Uber to Airport", 
    type: "Transportation",
    status: "Pending",
    target: "₹850",
    limit: "₹425 per person",
    reviewer: "Amit"
  },
  {
    id: 3,
    header: "Grocery Shopping",
    type: "Household",
    status: "In Process", 
    target: "₹2,450",
    limit: "₹612 per person",
    reviewer: "Priya"
  }
]

export const metadata: Metadata = {
  title: 'Dashboard - SplitMate',
  description: 'Comprehensive expense management dashboard with AI-powered insights.',
}

// Mock data for the comprehensive dashboard
const mockData = {
  totalBalance: 2850,
  totalOwed: 1500,
  totalOwes: 650,
  netBalance: 850,
  monthlyExpenses: 12450,
  activeGroups: 3,
  recentExpenses: [
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
  ]
}

export default function DashboardPage() {
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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              
              {/* Overview Cards */}
              <div className="px-4 lg:px-6">
                <SectionCards />
              </div>

              {/* Balance Overview */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
                      <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">₹{mockData.netBalance.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">You are owed overall</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
                      <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹{mockData.monthlyExpenses.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
                      <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{mockData.activeGroups}</div>
                      <p className="text-xs text-muted-foreground">Groups you&apos;re part of</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Quick Add</CardTitle>
                      <PlusIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <Link href="/add-expense">
                        <Button size="sm" className="w-full">
                          Add Expense
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Charts and Analytics */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Analytics</CardTitle>
                      <CardDescription>Interactive expense tracking</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartAreaInteractive />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Activity</CardTitle>
                      <CardDescription>Your spending patterns over the year</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ExpenseContributionGraph />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Enhanced Charts and Insights */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Insights</CardTitle>
                    <CardDescription>AI-powered spending analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InsightsSection />
                    <div className="mt-6">
                      <EnhancedCharts />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions Table */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Latest expense activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DataTable data={mockTableData} />
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Link href="/add-expense">
                        <Button className="h-20 flex-col gap-2 w-full">
                          <PlusIcon className="h-6 w-6" />
                          <span>Add Expense</span>
                        </Button>
                      </Link>
                      <Link href="/groups/create">
                        <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                          <UsersIcon className="h-6 w-6" />
                          <span>Create Group</span>
                        </Button>
                      </Link>
                      <Link href="/analytics">
                        <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                          <BarChart3Icon className="h-6 w-6" />
                          <span>Analytics</span>
                        </Button>
                      </Link>
                      <Link href="/activity">
                        <Button variant="outline" className="h-20 flex-col gap-2 w-full">
                          <ActivityIcon className="h-6 w-6" />
                          <span>Activity</span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
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
