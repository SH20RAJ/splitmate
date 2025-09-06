# Expenses Components in SplitMate

This document explains how SplitMate implements custom components for expense tracking and management.

## Overview

SplitMate's expenses feature allows users to track, categorize, and analyze their spending through intuitive UI components. These components provide a seamless experience for adding expenses, viewing spending patterns, and managing shared costs.

## Expenses Architecture

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

### 2. Add Expense Component

The `AddExpense` component allows users to add new expenses:

```typescript
// components/splitmate/add-expense.tsx
import { useState } from 'react';
import { useSplitMate } from '@/hooks/use-splitmate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { IndianRupeeIcon, CalendarIcon, UsersIcon, PlusIcon } from 'lucide-react';

interface AddExpenseData {
  amount: number;
  description: string;
  category: string;
  date: string;
  participants: string[];
  paidBy: string;
}

export function AddExpense() {
  const { addExpense, isLoading, error } = useSplitMate();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [participants, setParticipants] = useState(['', '', '']);
  const [paidBy, setPaidBy] = useState('You');

  const handleAddParticipant = () => {
    setParticipants([...participants, '']);
  };

  const handleRemoveParticipant = (index: number) => {
    if (participants.length > 1) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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

    const expenseData: AddExpenseData = {
      amount: amountNum,
      description,
      category,
      date,
      participants: validParticipants,
      paidBy,
    };

    const result = await addExpense(expenseData);

    if (result) {
      // Reset form
      setAmount('');
      setDescription('');
      setCategory('Food');
      setDate(new Date().toISOString().split('T')[0]);
      setParticipants(['', '', '']);
      setPaidBy('You');
      
      // Show success message or refresh expenses list
      alert('Expense added successfully!');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IndianRupeeIcon className="h-5 w-5" />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
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

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-muted border-border dark:border-muted-foreground/15 focus:outline-green-500 placeholder:text-muted-foreground w-full rounded-lg border px-4 py-2 text-base outline-none"
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
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
                  {participants.length > 1 && (
                    <Button
                      type="button"
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
              type="button"
              variant="outline"
              onClick={handleAddParticipant}
              className="w-full"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Participant
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="paidBy">Paid By</Label>
            <select
              id="paidBy"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="bg-muted border-border dark:border-muted-foreground/15 focus:outline-green-500 placeholder:text-muted-foreground w-full rounded-lg border px-4 py-2 text-base outline-none"
            >
              <option value="You">You</option>
              {participants.filter(p => p.trim() !== '').map((participant, index) => (
                <option key={index} value={participant}>
                  {participant}
                </option>
              ))}
            </select>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !amount || !description}
            className="w-full"
          >
            {isLoading ? 'Adding...' : 'Add Expense'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### 3. Expense Detail Component

The `ExpenseDetail` component displays detailed information about a specific expense:

```typescript
// components/splitmate/expense-detail.tsx
import { useState, useEffect } from 'react';
import { useSplitMate } from '@/hooks/use-splitmate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  IndianRupeeIcon, 
  CalendarIcon, 
  UsersIcon, 
  EditIcon, 
  TrashIcon 
} from 'lucide-react';

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  participants: string[];
  paidBy: string;
}

export function ExpenseDetail({ expenseId }: { expenseId: string }) {
  const { getExpense, isLoading, error } = useSplitMate();
  const [expense, setExpense] = useState<Expense | null>(null);

  useEffect(() => {
    const fetchExpense = async () => {
      const data = await getExpense(expenseId);
      if (data) {
        setExpense(data);
      }
    };

    fetchExpense();
  }, [getExpense, expenseId]);

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
        <p>Error loading expense: {error}</p>
      </div>
    );
  }

  if (!expense) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Expense not found</p>
      </div>
    );
  }

  // Calculate split amount
  const splitAmount = expense.amount / expense.participants.length;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{expense.description}</CardTitle>
            <Badge variant="secondary" className="mt-2">
              {expense.category}
            </Badge>
          </div>
          <div className="flex items-center text-green-600 font-bold text-2xl">
            <IndianRupeeIcon className="h-5 w-5 mr-1" />
            {expense.amount}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="h-4 w-4 mr-1" />
          {new Date(expense.date).toLocaleDateString()}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Participants</h3>
          <div className="space-y-2">
            {expense.participants.map((participant, index) => (
              <div key={index} className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {participant.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{participant}</span>
                </div>
                <div className="flex items-center">
                  <IndianRupeeIcon className="h-4 w-4 mr-1 text-green-600" />
                  <span className="font-medium">
                    {participant === expense.paidBy ? (
                      <span className="text-green-600">+{expense.amount - splitAmount}</span>
                    ) : (
                      <span className="text-red-600">-{splitAmount}</span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <span className="font-semibold">Equal Split:</span>
          <span className="text-lg font-bold">₹{splitAmount.toFixed(2)} per person</span>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">
            <EditIcon className="h-4 w-4 mr-2" />
            Edit Expense
          </Button>
          <Button variant="outline" className="flex-1">
            <TrashIcon className="h-4 w-4 mr-2" />
            Delete Expense
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Expenses Page Integration

### 1. Main Expenses Page

The expenses page integrates the expenses list and add expense components:

```typescript
// app/expenses/page.tsx
import { ExpensesList } from '@/components/splitmate/expenses-list';
import { AddExpense } from '@/components/splitmate/add-expense';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function ExpensesPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Your Expenses</h1>
          <p className="text-gray-600 mt-2">Track and manage your shared expenses</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ExpensesList />
          </div>
          <div className="lg:col-span-1">
            <AddExpense />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 2. Expense Detail Page

The expense detail page displays information about a specific expense:

```typescript
// app/expenses/[expenseId]/page.tsx
import { ExpenseDetail } from '@/components/splitmate/expense-detail';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function ExpenseDetailPage({ params }: { params: { expenseId: string } }) {
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
          <h1 className="text-3xl font-bold text-gray-900">Expense Details</h1>
          <p className="text-gray-600 mt-2">View and manage your expense details</p>
        </div>
        
        <ExpenseDetail expenseId={params.expenseId} />
      </div>
    </div>
  );
}
```

## Expense Management Workflow

### 1. User Flow

1. User navigates to the Expenses page
2. User views existing expenses or adds a new one
3. User fills in expense details (amount, description, category, date, participants)
4. Expense is saved to the database
5. Balances are updated automatically
6. User can view detailed expense information

### 2. Example Expense Data

```json
{
  "id": "expense-123",
  "amount": 1200,
  "description": "Pizza night",
  "category": "Food",
  "date": "2023-05-15",
  "participants": ["You", "Rahul", "Shreya"],
  "paidBy": "You"
}
```

## Security Considerations

### 1. Expense Ownership

Expense ownership is verified to prevent unauthorized access:

```typescript
// Verify user owns the expense before allowing access
const isOwner = expense.userId === user.id;
if (!isOwner) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### 2. Data Privacy

Sensitive expense data is protected:

```typescript
// Only expose necessary expense information
const expenseData = {
  id: expense.id,
  amount: expense.amount,
  description: expense.description,
  category: expense.category,
  date: expense.date,
  participants: expense.participants,
  paidBy: expense.paidBy,
};
```

## Error Handling

### 1. Expense Creation Errors

Proper error handling for expense creation:

```typescript
try {
  // Expense creation logic
} catch (error) {
  console.error('Error creating expense:', error);
  return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
}
```

### 2. Expense Access Errors

Handle cases where expenses are not found or inaccessible:

```typescript
if (!expense) {
  return NextResponse.json({ error: 'Expense not found' }, { status: 404 });
}
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

Test API routes with mock requests:

```typescript
// app/api/splitmate/expenses/route.test.ts
import { GET } from './route';

describe('GET /api/splitmate/expenses', () => {
  it('should return expenses for authenticated user', async () => {
    const mockRequest = new Request('http://localhost/api/splitmate/expenses');
    const response = await GET(mockRequest);
    
    expect(response.status).toBe(200);
    const expenses = await response.json();
    expect(Array.isArray(expenses)).toBe(true);
  });
});
```

## Best Practices

### 1. Expense Categorization

Use consistent expense categories:

```typescript
// Define standard categories
const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Accommodation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other'
];
```

### 2. Date Handling

Properly handle dates:

```typescript
// Use ISO format for dates
const currentDate = new Date().toISOString().split('T')[0];
```

### 3. Amount Formatting

Format amounts consistently:

```typescript
// Format amounts to 2 decimal places
const formattedAmount = parseFloat(amount.toFixed(2));
```

## Performance Optimization

### 1. Pagination

Implement pagination for large expense lists:

```typescript
// Fetch expenses with pagination
const { data: expenses, error } = await supabase
  .from('expenses')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
  .range(page * pageSize, (page + 1) * pageSize - 1);
```

### 2. Caching

Cache frequently accessed expense data:

```typescript
// Cache expense data
const expenseCache = new Map<string, Expense>();

const getCachedExpense = (id: string): Expense | undefined => {
  return expenseCache.get(id);
};

const setCachedExpense = (id: string, expense: Expense): void => {
  expenseCache.set(id, expense);
};
```

## Accessibility

### 1. Semantic HTML

Use semantic HTML for accessibility:

```typescript
<Card>
  <CardHeader>
    <CardTitle>Expense Details</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Expense information</p>
  </CardContent>
</Card>
```

### 2. ARIA Labels

Provide proper ARIA labels:

```typescript
<Button aria-label="Add new expense">
  <PlusIcon className="h-4 w-4 mr-2" />
  Add Expense
</Button>
```

## Conclusion

The expenses components in SplitMate provide a comprehensive solution for expense tracking and management. By combining expense listing, addition, and detailed views with proper security and error handling, SplitMate makes it easy for users to manage their shared expenses effectively.