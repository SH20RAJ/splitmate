# Dashboard Components in SplitMate

This document explains how SplitMate implements custom components for the dashboard to provide an overview of expenses and groups.

## Overview

SplitMate's dashboard provides a comprehensive overview of user expenses, groups, and financial status through custom React components that integrate with the SplitMate API.

## Dashboard Architecture

### 1. Dashboard Component Structure

The dashboard is composed of several key components:

```typescript
// components/splitmate/dashboard.tsx
import { ExpensesList } from '@/components/splitmate/expenses-list';
import { GroupsList } from '@/components/splitmate/groups-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IndianRupeeIcon, UsersIcon, TrendingUpIcon, CalendarIcon } from 'lucide-react';

export const SplitMateDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SplitMate Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your expenses and groups</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Expenses" 
          value="₹1,240" 
          change="+12% from last month" 
          icon={<IndianRupeeIcon className="h-4 w-4" />} 
        />
        <StatCard 
          title="You Owe" 
          value="₹420" 
          change="To 3 people" 
          icon={<TrendingUpIcon className="h-4 w-4" />} 
        />
        <StatCard 
          title="Owed to You" 
          value="₹820" 
          change="From 5 people" 
          icon={<TrendingUpIcon className="h-4 w-4 rotate-180" />} 
        />
        <StatCard 
          title="Groups" 
          value="2" 
          change="Active groups" 
          icon={<UsersIcon className="h-4 w-4" />} 
        />
      </div>

      {/* Tabs for Expenses and Groups */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ExpensesList />
            </div>
            <div>
              <GroupsList />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="expenses">
          <ExpensesList />
        </TabsContent>
        
        <TabsContent value="groups">
          <GroupsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};
```

### 2. Stat Card Component

Reusable stat card component for dashboard metrics:

```typescript
// components/splitmate/stat-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="ring-border bg-green-500 flex size-8 shrink-0 items-center justify-center rounded-full ring-1">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
};
```

## Expenses List Component

### 1. Purpose

The `ExpensesList` component displays a list of user expenses with details:

```typescript
// components/splitmate/expenses-list.tsx
import { useState, useEffect } from 'react';
import { useSplitMate } from '@/hooks/use-splitmate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { IndianRupeeIcon, CalendarIcon, UsersIcon } from 'lucide-react';

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  participants: string[];
  paidBy: string;
}

export function ExpensesList() {
  const { getExpenses, isLoading, error } = useSplitMate();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getExpenses();
      if (data) {
        setExpenses(data);
      }
    };

    fetchExpenses();
  }, [getExpenses]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p>Error loading expenses: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Recent Expenses</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No expenses found</p>
      ) : (
        <div className="space-y-3">
          {expenses.map((expense) => (
            <Card key={expense.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{expense.description}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {expense.category}
                    </Badge>
                  </div>
                  <div className="flex items-center text-green-600 font-bold">
                    <IndianRupeeIcon className="h-4 w-4 mr-1" />
                    {expense.amount}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  {new Date(expense.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
                  <div className="flex -space-x-2">
                    {expense.participants.slice(0, 3).map((participant, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">
                          {participant.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {expense.participants.length > 3 && (
                      <Avatar className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs bg-gray-200">
                          +{expense.participants.length - 3}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    Paid by {expense.paidBy}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Groups List Component

### 1. Purpose

The `GroupsList` component displays a list of user groups:

```typescript
// components/splitmate/groups-list.tsx
import { useState, useEffect } from 'react';
import { useSplitMate } from '@/hooks/use-splitmate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UsersIcon, CalendarIcon } from 'lucide-react';

interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
  createdAt: string;
}

export function GroupsList() {
  const { getGroups, isLoading, error } = useSplitMate();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const data = await getGroups();
      if (data) {
        setGroups(data);
      }
    };

    fetchGroups();
  }, [getGroups]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <p>Error loading groups: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Your Groups</h2>
      {groups.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No groups found</p>
      ) : (
        <div className="space-y-3">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{group.description}</p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {new Date(group.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center">
                  <UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
                  <div className="flex -space-x-2">
                    {group.members.slice(0, 4).map((member, index) => (
                      <Avatar key={index} className="h-8 w-8 border-2 border-white">
                        {member.avatar ? (
                          <img 
                            src={member.avatar} 
                            alt={member.name} 
                            className="object-cover" 
                          />
                        ) : (
                          <AvatarFallback className="text-xs">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    ))}
                    {group.members.length > 4 && (
                      <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarFallback className="text-xs bg-gray-200">
                          +{group.members.length - 4}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {group.members.length} members
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

## QR Code Generator Component

### 1. Purpose

The `QrGenerator` component allows users to generate UPI QR codes for payments:

```typescript
// components/splitmate/qr-generator.tsx
import { useState } from 'react';
import { useSplitMate } from '@/hooks/use-splitmate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { IndianRupeeIcon, QrCodeIcon } from 'lucide-react';

export function QrGenerator() {
  const { generateQrCode, isLoading, error } = useSplitMate();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [upiLink, setUpiLink] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!amount) {
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return;
    }

    const result = await generateQrCode({
      amount: amountNum,
      description: description || undefined,
    });

    if (result) {
      setQrCode(result.qrCode);
      setUpiLink(result.upiLink);
    }
  };

  const handleShare = async () => {
    if (!upiLink) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SplitMate Payment Request',
          text: `Please pay ₹${amount} for ${description || 'shared expense'}`,
          url: upiLink,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to copying the link
      try {
        await navigator.clipboard.writeText(upiLink);
        alert('UPI link copied to clipboard!');
      } catch (err) {
        console.error('Error copying link:', err);
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCodeIcon className="h-5 w-5" />
          Generate Payment QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <div className="relative">
            <IndianRupeeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10"
              min="0.01"
              step="0.01"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input
            id="description"
            type="text"
            placeholder="e.g., Dinner at restaurant"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleGenerate} 
          disabled={isLoading || !amount}
          className="w-full"
        >
          {isLoading ? 'Generating...' : 'Generate QR Code'}
        </Button>

        {qrCode && (
          <div className="space-y-4 pt-4">
            <div className="flex flex-col items-center">
              <img 
                src={qrCode} 
                alt="UPI Payment QR Code" 
                className="w-48 h-48 object-contain p-2 border rounded-lg"
              />
              
              <div className="mt-4 text-center">
                <p className="font-semibold">Amount: ₹{amount}</p>
                <p className="text-sm text-gray-600">{description || 'Payment request'}</p>
              </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button 
                className="flex-1 bg-green-500 hover:bg-green-600"
                onClick={() => {
                  if (upiLink) {
                    window.open(upiLink, '_blank');
                  }
                }}
              >
                Pay with UPI App
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleShare}
              >
                Share
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

## Bill Splitter Component

### 1. Purpose

The `BillSplitter` component allows users to split bills equally among participants:

```typescript
// components/splitmate/bill-splitter.tsx
import { useState } from 'react';
import { useSplitMate } from '@/hooks/use-splitmate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { IndianRupeeIcon, UsersIcon, CalculatorIcon } from 'lucide-react';

// Define types for our data structures
interface SplitBillData {
  amount: number;
  description: string;
  participants: string[];
}

interface SplitResult {
  totalAmount: number;
  splits: { person: string; amount: number }[];
  description: string;
}

export function BillSplitter() {
  const { splitBill, isLoading, error } = useSplitMate();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState(['', '', '']);
  const [splitResult, setSplitResult] = useState<SplitResult | null>(null);

  const handleAddParticipant = () => {
    setParticipants([...participants, '']);
  };

  const handleRemoveParticipant = (index: number) => {
    if (participants.length > 2) {
      const newParticipants = [...participants];
      newParticipants.splice(index, 1);
      setParticipants(newParticipants);
    }
  };

  const handleParticipantChange = (index: number, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const handleSplit = async () => {
    if (!amount || !description) {
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return;
    }

    // Filter out empty participants
    const validParticipants = participants.filter(p => p.trim() !== '');
    
    if (validParticipants.length === 0) {
      return;
    }

    const result = await splitBill({
      amount: amountNum,
      description,
      participants: validParticipants,
    });

    if (result) {
      setSplitResult(result);
    }
  };

  const resetForm = () => {
    setAmount('');
    setDescription('');
    setParticipants(['', '', '']);
    setSplitResult(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalculatorIcon className="h-5 w-5" />
          Split a Bill
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {splitResult ? (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold">Split Result</h3>
              <p className="text-gray-600 mt-1">{splitResult.description}</p>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold text-lg">₹{splitResult.totalAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-green-200 pt-2">
                <h4 className="font-medium mb-2">Equal Split:</h4>
                <div className="space-y-2">
                  {splitResult.splits.map((split, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4" />
                        <span>{split.person}</span>
                      </div>
                      <span className="font-medium">₹{split.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={resetForm} className="flex-1">
                Split Another Bill
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <div className="relative">
                  <IndianRupeeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter total amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10"
                    min="0.01"
                    step="0.01"
                  />
                </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="e.g., Pizza dinner"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4" />
                Participants
              </Label>
              <div className="space-y-2">
                {participants.map((participant, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      type="text"
                      placeholder={`Participant ${index + 1}`}
                      value={participant}
                      onChange={(e) => handleParticipantChange(index, e.target.value)}
                    />
                    {participants.length > 2 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveParticipant(index)}
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={handleAddParticipant}
                className="w-full"
              >
                Add Participant
              </Button>
            </div>
            
            <Button 
              onClick={handleSplit} 
              disabled={isLoading || !amount || !description}
              className="w-full"
            >
              {isLoading ? 'Splitting...' : 'Split Bill Equally'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

## Component Integration

### 1. Dashboard Page

The dashboard page integrates all components:

```typescript
// app/dashboard/page.tsx
import { SplitMateDashboard } from '@/components/splitmate/dashboard';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  // Get the current user
  const user = await stackServerApp.getUser();
  
  // Redirect to sign in if user is not authenticated
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SplitMateDashboard />
    </div>
  );
}
```

### 2. Groups Page

The groups page displays group information:

```typescript
// app/groups/page.tsx
import { GroupsList } from '@/components/splitmate/groups-list';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function GroupsPage() {
  // Get the current user
  const user = await stackServerApp.getUser();
  
  // Redirect to sign in if user is not authenticated
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Groups</h1>
          <p className="text-gray-600 mt-2">Manage your expense sharing groups</p>
        </div>
        
        <GroupsList />
      </div>
    </div>
  );
}
```

### 3. QR Code Generator Page

The QR code generator page allows users to create payment QR codes:

```typescript
// app/generate-qr/page.tsx
import { QrGenerator } from '@/components/splitmate/qr-generator';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function GenerateQrPage() {
  // Get the current user
  const user = await stackServerApp.getUser();
  
  // Redirect to sign in if user is not authenticated
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Generate Payment QR Code</h1>
          <p className="text-gray-600 mt-2">Create a QR code for easy UPI payments</p>
        </div>
        
        <QrGenerator />
      </div>
    </div>
  );
}
```

### 4. Bill Splitter Page

The bill splitter page allows users to split bills:

```typescript
// app/split-bill/page.tsx
import { BillSplitter } from '@/components/splitmate/bill-splitter';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function SplitBillPage() {
  // Get the current user
  const user = await stackServerApp.getUser();
  
  // Redirect to sign in if user is not authenticated
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Split a Bill</h1>
          <p className="text-gray-600 mt-2">Easily divide expenses among friends</p>
        </div>
        
        <BillSplitter />
      </div>
    </div>
  );
}
```

## Styling Customizations

### 1. Consistent Design Language

All dashboard components follow a consistent design language:

```css
/* globals.css */
:root {
  --sidebar-primary: 172 78% 30%; /* Teal */
  --sidebar-primary-foreground: 0 0% 100%;
}
```

### 2. Responsive Layout

Components are designed to be responsive:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {/* Responsive grid layout */}
</div>
```

### 3. Dark Mode Support

Components support dark mode:

```typescript
<div className="dark:bg-background dark:hover:bg-accent/60">
  {/* Dark mode classes */}
</div>
```

## Performance Optimizations

### 1. Memoization

Components are memoized to prevent unnecessary re-renders:

```typescript
import { memo } from "react";

const MemoizedComponent = memo(({ data }) => {
  // Component implementation
});
```

### 2. Lazy Loading

Heavy components are lazy-loaded when needed:

```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(
  () => import('@/components/splitmate/heavy-component'),
  { ssr: false }
);
```

## Accessibility Features

### 1. Semantic HTML

Components use semantic HTML for accessibility:

```typescript
<Card>
  <CardHeader>
    <CardTitle>Accessible Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Accessible content</p>
  </CardContent>
</Card>
```

### 2. ARIA Labels

Components include proper ARIA labels:

```typescript
<Button aria-label="Generate QR Code">
  Generate QR Code
</Button>
```

## Testing

### 1. Unit Testing Components

Test individual components with mock data:

```typescript
// components/splitmate/expenses-list.test.tsx
import { render, screen } from '@testing-library/react';
import { ExpensesList } from './expenses-list';

describe('ExpensesList', () => {
  it('should render expenses list', () => {
    render(<ExpensesList />);
    expect(screen.getByText('Recent Expenses')).toBeInTheDocument();
  });
});
```

### 2. Integration Testing

Test component integration with the API:

```typescript
// app/dashboard/page.test.tsx
import { render, screen } from '@testing-library/react';
import DashboardPage from './page';

describe('DashboardPage', () => {
  it('should render dashboard components', () => {
    render(<DashboardPage />);
    expect(screen.getByText('SplitMate Dashboard')).toBeInTheDocument();
  });
});
```

## Best Practices

### 1. Descriptive Component Names

Use clear, descriptive names for components:

```typescript
// Good
{
  SplitMateDashboard,
  ExpensesList,
  GroupsList,
  QrGenerator,
  BillSplitter,
}

// Avoid
{
  Dashboard,
  List,
  Generator,
  Splitter,
}
```

### 2. Consistent Props Interface

Define consistent props interfaces:

```typescript
interface ComponentProps {
  // Props definition
}

const Component: React.FC<ComponentProps> = ({ ... }) => {
  // Component implementation
};
```

### 3. Error Boundary Implementation

Wrap components in error boundaries:

```typescript
class ComponentErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with this component.</div>;
    }

    return this.props.children;
  }
}
```

## Security Considerations

### 1. Input Validation

Validate all component inputs:

```typescript
const amountNum = parseFloat(amount);
if (isNaN(amountNum) || amountNum <= 0) {
  throw new Error('Invalid amount');
}
```

### 2. Data Encoding

Encode all user data in URLs:

```typescript
const encodedMessage = encodeURIComponent(message);
```

## Conclusion

The dashboard components in SplitMate provide a comprehensive, user-friendly interface for expense management. Through careful design and implementation, these components enable users to easily track expenses, manage groups, generate payment QR codes, and split bills with friends and family.