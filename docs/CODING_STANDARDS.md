# SplitMate Coding Standards

This document outlines the coding standards and best practices used in the SplitMate project.

## TypeScript Standards

### Strict Typing

All TypeScript code should use strict typing with no implicit any:

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

// Bad
interface User {
  id: any;
  name: string;
  email: string;
}
```

### Explicit Return Types

Functions should have explicit return types:

```typescript
// Good
function getUserById(id: string): Promise<User | null> {
  // implementation
}

// Bad
function getUserById(id: string) {
  // implementation
}
```

### Type Guards

Use type guards for narrowing types:

```typescript
// Good
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'string' && typeof obj.name === 'string';
}

// Usage
if (isUser(data)) {
  // data is now typed as User
  console.log(data.name);
}
```

## React Standards

### Functional Components

Use functional components with hooks:

```typescript
// Good
interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

// Bad
export class UserProfile extends React.Component<UserProfileProps> {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    );
  }
}
```

### Hooks Usage

Follow the Rules of Hooks:

```typescript
// Good
export const useUserProfile = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userData = await getUserById(userId);
        setUser(userData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [userId]);
  
  return { user, loading };
};

// Bad - calling hook conditionally
export const useUserProfile = (userId: string) => {
  if (!userId) {
    return null; // Don't do this
  }
  
  return useUser(userId); // Hooks must be called at top level
};
```

### Component Props

Use TypeScript interfaces for component props:

```typescript
// Good
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
}) => {
  // implementation
};

// Bad
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false,
}: any) => {
  // implementation
};
```

## Styling Standards

### TailwindCSS

Use TailwindCSS utility classes for styling:

```typescript
// Good
export const Card: React.FC = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      {children}
    </div>
  );
};

// Bad - mixing with inline styles
export const Card: React.FC = ({ children }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6"
      style={{ border: '1px solid #e5e7eb' }}
    >
      {children}
    </div>
  );
};
```

### Responsive Design

Use responsive utility classes:

```typescript
// Good
<div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
  <div className="w-full md:w-1/2">
    {/* Content */}
  </div>
  <div className="w-full md:w-1/2">
    {/* Content */}
  </div>
</div>
```

### Dark Mode

Support dark mode with TailwindCSS variants:

```typescript
// Good
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  {/* Content */}
</div>
```

## API Standards

### RESTful Design

Follow RESTful API design principles:

```typescript
// Good
// GET /api/users - Get all users
// GET /api/users/{id} - Get user by ID
// POST /api/users - Create new user
// PUT /api/users/{id} - Update user
// DELETE /api/users/{id} - Delete user

// Bad
// GET /api/getUsers - Not RESTful
// GET /api/createUser - Should be POST
```

### Error Handling

Return appropriate HTTP status codes:

```typescript
// Good
export async function GET(req: Request) {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// Bad
export async function GET(req: Request) {
  const users = await getUsers();
  return NextResponse.json(users); // No error handling
}
```

### Input Validation

Validate all inputs:

```typescript
// Good
export async function POST(req: Request) {
  const body = await req.json();
  
  // Validate required fields
  if (!body.name || !body.email) {
    return NextResponse.json(
      { error: 'Name and email are required' }, 
      { status: 400 }
    );
  }
  
  // Validate email format
  if (!isValidEmail(body.email)) {
    return NextResponse.json(
      { error: 'Invalid email format' }, 
      { status: 400 }
    );
  }
  
  // Process request
  const user = await createUser(body);
  return NextResponse.json(user);
}
```

## Security Standards

### Authentication

Always verify authentication:

```typescript
// Good
export async function POST(req: Request) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Process authenticated request
}

// Bad
export async function POST(req: Request) {
  // Process request without authentication check
}
```

### Input Sanitization

Sanitize user inputs:

```typescript
// Good
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>]/g, '');
};

// Usage
const safeInput = sanitizeInput(userInput);
```

### Environment Variables

Never expose sensitive data:

```typescript
// Good
const apiKey = process.env.OPENAI_API_KEY;

// Bad
const apiKey = 'sk-1234567890abcdef'; // Hardcoded secret
```

## Performance Standards

### Memoization

Use React.memo for performance optimization:

```typescript
// Good
export const ExpensiveComponent = React.memo(({ data }: { data: any }) => {
  // Expensive computation
  const result = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);
  
  return <div>{result}</div>;
});
```

### Lazy Loading

Lazy load heavy components:

```typescript
// Good
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/heavy-component'),
  { ssr: false }
);
```

### Bundle Optimization

Minimize bundle size:

```typescript
// Good - Import only what you need
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Bad - Import entire library
import * as ui from '@/components/ui';
```

## Testing Standards

### Unit Tests

Write comprehensive unit tests:

```typescript
// Good
describe('calculateSplit', () => {
  it('should split equally between 3 people', () => {
    const result = calculateSplit(100, 3);
    expect(result).toEqual([33.33, 33.33, 33.34]);
  });
  
  it('should handle zero amount', () => {
    const result = calculateSplit(0, 2);
    expect(result).toEqual([0, 0]);
  });
});
```

### Integration Tests

Test API endpoints:

```typescript
// Good
describe('POST /api/splitmate/split', () => {
  it('should split bill correctly', async () => {
    const response = await POST(createMockRequest({
      amount: 100,
      participants: ['Alice', 'Bob'],
    }));
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.splits).toHaveLength(2);
  });
});
```

## Documentation Standards

### JSDoc Comments

Document public APIs with JSDoc:

```typescript
/**
 * Calculates equal splits for a bill
 * @param amount - Total bill amount
 * @param participants - Number of people to split between
 * @returns Array of split amounts
 * @example
 * ```typescript
 * const splits = calculateSplit(100, 3);
 * // Returns [33.33, 33.33, 33.34]
 * ```
 */
export function calculateSplit(amount: number, participants: number): number[] {
  // implementation
}
```

### Inline Comments

Use inline comments sparingly and only when necessary:

```typescript
// Good - Explaining complex logic
const taxRate = 0.18; // GST rate in India

// Bad - Stating the obvious
const user = getUser(); // Gets the user
```

## File Organization

### Component Files

Organize component files logically:

```typescript
// Good
components/
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
├── splitmate/
│   ├── bill-splitter.tsx
│   ├── qr-generator.tsx
│   └── remind-user.tsx
└── app-sidebar.tsx
```

### Hook Files

Keep hooks in a dedicated directory:

```typescript
// Good
hooks/
├── use-splitmate.ts
├── use-user-profile.ts
└── use-expenses.ts
```

## Naming Conventions

### Variables and Functions

Use camelCase for variables and functions:

```typescript
// Good
const userName = 'John';
function calculateTotal() { /* implementation */ }

// Bad
const UserName = 'John';
function Calculate_Total() { /* implementation */ }
```

### Interfaces and Types

Use PascalCase for interfaces and types:

```typescript
// Good
interface UserProfile {
  id: string;
  name: string;
}

type UserRole = 'admin' | 'user' | 'guest';

// Bad
interface userProfile {
  id: string;
  name: string;
}

type userRole = 'admin' | 'user' | 'guest';
```

### Constants

Use UPPER_SNAKE_CASE for constants:

```typescript
// Good
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_PAGE_SIZE = 20;

// Bad
const maxRetryAttempts = 3;
const default_page_size = 20;
```

## Error Handling

### Try-Catch Blocks

Always handle potential errors:

```typescript
// Good
try {
  const result = await fetchData();
  setData(result);
} catch (error) {
  console.error('Failed to fetch data:', error);
  setError('Failed to load data');
}

// Bad
const result = await fetchData();
setData(result);
```

### Custom Errors

Create custom error classes for specific cases:

```typescript
// Good
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Usage
if (!isValidEmail(email)) {
  throw new ValidationError('Invalid email format');
}
```

## Conclusion

Following these coding standards ensures:

1. **Consistency** - Code looks and feels the same throughout the project
2. **Maintainability** - Easier to understand and modify existing code
3. **Performance** - Optimized for speed and efficiency
4. **Security** - Protected against common vulnerabilities
5. **Scalability** - Easy to extend and grow

Adhering to these standards helps maintain high-quality code that is easy to work with for all contributors.