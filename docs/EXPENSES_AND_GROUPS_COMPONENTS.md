# Expenses and Groups Components in SplitMate

This document explains how SplitMate implements custom React components for displaying expenses and groups.

## Overview

SplitMate provides custom React components to display user expenses and groups in an intuitive, visually appealing manner. These components integrate with the SplitMate API to fetch and display real-time data.

## Component Architecture

### 1. Expenses List Component

The `ExpensesList` component displays a list of user expenses:

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

### 2. Groups List Component

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

## Dashboard Component

### 1. Purpose

The `SplitMateDashboard` component combines expenses and groups in a single view:

```typescript
// components/splitmate/dashboard.tsx
import { useState } from 'react';
import { ExpensesList } from '@/components/splitmate/expenses-list';
import { GroupsList } from '@/components/splitmate/groups-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IndianRupeeIcon, UsersIcon, TrendingUpIcon, CalendarIcon } from 'lucide-react';

export function SplitMateDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="container mx-auto py-6 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">SplitMate Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage your expenses and groups</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                        <IndianRupeeIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹1,240</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">You Owe</CardTitle>
                        <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹420</div>
                        <p className="text-xs text-muted-foreground">To 3 people</p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Owed to You</CardTitle>
                        <TrendingUpIcon className="h-4 w-4 text-muted-foreground rotate-180" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹820</div>
                        <p className="text-xs text-muted-foreground">From 5 people</p>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Groups</CardTitle>
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">Active groups</p>
                    </CardContent>
                </Card>
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
}
```

## Integration with Pages

### 1. Dashboard Page

The dashboard page integrates the dashboard component:

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

## Styling Customizations

### 1. Consistent Design Language

All components follow a consistent design language:

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

Use semantic HTML for accessibility:

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

Provide proper ARIA labels:

```typescript
<Button aria-label="Generate QR Code">
  Generate QR Code
</Button>
```

## Testing

### 1. Component Testing

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
{
  ExpensesList,
  GroupsList,
  SplitMateDashboard,
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

The custom components for displaying expenses and groups in SplitMate provide a rich, interactive experience that enhances the user interface. By combining data fetching with attractive UI components, SplitMate makes expense and group management more intuitive and user-friendly.