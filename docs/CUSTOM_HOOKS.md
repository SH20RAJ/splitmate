# Custom Hooks in SplitMate

This document explains how SplitMate implements custom React hooks to manage state and interact with the API.

## Overview

SplitMate implements custom React hooks to encapsulate business logic and API interactions, making components cleaner and more maintainable.

## Hook Architecture

### 1. Base Hook Implementation

SplitMate uses a base hook for API interactions:

```typescript
// hooks/use-splitmate.ts
import { useState, useCallback } from 'react';

// Define types for our data structures
interface SplitBillData {
  amount: number;
  description: string;
  participants: string[];
}

interface QrCodeData {
  amount: number;
  description?: string;
  upiId?: string;
}

interface ReminderData {
  amount: number;
  description: string;
  recipientName: string;
  recipientPhone?: string;
  upiId?: string;
}

interface SplitResult {
  totalAmount: number;
  splits: { person: string; amount: number }[];
  description: string;
}

interface QrResult {
  qrCode: string;
  upiLink: string;
  amount: number;
  description: string;
}

interface ReminderResult {
  whatsappLink: string;
  webShareData: any;
  upiLink: string;
  amount: number;
  description: string;
  recipientName: string;
}

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  participants: string[];
  paidBy: string;
}

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

export function useSplitMate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Split bill
  const splitBill = useCallback(async (data: SplitBillData): Promise<SplitResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/splitmate/split', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to split bill');
      }
      
      const result: SplitResult = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Generate QR code
  const generateQrCode = useCallback(async (data: QrCodeData): Promise<QrResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/splitmate/qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }
      
      const result: QrResult = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send reminder
  const sendReminder = useCallback(async (data: ReminderData): Promise<ReminderResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/splitmate/remind', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send reminder');
      }
      
      const result: ReminderResult = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get expenses
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

  // Get groups
  const getGroups = useCallback(async (): Promise<Group[] | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/splitmate/groups');
      
      if (!response.ok) {
        throw new Error('Failed to fetch groups');
      }
      
      const groups: Group[] = await response.json();
      return groups;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    splitBill,
    generateQrCode,
    sendReminder,
    getExpenses,
    getGroups,
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
                        {participant.avatar ? (
                          <img 
                            src={participant.avatar} 
                            alt={participant.name} 
                            className="object-cover" 
                          />
                        ) : (
                          <AvatarFallback className="text-xs">
                            {participant.name.charAt(0)}
                          </AvatarFallback>
                        )}
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

### 2. In Pages

Using hooks in Next.js pages:

```typescript
// app/dashboard/page.tsx
import { useSplitMate } from '@/hooks/use-splitmate';

export default function DashboardPage() {
  const { getExpenses, getGroups } = useSplitMate();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [groups, setGroups] = useState<Group[]>([];

  useEffect(() => {
    const fetchData = async () => {
      // Fetch expenses
      const expensesResult = await getExpenses();
      if (expensesResult) {
        setExpenses(expensesResult);
      }

      // Fetch groups
      const groupsResult = await getGroups();
      if (groupsResult) {
        setGroups(groupsResult);
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
    
    if (error) {
      // Handle specific error cases
      switch (error.status) {
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
          alert(error.message);
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

describe('useSplitMate', () => {
  it('should split bill correctly', async () => {
    const { result } = renderHook(() => useSplitMate());
    
    await act(async () => {
      const splitResult = await result.current.splitBill({
        amount: 1200,
        description: 'Pizza night',
        participants: ['You', 'Rahul', 'Shreya'],
      });
      
      expect(splitResult).toEqual({
        totalAmount: 1200,
        splits: [
          { person: 'You', amount: 400 },
          { person: 'Rahul', amount: 400 },
          { person: 'Shreya', amount: 400 },
        ],
        description: 'Pizza night',
      });
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
    getExpenses: jest.fn().mockResolvedValue([
      { id: '1', amount: 1200, description: 'Pizza night', category: 'Food', date: '2023-05-15' },
      { id: '2', amount: 500, description: 'Cab fare', category: 'Transport', date: '2023-05-16' },
    ]),
    isLoading: false,
    error: null,
  }),
}));

describe('ExpensesList', () => {
  it('should render expenses list', () => {
    render(<ExpensesList />);
    expect(screen.getByText('Recent Expenses')).toBeInTheDocument();
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

const [expenses, setExpenses] = useState<Expense[]>([]);
```

### 2. Memoization

Use `useCallback` for function memoization:

```typescript
const splitBill = useCallback(async (data: SplitBillData): Promise<SplitResult | null> => {
  // Implementation
}, []);
```

### 3. Error Boundaries

Handle errors gracefully:

```typescript
try {
  // API call
} catch (err) {
  const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
  setError(errorMessage);
  return null;
}
```

### 4. Loading States

Provide clear loading states:

```typescript
const [isLoading, setIsLoading] = useState(false);

// Set loading state before API call
setIsLoading(true);

// Reset loading state after API call
finally {
  setIsLoading(false);
}
```

## Performance Optimization

### 1. Memoization

Use `useCallback` to prevent unnecessary re-renders:

```typescript
const splitBill = useCallback(async (data: SplitBillData): Promise<SplitResult | null> => {
  // Implementation
}, []);
```

### 2. Dependency Arrays

Specify dependency arrays correctly:

```typescript
const fetchData = useCallback(async () => {
  // Implementation
}, [dependency1, dependency2]); // Correct dependencies
```

## Composition

### 1. Combining Hooks

Custom hooks can be composed:

```typescript
const useSplitMateWithAuth = () => {
  const { user } = useUser();
  const splitMate = useSplitMate();
  
  return {
    ...splitMate,
    isAuthenticated: !!user,
  };
};
```

### 2. Higher-Order Hooks

Create higher-order hooks for common patterns:

```typescript
const useAuthenticatedSplitMate = () => {
  const { user } = useUser({ or: 'redirect' });
  const splitMate = useSplitMate();
  
  return {
    ...splitMate,
    user,
  };
};
```

## Security Considerations

### 1. Input Validation

Validate all hook inputs:

```typescript
const splitBill = useCallback(async (data: SplitBillData): Promise<SplitResult | null> => {
  // Validate amount
  if (!data.amount || data.amount <= 0) {
    setError('Amount must be greater than zero');
    return null;
  }
  
  // Validate description
  if (!data.description || data.description.trim() === '') {
    setError('Description is required');
    return null;
  }
  
  // Validate participants
  if (!data.participants || data.participants.length < 2) {
    setError('At least two participants are required');
    return null;
  }
  
  // Implementation
}, []);
```

### 2. Authentication Checks

Verify user authentication before API calls:

```typescript
const splitBill = useCallback(async (data: SplitBillData): Promise<SplitResult | null> => {
  // Check if user is authenticated
  const user = await stackServerApp.getUser();
  if (!user) {
    setError('Unauthorized');
    return null;
  }
  
  // Implementation
}, []);
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

## Conclusion

The custom hooks in SplitMate provide a clean, reusable way to manage state and interact with APIs. By encapsulating business logic in hooks, SplitMate keeps components focused on UI concerns while maintaining a consistent, type-safe interface for data operations.