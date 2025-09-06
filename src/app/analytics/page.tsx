"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  PieChart,
  BarChart3,
  Target
} from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";
import { AppContainer } from "@/components/app-container";
import { Area, AreaChart, Cell, Pie, PieChart as RechartsPieChart, XAxis } from "recharts";

const mockAnalytics = {
  monthlySpending: [
    { month: "Jan", amount: 12500 },
    { month: "Feb", amount: 15200 },
    { month: "Mar", amount: 18900 },
    { month: "Apr", amount: 14300 },
    { month: "May", amount: 16800 },
    { month: "Jun", amount: 21200 },
  ],
  categories: [
    { name: "Food", amount: 8500, percentage: 35, fill: "#3b82f6" },
    { name: "Travel", amount: 6200, percentage: 26, fill: "#10b981" },
    { name: "Entertainment", amount: 3800, percentage: 16, fill: "#8b5cf6" },
    { name: "Shopping", amount: 2900, percentage: 12, fill: "#f59e0b" },
    { name: "Others", amount: 2600, percentage: 11, fill: "#6b7280" },
  ],
  insights: [
    {
      title: "Spending Trend",
      value: "+23%",
      description: "vs last month",
      trend: "up",
      icon: TrendingUp,
      color: "text-red-600",
    },
    {
      title: "Most Expensive Day",
      value: "Saturday",
      description: "₹3,200 avg",
      trend: "neutral",
      icon: Calendar,
      color: "text-blue-600",
    },
    {
      title: "Largest Expense",
      value: "₹8,500",
      description: "Hotel booking",
      trend: "neutral",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Budget Status",
      value: "82%",
      description: "of monthly limit",
      trend: "down",
      icon: Target,
      color: "text-orange-600",
    },
  ],
};

const chartConfig = {
  amount: {
    label: "Amount",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

const categoryChartConfig = {
  Food: { label: "Food & Dining", color: "#3b82f6" },
  Travel: { label: "Travel", color: "#10b981" },
  Entertainment: { label: "Entertainment", color: "#8b5cf6" },
  Shopping: { label: "Shopping", color: "#f59e0b" },
  Others: { label: "Others", color: "#6b7280" },
} satisfies ChartConfig;

export default function AnalyticsPage() {
  const currentMonth = mockAnalytics.monthlySpending[mockAnalytics.monthlySpending.length - 1];
  const previousMonth = mockAnalytics.monthlySpending[mockAnalytics.monthlySpending.length - 2];
  const monthlyChange = ((currentMonth.amount - previousMonth.amount) / previousMonth.amount) * 100;

  return (
    <>
      <AppContainer>
        <div className="pb-20">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Analytics
          </h1>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {mockAnalytics.insights.map((insight, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <insight.icon className={`h-5 w-5 ${insight.color}`} />
                    {insight.trend === "up" && (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    )}
                    {insight.trend === "down" && (
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {insight.value}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {insight.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {insight.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Monthly Spending Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Monthly Spending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={mockAnalytics.monthlySpending}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Area
                    dataKey="amount"
                    type="natural"
                    fill="var(--color-amount)"
                    fillOpacity={0.4}
                    stroke="var(--color-amount)"
                  />
                </AreaChart>
              </ChartContainer>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">This Month</span>
                  <span className={`text-sm font-bold ${monthlyChange > 0 ? "text-red-600" : "text-green-600"
                    }`}>
                    {monthlyChange > 0 ? "+" : ""}{monthlyChange.toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Spending by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={categoryChartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <RechartsPieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={mockAnalytics.categories}
                    dataKey="amount"
                    nameKey="name"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    {mockAnalytics.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ChartContainer>
              <div className="mt-4 space-y-2">
                {mockAnalytics.categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.fill }}
                      />
                      <span>{category.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹{category.amount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{category.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle>💡 AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  High Spending Alert
                </p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  You&apos;ve spent 23% more this month. Consider setting a budget for dining out.
                </p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-400">
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Savings Opportunity
                </p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  You could save ₹2,500/month by reducing entertainment expenses by 30%.
                </p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Spending Pattern
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  You tend to spend more on weekends. Plan your budget accordingly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppContainer>
      <BottomNav />
    </>
  );
}