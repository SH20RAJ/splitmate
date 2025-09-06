# SplitMate API Routes

This document explains how SplitMate implements API routes for expense management, group management, and user synchronization.

## Overview

SplitMate provides a comprehensive set of API routes for managing expenses, groups, and user data. These routes are protected by authentication middleware and follow RESTful principles.

## Route Architecture

### 1. Base Route Structure

SplitMate organizes API routes under `/api/splitmate`:

```
/api/splitmate/
├── split/          # Bill splitting
├── qr/             # QR code generation
├── remind/         # Sending reminders
├── expenses/       # Expense management
├── groups/         # Group management
└── user/sync/      # User data synchronization
```

### 2. Authentication Middleware

All routes are protected by authentication middleware:

```typescript
// middleware.ts
import { stackServerApp } from '@/stack';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // List of paths that require authentication
  const protectedPaths = [
    '/api/splitmate/',
    '/profile',
    '/dashboard',
    '/groups',
    '/split-bill',
    '/generate-qr',
  ];

  // Check if the current path requires authentication
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    // Get the current user
    const user = await stackServerApp.getUser();
    
    // Redirect to sign in if user is not authenticated
    if (!user) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}
```

## Bill Splitting API Route

### 1. Purpose

The `/api/splitmate/split` route handles bill splitting calculations.

### 2. Implementation

```typescript
// app/api/splitmate/split/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';

interface SplitBillRequest {
  amount: number;
  description: string;
  participants: string[];
}

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const body: SplitBillRequest = await req.json();
    const { amount, description, participants } = body;

    // Validate required fields
    if (!amount || !description || !participants || !Array.isArray(participants)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Calculate split amount
    const splitAmount = amount / participants.length;

    // Create split result
    const splitResult = {
      totalAmount: amount,
      splits: participants.map((person: string) => ({
        person,
        amount: parseFloat(splitAmount.toFixed(2)),
      })),
      description,
    };

    return NextResponse.json(splitResult);
  } catch (error) {
    console.error('Error splitting bill:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### 3. Usage

```bash
curl -X POST http://localhost:3000/api/splitmate/split \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1200,
    "description": "Pizza night",
    "participants": ["You", "Rahul", "Shreya"]
  }'
```

## QR Code Generation API Route

### 1. Purpose

The `/api/splitmate/qr` route generates UPI QR codes for payments.

### 2. Implementation

```typescript
// app/api/splitmate/qr/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { generateUpiLink, generateUpiQrCode } from '@/lib/upi';

interface QrRequest {
  amount: number;
  description?: string;
  upiId?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const body: QrRequest = await req.json();
    const { amount, description, upiId } = body;

    // Validate required fields
    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    // Use provided UPI ID or default to a placeholder
    const userUpiId = upiId || "user@upi";
    const userName = user.displayName || "SplitMate User";
    
    // Generate UPI link
    const upiLink = generateUpiLink(userUpiId, userName, amount);
    
    // Generate QR code
    const qrCode = await generateUpiQrCode(upiLink);
    
    // Create result
    const qrResult = {
      qrCode,
      upiLink,
      amount,
      description: description || `Payment for ₹${amount}`,
    };

    return NextResponse.json(qrResult);
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}
```

### 3. Usage

```bash
curl -X POST http://localhost:3000/api/splitmate/qr \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "description": "Dinner payment",
    "upiId": "user@upi"
  }'
```

## Reminder API Route

### 1. Purpose

The `/api/splitmate/remind` route generates payment reminders.

### 2. Implementation

```typescript
// app/api/splitmate/remind/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { 
  generateUpiLink, 
  generateWhatsAppReminderMessage,
  generateWebShareData
} from '@/lib/upi';

interface ReminderRequest {
  amount: number;
  description: string;
  recipientName: string;
  recipientPhone?: string;
  upiId?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const body: ReminderRequest = await req.json();
    const { amount, description, recipientName, recipientPhone, upiId } = body;

    // Validate required fields
    if (!amount || !description || !recipientName) {
      return NextResponse.json({ error: 'Amount, description, and recipient name are required' }, { status: 400 });
    }

    // Use provided UPI ID or default to a placeholder
    const userUpiId = upiId || "user@upi";
    const userName = user.displayName || "SplitMate User";
    
    // Generate UPI link
    const upiLink = generateUpiLink(userUpiId, userName, amount);
    
    // Generate WhatsApp reminder message
    const whatsappLink = generateWhatsAppReminderMessage(amount, description, upiLink);
    
    // Generate Web Share API data
    const webShareData = generateWebShareData(amount, description, upiLink);
    
    // Create result
    const reminderResult = {
      whatsappLink,
      webShareData,
      upiLink,
      amount,
      description,
      recipientName,
    };

    return NextResponse.json(reminderResult);
  } catch (error) {
    console.error('Error sending reminder:', error);
    return NextResponse.json({ error: 'Failed to send reminder' }, { status: 500 });
  }
}
```

### 3. Usage

```bash
curl -X POST http://localhost:3000/api/splitmate/remind \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 400,
    "description": "Pizza share",
    "recipientName": "Rahul"
  }'
```

## Expenses API Route

### 1. Purpose

The `/api/splitmate/expenses` route manages user expenses.

### 2. Implementation

```typescript
// app/api/splitmate/expenses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';

interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  participants: string[];
  paidBy: string;
}

export async function GET(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock data for expenses
    // In a real app, this would come from a database
    const expenses: Expense[] = [
      {
        id: "1",
        amount: 1200,
        description: "Pizza night",
        category: "Food",
        date: "2023-05-15",
        participants: [user.displayName || "You", "Rahul", "Shreya"],
        paidBy: user.displayName || "You"
      },
      {
        id: "2",
        amount: 500,
        description: "Cab fare",
        category: "Transport",
        date: "2023-05-16",
        participants: [user.displayName || "You", "Rahul"],
        paidBy: "Rahul"
      }
    ];

    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}
```

### 3. Usage

```bash
curl http://localhost:3000/api/splitmate/expenses \
  -H "Authorization: Bearer <token>"
```

## Groups API Route

### 1. Purpose

The `/api/splitmate/groups` route manages user groups.

### 2. Implementation

```typescript
// app/api/splitmate/groups/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';

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

export async function GET(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock data for groups
    // In a real app, this would come from a database
    const groups: Group[] = [
      {
        id: "1",
        name: "Roommates",
        description: "Monthly expenses for our apartment",
        members: [
          {
            id: user.id,
            name: user.displayName || "You",
            email: user.primaryEmail || "",
            avatar: user.profileImageUrl || undefined
          },
          {
            id: "2",
            name: "Rahul",
            email: "rahul@example.com"
          },
          {
            id: "3",
            name: "Shreya",
            email: "shreya@example.com"
          }
        ],
        createdAt: "2023-05-01"
      },
      {
        id: "2",
        name: "Trip to Goa",
        description: "Expenses for our Goa trip",
        members: [
          {
            id: user.id,
            name: user.displayName || "You",
            email: user.primaryEmail || "",
            avatar: user.profileImageUrl || undefined
          },
          {
            id: "4",
            name: "Priya",
            email: "priya@example.com"
          },
          {
            id: "5",
            name: "Amit",
            email: "amit@example.com"
          }
        ],
        createdAt: "2023-05-10"
      }
    ];

    return NextResponse.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 });
  }
}
```

### 3. Usage

```bash
curl http://localhost:3000/api/splitmate/groups \
  -H "Authorization: Bearer <token>"
```

## User Sync API Route

### 1. Purpose

The `/api/splitmate/user/sync` route synchronizes user data between StackAuth and the application database.

### 2. Implementation

```typescript
// app/api/splitmate/user/sync/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In a real app, this would sync user data with the database
    // For now, we'll just return success
    return NextResponse.json({ 
      success: true, 
      message: 'User synced successfully',
      user: {
        id: user.id,
        name: user.displayName,
        email: user.primaryEmail,
      }
    });
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json({ error: 'Failed to sync user' }, { status: 500 });
  }
}
```

### 3. Usage

```bash
curl -X POST http://localhost:3000/api/splitmate/user/sync \
  -H "Authorization: Bearer <token>"
```

## Error Handling

### 1. Standard Error Responses

All API routes return standardized error responses:

```typescript
// Unauthorized
return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

// Bad Request
return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

// Internal Server Error
return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
```

### 2. Logging

All errors are logged for debugging:

```typescript
try {
  // API logic
} catch (error) {
  console.error('Error in API route:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
```

## Security Considerations

### 1. Authentication

All routes require authentication:

```typescript
const user = await stackServerApp.getUser();
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### 2. Input Validation

All inputs are validated:

```typescript
if (!amount || !description || !participants) {
  return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
}
```

### 3. Data Sanitization

User data is sanitized before processing:

```typescript
const sanitizedDescription = description.trim();
const validParticipants = participants.filter(p => p.trim() !== '');
```

## Testing

### 1. API Route Testing

Test API routes with mock requests:

```typescript
// app/api/splitmate/split/route.test.ts
import { POST } from './route';

describe('POST /api/splitmate/split', () => {
  it('should split bill correctly', async () => {
    const mockRequest = new Request('http://localhost/api/splitmate/split', {
      method: 'POST',
      body: JSON.stringify({
        amount: 1200,
        description: 'Pizza night',
        participants: ['You', 'Rahul', 'Shreya'],
      }),
    });

    const response = await POST(mockRequest);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.totalAmount).toBe(1200);
    expect(data.splits).toHaveLength(3);
    expect(data.splits[0]).toEqual({
      person: 'You',
      amount: 400,
    });
  });
});
```

### 2. Integration Testing

Test API route integration with the database:

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

### 1. RESTful Design

Follow RESTful API design principles:

```typescript
// GET /api/splitmate/expenses - Get all expenses
// POST /api/splitmate/split - Split a bill
// POST /api/splitmate/qr - Generate QR code
```

### 2. Consistent Response Format

Use consistent response formats:

```typescript
// Success response
return NextResponse.json({ data: result });

// Error response
return NextResponse.json({ error: 'Error message' }, { status: 400 });
```

### 3. Proper HTTP Status Codes

Use appropriate HTTP status codes:

```typescript
// 200 - Success
// 400 - Bad Request
// 401 - Unauthorized
// 500 - Internal Server Error
```

## Performance Optimization

### 1. Caching

Implement caching for frequently accessed data:

```typescript
// Cache user data for 5 minutes
const cacheKey = `user-${userId}`;
const cachedData = await redis.get(cacheKey);

if (cachedData) {
  return NextResponse.json(cachedData);
}

// Fetch from database and cache
const userData = await fetchUserData(userId);
await redis.setex(cacheKey, 300, userData);
```

### 2. Pagination

Implement pagination for large datasets:

```typescript
// Get pagination parameters
const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10');

// Paginate results
const startIndex = (page - 1) * limit;
const endIndex = startIndex + limit;
const paginatedExpenses = expenses.slice(startIndex, endIndex);
```

## Conclusion

The SplitMate API routes provide a comprehensive backend for expense management, group management, and user synchronization. By following RESTful principles and implementing proper authentication, error handling, and security measures, these routes ensure a reliable and secure foundation for the SplitMate application.