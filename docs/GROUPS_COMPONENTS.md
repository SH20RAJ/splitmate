# Groups Components in SplitMate

This document explains how SplitMate implements custom components for group management and expense sharing.

## Overview

SplitMate's groups feature allows users to create and manage shared expense groups with friends, family, or colleagues. The components provide a user-friendly interface for group creation, member management, and expense tracking.

## Groups Architecture

### 1. Groups List Component

The `GroupsList` component displays a list of user groups:

```typescript
// components/splitmate/groups-list.tsx
import { useState, useEffect } from 'react';
import { useSplitMate } from '@/hooks/use-splitmate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
                    <Badge variant="secondary" className="mt-1">
                      {group.description}
                    </Badge>
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

### 2. Create Group Component

The `CreateGroup` component allows users to create new groups:

```typescript
// components/splitmate/create-group.tsx
import { useState } from 'react';
import { useSplitMate } from '@/hooks/use-splitmate';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UsersIcon, PlusIcon } from 'lucide-react';

export function CreateGroup() {
  const { createGroup, isLoading, error } = useSplitMate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [memberEmails, setMemberEmails] = useState(['']);

  const handleAddMember = () => {
    setMemberEmails([...memberEmails, '']);
  };

  const handleRemoveMember = (index: number) => {
    if (memberEmails.length > 1) {
      const newEmails = [...memberEmails];
      newEmails.splice(index, 1);
      setMemberEmails(newEmails);
    }
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...memberEmails];
    newEmails[index] = value;
    setMemberEmails(newEmails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      return;
    }

    // Filter out empty emails
    const validEmails = memberEmails.filter(email => email.trim() !== '');
    
    const result = await createGroup({
      name,
      description,
      memberEmails: validEmails,
    });

    if (result) {
      // Reset form
      setName('');
      setDescription('');
      setMemberEmails(['']);
      
      // Show success message or redirect
      alert('Group created successfully!');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UsersIcon className="h-5 w-5" />
          Create New Group
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="groupName">Group Name *</Label>
            <Input
              id="groupName"
              type="text"
              placeholder="e.g., Roommates, Trip to Goa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="groupDescription">Description</Label>
            <Input
              id="groupDescription"
              type="text"
              placeholder="e.g., Monthly expenses for our apartment"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4" />
              Members
            </Label>
            <div className="space-y-2">
              {memberEmails.map((email, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                  />
                  {memberEmails.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveMember(index)}
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
              onClick={handleAddMember}
              className="w-full"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || !name}
            className="w-full"
          >
            {isLoading ? 'Creating...' : 'Create Group'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

### 3. Group Detail Component

The `GroupDetail` component displays detailed information about a specific group:

```typescript
// components/splitmate/group-detail.tsx
import { useState, useEffect } from 'react';
import { useSplitMate } from '@/hooks/use-splitmate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  UsersIcon, 
  CalendarIcon, 
  IndianRupeeIcon,
  PlusIcon,
  EditIcon,
  TrashIcon
} from 'lucide-react';

interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface GroupExpense {
  id: string;
  amount: number;
  description: string;
  paidBy: string;
  date: string;
  participants: string[];
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
  expenses: GroupExpense[];
  createdAt: string;
}

export function GroupDetail({ groupId }: { groupId: string }) {
  const { getGroup, isLoading, error } = useSplitMate();
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    const fetchGroup = async () => {
      const data = await getGroup(groupId);
      if (data) {
        setGroup(data);
      }
    };

    fetchGroup();
  }, [getGroup, groupId]);

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
        <p>Error loading group: {error}</p>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Group not found</p>
      </div>
    );
  }

  // Calculate balances
  const calculateBalances = () => {
    const balances: Record<string, number> = {};
    
    // Initialize balances for all members
    group.members.forEach(member => {
      balances[member.name] = 0;
    });
    
    // Calculate net balances
    group.expenses.forEach(expense => {
      const splitAmount = expense.amount / expense.participants.length;
      
      expense.participants.forEach(participant => {
        if (participant === expense.paidBy) {
          // Person who paid gets credit
          balances[participant] += (expense.amount - splitAmount);
        } else {
          // Others owe money
          balances[participant] -= splitAmount;
        }
      });
    });
    
    return balances;
  };

  const balances = calculateBalances();

  return (
    <div className="space-y-6">
      {/* Group Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{group.name}</CardTitle>
              <p className="text-gray-600 mt-1">{group.description}</p>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon className="h-4 w-4 mr-1" />
              Created {new Date(group.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
            <div className="flex -space-x-2">
              {group.members.slice(0, 5).map((member, index) => (
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
              {group.members.length > 5 && (
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarFallback className="text-xs bg-gray-200">
                    +{group.members.length - 5}
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

      {/* Balances */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupeeIcon className="h-5 w-5" />
            Group Balances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(balances).map(([name, balance]) => (
              <div key={name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">{name}</span>
                <span className={`font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {balance >= 0 ? '+' : ''}₹{Math.abs(balance).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <IndianRupeeIcon className="h-5 w-5" />
              Recent Expenses
            </CardTitle>
            <Button size="sm">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {group.expenses.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No expenses found</p>
          ) : (
            <div className="space-y-3">
              {group.expenses.map((expense) => (
                <div key={expense.id} className="flex justify-between items-center p-3 border-b">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-gray-500">
                      Paid by {expense.paidBy} on {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <IndianRupeeIcon className="h-4 w-4 mr-1 text-green-600" />
                    <span className="font-bold">{expense.amount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Group Actions */}
      <div className="flex gap-2">
        <Button className="flex-1">
          <EditIcon className="h-4 w-4 mr-2" />
          Edit Group
        </Button>
        <Button variant="outline" className="flex-1">
          <TrashIcon className="h-4 w-4 mr-2" />
          Delete Group
        </Button>
      </div>
    </div>
  );
}
```

## Groups Page Integration

### 1. Main Groups Page

The groups page integrates the groups list and create group components:

```typescript
// app/groups/page.tsx
import { GroupsList } from '@/components/splitmate/groups-list';
import { CreateGroup } from '@/components/splitmate/create-group';
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
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GroupsList />
          </div>
          <div className="lg:col-span-1">
            <CreateGroup />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 2. Group Detail Page

The group detail page displays information about a specific group:

```typescript
// app/groups/[groupId]/page.tsx
import { GroupDetail } from '@/components/splitmate/group-detail';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function GroupDetailPage({ params }: { params: { groupId: string } }) {
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
          <h1 className="text-3xl font-bold text-gray-900">Group Details</h1>
          <p className="text-gray-600 mt-2">View and manage your group expenses</p>
        </div>
        
        <GroupDetail groupId={params.groupId} />
      </div>
    </div>
  );
}
```

## Group Management Workflow

### 1. User Flow

1. User navigates to the Groups page
2. User views existing groups or creates a new one
3. User adds members to the group
4. Group members can add expenses
5. Balances are calculated automatically
6. Users can settle debts using UPI payments

### 2. Example Group Data

```json
{
  "id": "group-123",
  "name": "Roommates",
  "description": "Monthly expenses for our apartment",
  "members": [
    {
      "id": "user-1",
      "name": "You",
      "email": "you@example.com",
      "avatar": "https://example.com/avatar1.jpg"
    },
    {
      "id": "user-2",
      "name": "Rahul",
      "email": "rahul@example.com"
    },
    {
      "id": "user-3",
      "name": "Shreya",
      "email": "shreya@example.com"
    }
  ],
  "expenses": [
    {
      "id": "expense-1",
      "amount": 1200,
      "description": "Pizza night",
      "paidBy": "You",
      "date": "2023-05-15",
      "participants": ["You", "Rahul", "Shreya"]
    },
    {
      "id": "expense-2",
      "amount": 500,
      "description": "Cab fare",
      "paidBy": "Rahul",
      "date": "2023-05-16",
      "participants": ["You", "Rahul"]
    }
  ],
  "createdAt": "2023-05-01"
}
```

## Security Considerations

### 1. Group Membership

Group membership is controlled to prevent unauthorized access:

```typescript
// Verify user is a member of the group before allowing access
const isMember = group.members.some(member => member.id === user.id);
if (!isMember) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### 2. Data Privacy

Sensitive group data is protected:

```typescript
// Only expose necessary group information
const groupData = {
  id: group.id,
  name: group.name,
  description: group.description,
  members: group.members.map(member => ({
    id: member.id,
    name: member.name,
    email: member.email,
    avatar: member.avatar,
  })),
  createdAt: group.createdAt,
};
```

## Error Handling

### 1. Group Creation Errors

Proper error handling for group creation:

```typescript
try {
  // Group creation logic
} catch (error) {
  console.error('Error creating group:', error);
  return NextResponse.json({ error: 'Failed to create group' }, { status: 500 });
}
```

### 2. Group Access Errors

Handle cases where groups are not found or inaccessible:

```typescript
if (!group) {
  return NextResponse.json({ error: 'Group not found' }, { status: 404 });
}
```

## Testing

### 1. Unit Testing Components

Test individual components with mock data:

```typescript
// components/splitmate/groups-list.test.tsx
import { render, screen } from '@testing-library/react';
import { GroupsList } from './groups-list';

describe('GroupsList', () => {
  it('should render groups list', () => {
    render(<GroupsList />);
    expect(screen.getByText('Your Groups')).toBeInTheDocument();
  });
});
```

### 2. Integration Testing

Test API routes with mock requests:

```typescript
// app/api/splitmate/groups/route.test.ts
import { GET } from './route';

describe('GET /api/splitmate/groups', () => {
  it('should return groups for authenticated user', async () => {
    const mockRequest = new Request('http://localhost/api/splitmate/groups');
    const response = await GET(mockRequest);
    
    expect(response.status).toBe(200);
    const groups = await response.json();
    expect(Array.isArray(groups)).toBe(true);
  });
});
```

## Best Practices

### 1. Group Naming

Use clear, descriptive names for groups:

```typescript
// Good
{
  name: "Trip to Goa",
  description: "Expenses for our Goa trip in June 2023"
}

// Avoid
{
  name: "Group 1",
  description: "Some expenses"
}
```

### 2. Member Management

Provide clear member management:

```typescript
// Allow adding/removing members
const addMember = (email: string) => {
  // Add member logic
};

const removeMember = (memberId: string) => {
  // Remove member logic
};
```

### 3. Balance Calculation

Calculate balances accurately:

```typescript
// Calculate net balances for all members
const calculateBalances = (expenses: GroupExpense[], members: GroupMember[]) => {
  const balances: Record<string, number> = {};
  
  // Initialize balances
  members.forEach(member => {
    balances[member.name] = 0;
  });
  
  // Calculate net balances
  expenses.forEach(expense => {
    const splitAmount = expense.amount / expense.participants.length;
    
    expense.participants.forEach(participant => {
      if (participant === expense.paidBy) {
        // Person who paid gets credit
        balances[participant] += (expense.amount - splitAmount);
      } else {
        // Others owe money
        balances[participant] -= splitAmount;
      }
    });
  });
  
  return balances;
};
```

## Performance Optimization

### 1. Memoization

Memoize expensive calculations:

```typescript
import { useMemo } from 'react';

const balances = useMemo(() => calculateBalances(expenses, members), [expenses, members]);
```

### 2. Virtual Scrolling

Use virtual scrolling for large lists:

```typescript
import { FixedSizeList as List } from 'react-window';

<List
  height={400}
  itemCount={groups.length}
  itemSize={100}
  itemData={groups}
>
  {GroupItem}
</List>
```

## Accessibility

### 1. Semantic HTML

Use semantic HTML for accessibility:

```typescript
<Card>
  <CardHeader>
    <CardTitle>Group Name</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Group description</p>
  </CardContent>
</Card>
```

### 2. ARIA Labels

Provide proper ARIA labels:

```typescript
<Button aria-label="Add member to group">
  <PlusIcon />
</Button>
```

## Conclusion

The groups components in SplitMate provide a comprehensive solution for collaborative expense tracking. By combining group creation, member management, balance calculation, and integration with UPI payments, SplitMate makes it easy for users to manage shared expenses with friends and family.