export const runtime = 'edge';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUpIcon,
  CalendarIcon,
  PieChartIcon,
  BarChart3Icon,
  DollarSignIcon,
  AlertTriangleIcon,
  LightbulbIcon,
  TargetIcon,
  ClockIcon,
  UsersIcon
} from "lucide-react";
import { Pill, PillDelta, PillIndicator } from "@/components/ui/kibo-ui/pill";

// Mock data for insights
const insightsData = {
  spendingPatterns: [
    {
      id: '1',
      title: 'Increased Dining Out',
      description: 'Your food expenses increased by 22% this month compared to last month.',
      impact: 'moderate',
      category: 'Food & Dining',
      amount: 4200,
      change: 22,
      recommendation: 'Consider setting a monthly dining budget to manage expenses.'
    },
    {
      id: '2',
      title: 'Reduced Transportation Costs',
      description: 'Transportation expenses decreased by 15% due to reduced travel.',
      impact: 'positive',
      category: 'Transportation',
      amount: 1800,
      change: -15,
      recommendation: 'Maintain this trend by using public transport more often.'
    },
    {
      id: '3',
      title: 'Recurring Subscription Costs',
      description: 'Multiple subscriptions costing ₹2,400/month could be optimized.',
      impact: 'negative',
      category: 'Subscriptions',
      amount: 2400,
      change: 0,
      recommendation: 'Review and cancel unused subscriptions to save ₹1,200/month.'
    }
  ],
  behavioralInsights: [
    {
      id: '1',
      title: 'Group Spending Trends',
      description: 'You tend to spend more in groups during weekends.',
      impact: 'neutral',
      category: 'Behavioral',
      data: 'Weekend group avg: ₹850 vs Weekday: ₹420'
    },
    {
      id: '2',
      title: 'Payment Timing',
      description: 'You typically settle expenses within 3 days of creation.',
      impact: 'positive',
      category: 'Behavioral',
      data: 'Avg settlement time: 3.2 days'
    }
  ],
  predictiveInsights: [
    {
      id: '1',
      title: 'Upcoming High Spend Period',
      description: 'Based on historical data, October is likely to see increased spending.',
      impact: 'warning',
      category: 'Predictive',
      projectedIncrease: '18%',
      timing: 'Next 2 weeks'
    },
    {
      id: '2',
      title: 'Savings Opportunity',
      description: 'Consolidating grocery purchases could save ₹500/month.',
      impact: 'positive',
      category: 'Predictive',
      projectedSavings: '₹500/month'
    }
  ]
};

export default function AnalyticsInsightsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">Personalized financial intelligence powered by AI</p>
        </div>
        <Button>
          <LightbulbIcon className="h-4 w-4 mr-2" />
          Refresh Insights
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,450</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUpIcon className="h-3 w-3 mr-1" />
              <PillDelta delta={12.5} />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spending Efficiency</CardTitle>
            <TargetIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              On budget this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Settlement Speed</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8 days</div>
            <p className="text-xs text-muted-foreground">
              Avg time to settle
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Group Engagement</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Active participation rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Spending Pattern Insights */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3Icon className="h-5 w-5" />
              Spending Patterns
            </CardTitle>
            <CardDescription>Identified trends in your spending behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {insightsData.spendingPatterns.map((insight) => (
              <div key={insight.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                <div className={`mt-1 h-8 w-8 rounded-full flex items-center justify-center ${insight.impact === 'positive' ? 'bg-green-100 text-green-800' :
                  insight.impact === 'negative' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                  {insight.impact === 'positive' ? (
                    <TrendingUpIcon className="h-4 w-4" />
                  ) : insight.impact === 'negative' ? (
                    <AlertTriangleIcon className="h-4 w-4" />
                  ) : (
                    <BarChart3Icon className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{insight.title}</h3>
                    <Pill variant="outline" className="text-xs">
                      <PillDelta delta={insight.change} />
                      {insight.change > 0 ? '+' : ''}{insight.change}%
                    </Pill>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{insight.category}</Badge>
                    <span className="text-sm font-medium">₹{insight.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-start gap-2 pt-2">
                    <LightbulbIcon className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Behavioral & Predictive Insights */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Behavioral Insights
              </CardTitle>
              <CardDescription>Understanding your spending habits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {insightsData.behavioralInsights.map((insight) => (
                <div key={insight.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <div className="mt-1 h-8 w-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center">
                    <UsersIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    <Badge variant="secondary">{insight.category}</Badge>
                    <p className="text-sm font-medium pt-1">{insight.data}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon className="h-5 w-5" />
                Predictive Insights
              </CardTitle>
              <CardDescription>Future-focused financial intelligence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {insightsData.predictiveInsights.map((insight) => (
                <div key={insight.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                  <div className="mt-1 h-8 w-8 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center">
                    <TargetIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    <Badge variant="secondary">{insight.category}</Badge>
                    <div className="flex items-center gap-4 pt-1">
                      <span className="text-sm">
                        <span className="font-medium">
                          {insight.projectedIncrease || insight.projectedSavings}
                        </span>
                      </span>
                      <Pill variant="outline" className="text-xs">
                        <PillIndicator variant="warning" pulse />
                        {insight.timing || 'Opportunity'}
                      </Pill>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Actionable Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LightbulbIcon className="h-5 w-5" />
            Actionable Recommendations
          </CardTitle>
          <CardDescription>Steps to optimize your financial health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center">
                <CalendarIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Budget Review</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Schedule a monthly budget review to track progress
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Set Reminder
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <div className="h-10 w-10 rounded-full bg-green-100 text-green-800 flex items-center justify-center">
                <PieChartIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Category Optimization</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Reallocate funds from underutilized categories
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Analyze Now
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg border bg-card">
              <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center">
                <UsersIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Group Coordination</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Initiate a group discussion about upcoming expenses
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Start Chat
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
