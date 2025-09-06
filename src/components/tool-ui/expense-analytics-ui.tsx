"use client";

import React from 'react';
import { makeAssistantToolUI } from "@assistant-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface ExpenseAnalyticsArgs {
  query: string;
  timeframe?: string;
  category?: string;
}

interface ExpenseAnalyticsResult {
  answer: string;
  data: {
    currentMonth: number;
    previousMonth: number;
    change: number;
    trend: string;
  };
  insights: string[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const ExpenseAnalyticsToolUI = makeAssistantToolUI<ExpenseAnalyticsArgs, ExpenseAnalyticsResult>({
  toolName: "analyzeExpenses",
  render: ({ args, result }) => {
    if (!result) {
      return (
        <Card className="w-full max-w-7xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              Analyzing expenses...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Processing query: &quot;{args.query}&quot;
            </p>
          </CardContent>
        </Card>
      );
    }

    const chartData = [
      { name: 'Previous Month', amount: result.data.previousMonth },
      { name: 'Current Month', amount: result.data.currentMonth },
    ];

    const pieData = [
      { name: 'Food', value: result.data.currentMonth * 0.4 },
      { name: 'Transport', value: result.data.currentMonth * 0.3 },
      { name: 'Entertainment', value: result.data.currentMonth * 0.2 },
      { name: 'Others', value: result.data.currentMonth * 0.1 },
    ];

    return (
      <Card className="w-full max-w-4xl2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Expense Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Answer */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-900 font-medium">{result.answer}</p>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly Comparison */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Monthly Comparison</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Category Breakdown */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Category Breakdown</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`₹${Math.round(value as number)}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights */}
          <div>
            <h3 className="text-lg font-semibold mb-3">💡 Insights</h3>
            <div className="space-y-2">
              {result.insights.map((insight, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600 font-bold">•</span>
                  <p className="text-green-800">{insight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trend Indicator */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
            <span className={`text-2xl ${result.data.trend === 'decreasing' ? 'text-green-600' : 'text-red-600'}`}>
              {result.data.trend === 'decreasing' ? '📉' : '📈'}
            </span>
            <span className="font-medium">
              {Math.abs(result.data.change)}% {result.data.change < 0 ? 'decrease' : 'increase'} from last month
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }
});
