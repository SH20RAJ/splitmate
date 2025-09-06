# SplitMate API Hooks

This document explains how SplitMate implements custom React hooks for interacting with its API endpoints.

## Overview

SplitMate provides a set of custom React hooks that encapsulate API interactions for expenses, groups, UPI integration, and reminders. These hooks handle authentication, error handling, and loading states automatically.

## Hook Architecture

### 1. Base Hook Implementation

The base hook provides common functionality for all API interactions:

```typescript
// hooks/use-splitmate.ts
import { useState, useCallback } from 'react';
import { stackServerApp } from '@/stack';

// Define types for our data structures
interface ApiError {
  message: string;
  status?: number;
}

interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
}

// Base hook for API interactions
function useApi<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const callApi = useCallback(async (
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get the current user for authentication
      const user = await stackServerApp.getUser();
      if (!user) {
        throw new Error('Unauthorized');
      }

      // Set default headers
      const defaultHeaders = {
        'Content-Type': 'application/json',
        // Add any other default headers here
      };

      // Merge headers
      const headers = {
        ...defaultHeaders,
        ...options.headers,
      };

      // Make API call
      const response = await fetch(endpoint, {
        ...options,
        headers,
      });

      // Handle errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      // Parse response
      const data: T = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError({
        message: errorMessage,
        status: (err as any).status || undefined,
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    callApi,
  };
}
```

## Expense Hooks

### 1. Get Expenses Hook

Fetch user expenses from the API:

```typescript
// hooks/use-splitmate.ts
interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  participants: string[];
  paidBy: string;
}

export function useExpenses() {
  const { callApi, isLoading, error } = useApi<Expense[]>();

  const getExpenses = useCallback(async (): Promise<ApiResponse<Expense[]>> => {
    try {
      const data = await callApi('/api/splitmate/expenses', {
        method: 'GET',
      });

      return {
        data,
        error: null,
        isLoading: false,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch expenses';
      return {
        data: null,
        error: { message: errorMessage },
        isLoading: false,
      };
    }
  }, [callApi]);

  return {
    getExpenses,
    isLoading,
    error,
  };
}
```

### 2. Create Expense Hook

Create a new expense:

```typescript
// hooks/use-splitmate.ts
interface CreateExpenseData {
  amount: number;
  description: string;
  category: string;
  date: string;
  participants: string[];
  paidBy: string;
}

export function useCreateExpense() {
  const { callApi, isLoading, error } = useApi<Expense>();

  const createExpense = useCallback(async (
    expenseData: CreateExpenseData
  ): Promise<ApiResponse<Expense>> => {
    try {
      const data = await callApi('/api/splitmate/expenses', {
        method: 'POST',
        body: JSON.stringify(expenseData),
      });

      return {
        data,
        error: null,
        isLoading: false,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create expense';
      return {
        data: null,
        error: { message: errorMessage },
        isLoading: false,
      };
    }
  }, [callApi]);

  return {
    createExpense,
    isLoading,
    error,
  };
}
```

## Group Hooks

### 1. Get Groups Hook

Fetch user groups from the API:

```typescript
// hooks/use-splitmate.ts
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

export function useGroups() {
  const { callApi, isLoading, error } = useApi<Group[]>();

  const getGroups = useCallback(async (): Promise<ApiResponse<Group[]>> => {
    try {
      const data = await callApi('/api/splitmate/groups', {
        method: 'GET',
      });

      return {
        data,
        error: null,
        isLoading: false,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch groups';
      return {
        data: null,
        error: { message: errorMessage },
        isLoading: false,
      };
    }
  }, [callApi]);

  return {
    getGroups,
    isLoading,
    error,
  };
}
```

### 2. Create Group Hook

Create a new group:

```typescript
// hooks/use-splitmate.ts
interface CreateGroupData {
  name: string;
  description: string;
  memberEmails: string[];
}

export function useCreateGroup() {
  const { callApi, isLoading, error } = useApi<Group>();

  const createGroup = useCallback(async (
    groupData: CreateGroupData
  ): Promise<ApiResponse<Group>> => {
    try {
      const data = await callApi('/api/splitmate/groups', {
        method: 'POST',
        body: JSON.stringify(groupData),
      });

      return {
        data,
        error: null,
        isLoading: false,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create group';
      return {
        data: null,
        error: { message: errorMessage },
        isLoading: false,
      };
    }
  }, [callApi]);

  return {
    createGroup,
    isLoading,
    error,
  };
}
```

## UPI Integration Hooks

### 1. Generate UPI Link Hook

Generate UPI deep links for payments:

```typescript
// hooks/use-splitmate.ts
interface UpiLinkData {
  amount: number;
  description?: string;
  upiId?: string;
}

interface UpiLinkResult {
  upiLink: string;
  qrCode: string;
  amount: number;
  description: string;
}

export function useUpiLink() {
  const { callApi, isLoading, error } = useApi<UpiLinkResult>();

  const generateUpiLink = useCallback(async (
    upiData: UpiLinkData
  ): Promise<ApiResponse<UpiLinkResult>> => {
    try {
      const data = await callApi('/api/splitmate/upi', {
        method: 'POST',
        body: JSON.stringify(upiData),
      });

      return {
        data,
        error: null,
        isLoading: false,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate UPI link';
      return {
        data: null,
        error: { message: errorMessage },
        isLoading: false,
      };
    }
  }, [callApi]);

  return {
    generateUpiLink,
    isLoading,
    error,
  };
}
```

### 2. Generate QR Code Hook

Generate QR codes for UPI payments:

```typescript
// hooks/use-splitmate.ts
export function useQrCode() {
  const { callApi, isLoading, error } = useApi<UpiLinkResult>();

  const generateQrCode = useCallback(async (
    qrData: UpiLinkData
  ): Promise<ApiResponse<UpiLinkResult>> => {
    try {
      const data = await callApi('/api/splitmate/qr', {
        method: 'POST',
        body: JSON.stringify(qrData),
      });

      return {
        data,
        error: null,
        isLoading: false,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate QR code';
      return {
        data: null,
        error: { message: errorMessage },
        isLoading: false,
      };
    }
  }, [callApi]);

  return {
    generateQrCode,
    isLoading,
    error,
  };
}
```

## Reminder Hooks

### 1. Send Reminder Hook

Send payment reminders via WhatsApp or Web Share:

```typescript
// hooks/use-splitmate.ts
interface ReminderData {
  amount: number;
  description: string;
  recipientName: string;
  recipientPhone?: string;
  upiId?: string;
}

interface ReminderResult {
  whatsappLink: string;
  webShareData: any;
  upiLink: string;
  amount: number;
  description: string;
  recipientName: string;
}

export function useReminder() {
  const { callApi, isLoading, error } = useApi<ReminderResult>();

  const sendReminder = useCallback(async (
    reminderData: ReminderData
  ): Promise<ApiResponse<ReminderResult>> => {
    try {
      const data = await callApi('/api/splitmate/remind', {
        method: 'POST',
        body: JSON.stringify(reminderData),
      });

      return {
        data,
        error: null,
        isLoading: false,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reminder';
      return {
        data: null,
        error: { message: errorMessage },
        isLoading: false,
      };
    }
  }, [callApi]);

  return {
    sendReminder,
    isLoading,
    error,
  };
}
```

## Combined Hook

### 1. Main SplitMate Hook

A combined hook that provides access to all SplitMate functionality:

```typescript
// hooks/use-splitmate.ts
export function useSplitMate() {
  // Expense hooks
  const { getExpenses } = useExpenses();
  const { createExpense } = useCreateExpense();
  
  // Group hooks
  const { getGroups } = useGroups();
  const { createGroup } = useCreateGroup();
  
  // UPI hooks
  const { generateUpiLink } = useUpiLink();
  const { generateQrCode } = useQrCode();
  
  // Reminder hooks
  const { sendReminder } = useReminder();
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Combined function to split bills
  const splitBill = useCallback(async ({
    amount,
    description,
    participants,
  }: {
    amount: number;
    description: string;
    participants: string[];
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Calculate split amount
      const splitAmount = amount / participants.length;
      
      // Create split result
      const splitResult = {
        totalAmount: amount,
        splits: participants.map((person) => ({
          person,
          amount: parseFloat(splitAmount.toFixed(2)),
        })),
        description,
      };
      
      return splitResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to split bill';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // Expense functions
    getExpenses,
    createExpense,
    
    // Group functions
    getGroups,
    createGroup,
    
    // UPI functions
    generateUpiLink,
    generateQrCode,
    
    // Reminder functions
    sendReminder,
    
    // Combined functions
    splitBill,
    
    // State
    isLoading,
    error,
  };
}
```

## Hook Usage

### 1. In Components

Using hooks in React components:

```typescript
// components/splitmate/expenses-list.tsx
import { useSplitMate } from '@/hooks/use-splitmate';

export function ExpensesList() {
  const { getExpenses, isLoading, error } = useSplitMate();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const result = await getExpenses();
      if (result && result.data) {
        setExpenses(result.data);
      }
    };

    fetchExpenses();
  }, [getExpenses]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id}>
          <p>{expense.description}: ₹{expense.amount}</p>
        </div>
      ))}
    </div>
  );
}
```

### 2. In Pages

Using hooks in Next.js pages:

```typescript
// app/dashboard/page.tsx
import { useSplitMate } from '@/hooks/use-splitmate';

export default function DashboardPage() {
  const { getExpenses, getGroups } = useSplitMate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch expenses
      const expensesResult = await getExpenses();
      if (expensesResult && expensesResult.data) {
        setExpenses(expensesResult.data);
      }

      // Fetch groups
      const groupsResult = await getGroups();
      if (groupsResult && groupsResult.data) {
        setGroups(groupsResult.data);
      }
    };

    fetchData();
  }, [getExpenses, getGroups]);

  return (
    <div>
      <h1>Dashboard</h1>
      <ExpensesList expenses={expenses} />
      <GroupsList groups={groups} />
    </div>
  );
}
```

## Error Handling

### 1. Comprehensive Error Handling

Hooks provide comprehensive error handling:

```typescript
const { getExpenses, error } = useSplitMate();

useEffect(() => {
  const fetchExpenses = async () => {
    const result = await getExpenses();
    
    if (result.error) {
      // Handle specific error cases
      switch (result.error.status) {
        case 401:
          // Redirect to sign in
          router.push('/sign-in');
          break;
        case 403:
          // Show permission denied message
          alert('Permission denied');
          break;
        case 500:
          // Show server error message
          alert('Server error. Please try again later.');
          break;
        default:
          // Show generic error message
          alert(result.error.message);
      }
    }
  };

  fetchExpenses();
}, [getExpenses, router]);
```

### 2. Loading States

Hooks provide loading states for better UX:

```typescript
const { getExpenses, isLoading } = useSplitMate();

if (isLoading) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
    </div>
  );
}
```

## Testing

### 1. Unit Testing Hooks

Test hooks with mock data:

```typescript
// hooks/use-splitmate.test.ts
import { renderHook, act } from '@testing-library/react';
import { useSplitMate } from './use-splitmate';

// Mock fetch globally
global.fetch = jest.fn();

describe('useSplitMate', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should fetch expenses', async () => {
    // Mock API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([{ id: '1', amount: 100, description: 'Test' }]),
    });

    const { result } = renderHook(() => useSplitMate());

    await act(async () => {
      const expensesResult = await result.current.getExpenses();
      expect(expensesResult.data).toEqual([{ id: '1', amount: 100, description: 'Test' }]);
    });
  });
});
```

### 2. Integration Testing

Test hook integration with components:

```typescript
// components/splitmate/expenses-list.test.tsx
import { render, screen } from '@testing-library/react';
import { ExpensesList } from './expenses-list';

// Mock the hook
jest.mock('@/hooks/use-splitmate', () => ({
  useSplitMate: () => ({
    getExpenses: () => Promise.resolve({
      data: [{ id: '1', amount: 100, description: 'Test' }],
      error: null,
      isLoading: false,
    }),
    isLoading: false,
    error: null,
  }),
}));

describe('ExpensesList', () => {
  it('should render expenses', async () => {
    render(<ExpensesList />);
    
    // Wait for async operations
    await screen.findByText('Test');
    
    expect(screen.getByText('Test: ₹100')).toBeInTheDocument();
  });
});
```

## Best Practices

### 1. Type Safety

Use TypeScript for type safety:

```typescript
interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  participants: string[];
  paidBy: string;
}

const { getExpenses } = useSplitMate<Expense[]>();
```

### 2. Memoization

Memoize expensive computations:

```typescript
const totalExpenses = useMemo(() => {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}, [expenses]);
```

### 3. Error Boundaries

Use error boundaries for graceful error handling:

```typescript
class ExpensesErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with expenses.</div>;
    }

    return this.props.children;
  }
}
```

## Performance Optimization

### 1. Data Fetching Optimization

Optimize data fetching with caching:

```typescript
const { data: expenses, isLoading } = useQuery(
  ['expenses'],
  () => fetchExpenses(),
  {
    staleTime: 5 * 60 * 1000, // 5 minutes
  }
);
```

### 2. Debouncing

Debounce expensive operations:

```typescript
const debouncedSearch = debounce((searchTerm: string) => {
  setSearchTerm(searchTerm);
}, 300);
```

## Security Considerations

### 1. Authentication

All hooks automatically handle authentication:

```typescript
const user = await stackServerApp.getUser();
if (!user) {
  throw new Error('Unauthorized');
}
```

### 2. Input Validation

Validate all inputs before API calls:

```typescript
if (!amount || amount <= 0) {
  throw new Error('Invalid amount');
}
```

## Conclusion

The SplitMate API hooks provide a robust, type-safe interface for interacting with the application's backend services. By encapsulating authentication, error handling, and loading states, these hooks make it easy for developers to build feature-rich expense management applications with minimal boilerplate code.