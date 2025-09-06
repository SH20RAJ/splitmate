'use client'
export const runtime = 'edge';

import { useState } from 'react';
import { KanbanProvider, KanbanCards, KanbanHeader, KanbanCard } from '@/components/ui/kibo-ui/kanban';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  PlusIcon,
  DollarSignIcon,
  CalendarIcon,
  UsersIcon
} from 'lucide-react';

// Mock data for expenses
type Expense = {
  id: string;
  name: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  paidBy: string;
  participants: string[];
  column: string;
  receipt: string | null;
} & Record<string, unknown>;

const initialExpenses: Expense[] = [
  {
    id: '1',
    name: 'Dinner at Italian Restaurant',
    description: 'Celebration dinner with team',
    amount: 2450,
    date: '2025-09-05',
    category: 'Food & Dining',
    paidBy: 'You',
    participants: ['You', 'Rahul', 'Priya', 'Suresh'],
    column: 'pending',
    receipt: 'receipt-001.jpg'
  },
  {
    id: '2',
    name: 'Office Supplies',
    description: 'Stationery and printer ink',
    amount: 850,
    date: '2025-09-04',
    category: 'Office',
    paidBy: 'Rahul',
    participants: ['You', 'Rahul', 'Priya'],
    column: 'pending',
    receipt: null
  },
  {
    id: '3',
    name: 'Monthly Internet Bill',
    description: 'Airtel Fiber connection',
    amount: 1999,
    date: '2025-09-01',
    category: 'Utilities',
    paidBy: 'You',
    participants: ['You', 'Raj', 'Priya', 'Suresh'],
    column: 'processing',
    receipt: 'internet-bill-sep.pdf'
  },
  {
    id: '4',
    name: 'Team Lunch',
    description: 'Friday team lunch at local cafe',
    amount: 1200,
    date: '2025-09-06',
    category: 'Food & Dining',
    paidBy: 'Priya',
    participants: ['You', 'Rahul', 'Priya', 'Suresh'],
    column: 'pending',
    receipt: null
  },
  {
    id: '5',
    name: 'Electricity Bill',
    description: 'August electricity charges',
    amount: 3200,
    date: '2025-08-30',
    category: 'Utilities',
    paidBy: 'Raj',
    participants: ['You', 'Raj', 'Priya'],
    column: 'settled',
    receipt: 'electricity-aug.pdf'
  },
  {
    id: '6',
    name: 'Movie Tickets',
    description: 'Weekend movie outing',
    amount: 1600,
    date: '2025-09-03',
    category: 'Entertainment',
    paidBy: 'You',
    participants: ['You', 'Rahul', 'Priya'],
    column: 'processing',
    receipt: 'movie-tickets.pdf'
  }
];

const columns = [
  { id: 'pending', name: 'Pending' },
  { id: 'processing', name: 'Processing' },
  { id: 'settled', name: 'Settled' }
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const handleExpenseUpdate = (updatedExpenses: Expense[]) => {
    setExpenses(updatedExpenses);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expense Tracker</h1>
          <p className="text-muted-foreground">Manage and track your shared expenses</p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4,500</div>
            <p className="text-xs text-muted-foreground">
              3 expenses to settle
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,450</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Groups you&#39;re part of
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden rounded-lg border bg-card">
        <KanbanProvider
          columns={columns}
          data={expenses}
          onDataChange={handleExpenseUpdate}
        >
          {(column) => (
            <div key={column.id} className="flex flex-col bg-muted/10">
              <KanbanHeader className="font-semibold border-b bg-muted/30">
                {column.name} ({expenses.filter(e => e.column === column.id).length})
              </KanbanHeader>
              <KanbanCards id={column.id}>
                {(expense: Expense) => (
                  <KanbanCard key={expense.id} {...expense}>
                    <div className="space-y-2">
                      <h3 className="font-medium text-sm">{expense.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {expense.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">
                          ₹{expense.amount.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {expense.date}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">
                          Paid by {expense.paidBy}
                        </span>
                        <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                          {expense.category}
                        </span>
                      </div>
                    </div>
                  </KanbanCard>
                )}
              </KanbanCards>
            </div>
          )}
        </KanbanProvider>
      </div>
    </div>
  );
}
