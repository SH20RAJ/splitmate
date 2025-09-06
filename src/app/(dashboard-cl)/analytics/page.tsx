import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExpenseContributionGraph } from "@/components/expense-contribution-graph"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { EnhancedCharts } from "@/components/enhanced-charts"
import {
  TrendingUpIcon,
  CalendarIcon,
  PieChartIcon,
  BarChart3Icon,
  DollarSignIcon,
  LightbulbIcon,
  FileTextIcon,
  MessageSquareIcon
} from "lucide-react"
export const runtime = 'edge';
export const metadata: Metadata = {
  title: 'Analytics - SplitMate',
  description: 'Analyze your spending patterns and group expenses.',
}

const analyticsData = {
  totalSpent: 45200,
  monthlyAverage: 7533,
  topCategory: 'Food & Dining',
  savingsGoal: 85,
  trends: {
    spending: 12.5,
    groups: -2.1,
    settlements: 8.3
  }
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          
          {/* Header */}
          <div className="px-4 lg:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">Track your spending patterns and financial insights</p>
              </div>
              <Badge variant="outline">
                <CalendarIcon className="h-3 w-3 mr-1" />
                Last 12 months
              </Badge>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{analyticsData.totalSpent.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUpIcon className="h-3 w-3 mr-1" />
                    +{analyticsData.trends.spending}% from last month
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
                  <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{analyticsData.monthlyAverage.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    Per month this year
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Category</CardTitle>
                  <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.topCategory}</div>
                  <p className="text-xs text-muted-foreground">
                    32% of total expenses
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Settlements</CardTitle>
                  <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.savingsGoal}%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUpIcon className="h-3 w-3 mr-1" />
                    +{analyticsData.trends.settlements}% completion
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Expense Contribution Graph */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense Activity</CardTitle>
                <CardDescription>
                  Your expense patterns over the last 12 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseContributionGraph />
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Area Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Spending Trend</CardTitle>
                  <CardDescription>
                    Track your spending patterns over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartAreaInteractive />
                </CardContent>
              </Card>

              {/* Enhanced Charts */}
              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>
                    See where your money goes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EnhancedCharts />
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Insights Section */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Insights</CardTitle>
                <CardDescription>AI-powered analysis of your spending habits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <TrendingUpIcon className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 dark:text-green-100">Great Progress!</h4>
                    <p className="text-sm text-green-700 dark:text-green-200">
                      You&apos;ve settled 85% of your group expenses this month, up from 73% last month.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <PieChartIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Spending Pattern</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-200">
                      Your food expenses increased by 15% this month. Consider setting a budget for dining out.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                  <BarChart3Icon className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Group Activity</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-200">
                      Your most active group is &quot;Goa Trip 2024&quot; with ₹18,500 in expenses.
                    </p>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Export Options */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Export & Reports</CardTitle>
                <CardDescription>Download your expense data and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                    Export CSV
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                    Monthly Report
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                    Tax Summary
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                    Group Settlement
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}