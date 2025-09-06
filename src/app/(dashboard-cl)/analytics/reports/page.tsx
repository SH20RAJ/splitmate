export const runtime = 'edge';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  CalendarIcon,
  PieChartIcon,
  BarChart3Icon,
  DollarSignIcon,
  PrinterIcon,
  ShareIcon,
  FilterIcon,
  FileTextIcon,
  TrendingUpIcon,
  ClockIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pill, PillDelta, PillIndicator } from "@/components/ui/kibo-ui/pill";

// Mock data for reports
const reportsData = {
  summary: {
    totalExpenses: 45200,
    monthlyAverage: 7533,
    topCategory: 'Food & Dining',
    savingsRate: 12.5,
    settlementRate: 85
  },
  recentReports: [
    {
      id: '1',
      title: 'Monthly Expense Report - September 2025',
      type: 'Monthly',
      date: '2025-09-01',
      period: 'September 2025',
      status: 'generated',
      fileSize: '2.4 MB',
      category: 'Monthly'
    },
    {
      id: '2',
      title: 'Group Expense Summary - Goa Trip',
      type: 'Group',
      date: '2025-08-28',
      period: 'July - August 2025',
      status: 'generated',
      fileSize: '1.8 MB',
      category: 'Travel'
    },
    {
      id: '3',
      title: 'Quarterly Financial Analysis',
      type: 'Quarterly',
      date: '2025-08-15',
      period: 'Q2 2025 (Apr-Jun)',
      status: 'generated',
      fileSize: '3.2 MB',
      category: 'Quarterly'
    },
    {
      id: '4',
      title: 'Tax Preparation Report',
      type: 'Tax',
      date: '2025-07-30',
      period: 'FY 2024-25',
      status: 'generated',
      fileSize: '4.1 MB',
      category: 'Tax'
    },
    {
      id: '5',
      title: 'Annual Spending Patterns',
      type: 'Annual',
      date: '2025-06-30',
      period: '2024-2025',
      status: 'scheduled',
      fileSize: '-',
      category: 'Annual'
    }
  ],
  expenseBreakdown: [
    { category: 'Food & Dining', amount: 15600, percentage: 34.5, change: 12.3 },
    { category: 'Travel', amount: 8900, percentage: 19.7, change: -5.2 },
    { category: 'Housing', amount: 7200, percentage: 15.9, change: 3.1 },
    { category: 'Entertainment', amount: 4800, percentage: 10.6, change: 8.7 },
    { category: 'Utilities', amount: 3500, percentage: 7.7, change: -2.1 },
    { category: 'Shopping', amount: 2800, percentage: 6.2, change: 15.4 },
    { category: 'Healthcare', amount: 1200, percentage: 2.7, change: 0 },
    { category: 'Other', amount: 1200, percentage: 2.7, change: -1.8 }
  ]
};

export default function AnalyticsReportsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Generate and download detailed expense reports</p>
        </div>
        <Button>
          <FileTextIcon className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Report Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Select date range..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
              <SelectItem value="group">Group Specific</SelectItem>
              <SelectItem value="tax">Tax Related</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="generated">Generated</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <FilterIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{reportsData.summary.totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              This reporting period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
            <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{reportsData.summary.monthlyAverage.toLocaleString()}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUpIcon className="h-3 w-3 mr-1" />
              <PillDelta delta={reportsData.summary.savingsRate} />
              +{reportsData.summary.savingsRate}% savings
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsData.summary.topCategory}</div>
            <p className="text-xs text-muted-foreground">
              34.5% of total expenses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Settlement Rate</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportsData.summary.settlementRate}%</div>
            <Pill variant="outline" className="text-xs mt-1">
              <PillIndicator variant="success" />
              On track
            </Pill>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
            <FileTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              This financial year
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Expense Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Expense Category Breakdown
          </CardTitle>
          <CardDescription>
            Detailed distribution of expenses across categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportsData.expenseBreakdown.map((item) => (
                <TableRow key={item.category}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                  <TableCell>{item.percentage}%</TableCell>
                  <TableCell>
                    <PillDelta delta={item.change} />
                    {item.change > 0 ? '+' : ''}{item.change}%
                  </TableCell>
                  <TableCell>
                    {item.change > 0 ? (
                      <TrendingUpIcon className="h-4 w-4 text-green-600" />
                    ) : item.change < 0 ? (
                      <TrendingUpIcon className="h-4 w-4 text-red-600 rotate-180" />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon className="h-5 w-5" />
            Recent Reports
          </CardTitle>
          <CardDescription>
            Access previously generated reports and documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reportsData.recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileTextIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{report.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {report.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{report.period}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm">{report.fileSize}</div>
                    <div className="flex items-center gap-2">
                      {report.status === 'generated' ? (
                        <Pill variant="outline" className="text-xs">
                          <PillIndicator variant="success" />
                          Generated
                        </Pill>
                      ) : (
                        <Pill variant="outline" className="text-xs">
                          <PillIndicator variant="warning" pulse />
                          Scheduled
                        </Pill>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <PrinterIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ShareIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>
            Automated reports that generate on a regular schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div>
                <h3 className="font-medium">Monthly Expense Summary</h3>
                <p className="text-sm text-muted-foreground">First day of each month</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>Email</Badge>
                <Badge>PDF</Badge>
                <Button variant="outline" size="sm">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Customize
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
              <div>
                <h3 className="font-medium">Quarterly Financial Analysis</h3>
                <p className="text-sm text-muted-foreground">First day of January, April, July, October</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>Email</Badge>
                <Badge>PDF</Badge>
                <Badge>Spreadsheet</Badge>
                <Button variant="outline" size="sm">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Customize
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
