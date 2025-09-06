"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { 
  TrendingUpIcon, 
  TrendingDownIcon,
  CalendarIcon,
  Users,
  IndianRupeeIcon
} from "lucide-react";

// Mock data for charts
const monthlyData = [
  { month: 'Jan', expenses: 12400, income: 15000, savings: 2600 },
  { month: 'Feb', expenses: 13800, income: 15000, savings: 1200 },
  { month: 'Mar', expenses: 11200, income: 15000, savings: 3800 },
  { month: 'Apr', expenses: 14500, income: 15000, savings: 500 },
  { month: 'May', expenses: 13200, income: 15000, savings: 1800 },
  { month: 'Jun', expenses: 12800, income: 15000, savings: 2200 },
];

const categoryData = [
  { name: 'Food & Dining', value: 35, amount: 24680, color: '#FF6B6B' },
  { name: 'Travel', value: 25, amount: 17920, color: '#4ECDC4' },
  { name: 'Entertainment', value: 20, amount: 14250, color: '#45B7D1' },
  { name: 'Shopping', value: 14, amount: 9840, color: '#FFA07A' },
  { name: 'Utilities', value: 6, amount: 4310, color: '#98D8C8' },
];

const weeklyActivity = [
  { day: 'Mon', transactions: 8, amount: 1200 },
  { day: 'Tue', transactions: 12, amount: 1850 },
  { day: 'Wed', transactions: 15, amount: 2100 },
  { day: 'Thu', transactions: 18, amount: 2450 },
  { day: 'Fri', transactions: 25, amount: 3200 },
  { day: 'Sat', transactions: 32, amount: 4100 },
  { day: 'Sun', transactions: 22, amount: 2800 },
];

const friendsData = [
  { name: 'Rahul', owes: 1200, owed: 800, net: -400 },
  { name: 'Priya', owes: 600, owed: 1100, net: 500 },
  { name: 'Amit', owes: 900, owed: 300, net: -600 },
  { name: 'Meera', owes: 450, owed: 750, net: 300 },
];

const paymentMethodData = [
  { method: 'UPI', count: 125, amount: 45680, color: '#4F46E5' },
  { method: 'Cash', count: 38, amount: 17250, color: '#10B981' },
  { method: 'Card', count: 18, amount: 7020, color: '#F59E0B' },
];

export function EnhancedCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {/* Monthly Trends Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5" />
            Monthly Trends
          </CardTitle>
          <CardDescription>
            Income vs Expenses over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [`₹${value}`, name]} 
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="income" 
                stackId="1" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.6}
                name="Income"
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stackId="2" 
                stroke="#EF4444" 
                fill="#EF4444" 
                fillOpacity={0.6}
                name="Expenses"
              />
              <Area 
                type="monotone" 
                dataKey="savings" 
                stackId="3" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.6}
                name="Savings"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupeeIcon className="h-5 w-5" />
            Expense Categories
          </CardTitle>
          <CardDescription>
            Breakdown by spending category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `₹${props.payload.amount}`, 
                  `${value}%`
                ]} 
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Activity Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Weekly Activity
          </CardTitle>
          <CardDescription>
            Transactions and spending by day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'amount' ? `₹${value}` : value, 
                  name === 'amount' ? 'Amount' : 'Transactions'
                ]} 
              />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="transactions" 
                fill="#8884d8" 
                name="Transactions"
              />
              <Bar 
                yAxisId="right"
                dataKey="amount" 
                fill="#82ca9d" 
                name="Amount (₹)"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Friends Balance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Friends Balance
          </CardTitle>
          <CardDescription>
            Who owes whom
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={friendsData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip 
                formatter={(value, name) => [`₹${Math.abs(value as number)}`, name]} 
              />
              <Legend />
              <Bar 
                dataKey="owes" 
                fill="#EF4444" 
                name="They Owe You"
              />
              <Bar 
                dataKey="owed" 
                fill="#10B981" 
                name="You Owe Them"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment Methods Line Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5" />
            Payment Method Usage
          </CardTitle>
          <CardDescription>
            Usage trends across different payment methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {paymentMethodData.map((method, index) => (
              <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold" style={{ color: method.color }}>
                  {method.count}
                </div>
                <div className="text-sm text-muted-foreground">{method.method}</div>
                <div className="text-xs text-muted-foreground">
                  ₹{method.amount.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#8884d8" 
                strokeWidth={2}
                name="Monthly Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
