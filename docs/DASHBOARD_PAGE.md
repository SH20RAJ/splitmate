# Dashboard Page in SplitMate

This document explains how SplitMate implements the dashboard page with expenses and groups.

## Overview

The SplitMate dashboard page provides a comprehensive overview of user expenses and groups in a single view. It combines data from multiple sources to give users a holistic view of their financial activities.

## Dashboard Architecture

### 1. Page Structure

The dashboard page is structured as follows:

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

### 2. Dashboard Component

The dashboard component combines multiple views:

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
            <div className="ring-border bg-green-500 flex size-8 shrink-0 items-center justify-center rounded-full ring-1">
              <IndianRupeeIcon size={14} className="text-white" />
            </div>
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
        <TabsList className="grid w-full grid-cols-3 mb-6">
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

## Dashboard Features

### 1. Statistics Overview

The dashboard shows key statistics at a glance:

- Total Expenses
- Amount You Owe
- Amount Owed to You
- Active Groups Count

### 2. Tabbed Interface

The dashboard uses a tabbed interface to organize content:

- Dashboard tab: Combined view of expenses and groups
- Expenses tab: Detailed expense list
- Groups tab: Detailed group list

### 3. Responsive Design

The dashboard is designed to be responsive:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  {/* Responsive grid layout */}
</div>
```

## Data Integration

### 1. Expense Data

The dashboard integrates expense data from the API:

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

### 2. Group Data

The dashboard integrates group data from the API:

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

## Authentication Integration

### 1. Protected Route

The dashboard page is protected by authentication:

```typescript
// app/dashboard/page.tsx
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

### 2. User Context

Components access user context for personalized data:

```typescript
// components/splitmate/dashboard.tsx
import { useUser } from "@stackframe/stack";

export function SplitMateDashboard() {
  const user = useUser();
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.displayName || "User"}!
        </h1>
        <p className="text-gray-600 mt-2">Manage your expenses and groups</p>
      </div>
      
      {/* Dashboard content */}
    </div>
  );
}
```

## UI Customization

### 1. Branding

The dashboard uses SplitMate branding:

```typescript
<div className="ring-border bg-green-500 flex size-8 shrink-0 items-center justify-center rounded-full ring-1">
  <IndianRupeeIcon size={14} className="text-white" />
</div>
```

### 2. Consistent Design

All components follow a consistent design language:

```css
/* globals.css */
:root {
  --sidebar-primary: 172 78% 30%; /* Teal */
  --sidebar-primary-foreground: 0 0% 100%;
}
```

## Performance Optimization

### 1. Data Fetching

Efficient data fetching with caching:

```typescript
// hooks/use-splitmate.ts
const getExpenses = useCallback(async (): Promise<Expense[] | null> => {
  setIsLoading(true);
  setError(null);
  
  try {
    const response = await fetch('/api/splitmate/expenses');
    
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
    
    const expenses: Expense[] = await response.json();
    return expenses;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    setError(errorMessage);
    return null;
  } finally {
    setIsLoading(false);
  }
}, []);
```

### 2. Loading States

Clear loading states for better UX:

```typescript
if (isLoading) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
    </div>
  );
}
```

## Error Handling

### 1. Graceful Error Handling

Components handle errors gracefully:

```typescript
if (error) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
      <p>Error loading data: {error}</p>
    </div>
  );
}
```

### 2. Retry Mechanism

Provide retry options for failed requests:

```typescript
<div className="flex items-center justify-center gap-2">
  <p className="text-red-700">Failed to load data</p>
  <Button onClick={retryFunction} variant="outline">
    Retry
  </Button>
</div>
```

## Testing

### 1. Component Testing

Test dashboard components with mock data:

```typescript
// components/splitmate/dashboard.test.tsx
import { render, screen } from '@testing-library/react';
import { SplitMateDashboard } from './dashboard';

describe('SplitMateDashboard', () => {
  it('should render dashboard components', () => {
    render(<SplitMateDashboard />);
    expect(screen.getByText('SplitMate Dashboard')).toBeInTheDocument();
  });
});
```

### 2. Integration Testing

Test dashboard integration with API:

```typescript
// app/dashboard/page.test.tsx
import { render, screen } from '@testing-library/react';
import DashboardPage from './page';

describe('DashboardPage', () => {
  it('should render dashboard page', () => {
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
  SplitMateDashboard,
  ExpensesList,
  GroupsList,
}
```

### 2. Consistent Props Interface

Define consistent props interfaces:

```typescript
interface DashboardProps {
  // Props definition
}

const SplitMateDashboard: React.FC<DashboardProps> = ({ ... }) => {
  // Component implementation
};
```

### 3. Error Boundary Implementation

Wrap components in error boundaries:

```typescript
class DashboardErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with the dashboard.</div>;
    }

    return this.props.children;
  }
}
```

## Security Considerations

### 1. Authentication Checks

Verify user authentication before displaying data:

```typescript
const user = await stackServerApp.getUser();
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### 2. Data Validation

Validate all incoming data:

```typescript
if (!amount || isNaN(amount) || amount <= 0) {
  return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
}
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
<Button aria-label="Refresh dashboard">
  <RefreshCwIcon />
</Button>
```

## Conclusion

The dashboard page in SplitMate provides a comprehensive overview of user expenses and groups. By combining data from multiple sources and presenting it in a clean, intuitive interface, the dashboard enables users to quickly understand their financial situation and take appropriate actions.