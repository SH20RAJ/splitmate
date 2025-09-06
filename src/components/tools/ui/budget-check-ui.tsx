"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BudgetCheckArgs {
  category?: string;
  amount?: number;
}

interface BudgetCheckResult {
  status: string;
  currentSpend: number;
  budgetLimit: number;
  remainingBudget: number;
  percentage: number;
  alert: boolean;
  message: string;
}

interface BudgetCheckUIProps {
  args: BudgetCheckArgs;
  result?: BudgetCheckResult;
}

export function BudgetCheckUI({ args, result }: BudgetCheckUIProps) {
  if (!result) {
    return (
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Checking Budget...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Analyzing {args.category || 'overall'} budget status...
          </p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'danger': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return '✅';
      case 'warning': return '⚠️';
      case 'danger': return '🚨';
      default: return 'ℹ️';
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          💰 Budget Status
          <Badge className={getStatusColor(result.status)}>
            {getStatusIcon(result.status)} {result.status.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Spent: ₹{result.currentSpend}</span>
            <span>Budget: ₹{result.budgetLimit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                result.percentage >= 90 ? 'bg-red-500' :
                result.percentage >= 75 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(result.percentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm text-center">{result.percentage}% used</p>
        </div>

        {/* Alert Message */}
        <div className={`p-3 rounded-lg border ${getStatusColor(result.status)}`}>
          <p className="text-sm font-medium">{result.message}</p>
        </div>

        {/* Remaining Budget */}
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium">Remaining Budget:</span>
          <span className={`font-bold ${result.remainingBudget > 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{result.remainingBudget}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
