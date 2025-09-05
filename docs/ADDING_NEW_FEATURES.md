# Adding New Features to SplitMate

This document explains how to add new features to SplitMate, covering everything from planning to implementation and testing.

## Feature Planning

### 1. Feature Identification

Start by identifying the need for a new feature:

- Gather user feedback
- Analyze usage patterns
- Identify pain points
- Research market trends

### 2. Feature Specification

Create a detailed specification for the new feature:

```markdown
# Feature: [Feature Name]

## Overview
Brief description of what the feature does and why it's needed.

## User Stories
1. As a [user], I want to [action] so that [benefit].
2. As a [user], I want to [action] so that [benefit].

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Technical Requirements
- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## Design Mockups
Include wireframes or design mockups if applicable.

## Implementation Plan
Outline the steps needed to implement the feature.
```

### 3. Impact Assessment

Assess the impact of the new feature:

- **Technical Impact**: Will it require changes to existing code?
- **User Impact**: How will it affect the user experience?
- **Performance Impact**: Will it affect application performance?
- **Security Impact**: Are there any security considerations?

## Architecture Planning

### 1. System Design

Plan the system architecture for the new feature:

- Determine which layers will be affected (UI, API, Database)
- Plan data flow and interactions
- Identify required dependencies
- Consider scalability requirements

### 2. API Design

Design the API endpoints for the new feature:

```typescript
// Example API design
interface NewFeatureRequest {
  // Request payload structure
  param1: string;
  param2: number;
  param3: boolean;
}

interface NewFeatureResponse {
  // Response structure
  result: string;
  status: 'success' | 'error';
  data?: any;
  error?: string;
}

// API endpoint
POST /api/new-feature
```

### 3. Database Schema

Plan any database changes needed:

```sql
-- Example schema changes
CREATE TABLE IF NOT EXISTS new_feature_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  param1 VARCHAR(255),
  param2 INTEGER,
  param3 BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_new_feature_user ON new_feature_table(user_id);
```

## Implementation

### 1. Branch Creation

Create a new branch for the feature:

```bash
git checkout -b feature/new-feature-name
```

### 2. Backend Implementation

Implement the backend logic:

```typescript
// app/api/new-feature/route.ts
import { stackServerApp } from '@/stack';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { param1, param2, param3 } = body;

    // Validate input
    if (!param1 || typeof param2 !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Implement feature logic
    const result = await implementNewFeatureLogic(param1, param2, param3);

    // Return success response
    return NextResponse.json({
      result,
      status: 'success',
    });
  } catch (error) {
    console.error('Error in new feature:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function implementNewFeatureLogic(param1: string, param2: number, param3: boolean) {
  // Implementation goes here
  return `Processed: ${param1}, ${param2}, ${param3}`;
}
```

### 3. Frontend Implementation

Create the frontend components:

```typescript
// components/new-feature/new-feature-component.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NewFeatureComponentProps {
  initialParam1?: string;
  initialParam2?: number;
  initialParam3?: boolean;
  onSubmit?: (result: any) => void;
}

export function NewFeatureComponent({
  initialParam1 = '',
  initialParam2 = 0,
  initialParam3 = false,
  onSubmit,
}: NewFeatureComponentProps) {
  const [param1, setParam1] = useState(initialParam1);
  const [param2, setParam2] = useState(initialParam2.toString());
  const [param3, setParam3] = useState(initialParam3);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/new-feature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          param1,
          param2: parseFloat(param2),
          param3,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process request');
      }

      setResult(data);
      if (onSubmit) {
        onSubmit(data);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Feature</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="param1">Parameter 1</Label>
            <Input
              id="param1"
              value={param1}
              onChange={(e) => setParam1(e.target.value)}
              placeholder="Enter parameter 1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="param2">Parameter 2</Label>
            <Input
              id="param2"
              type="number"
              value={param2}
              onChange={(e) => setParam2(e.target.value)}
              placeholder="Enter parameter 2"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="param3"
              type="checkbox"
              checked={param3}
              onChange={(e) => setParam3(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor="param3">Parameter 3</Label>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Submit'}
          </Button>
        </form>

        {result && (
          <div className="mt-4 p-4 bg-green-50 rounded-md">
            <h3 className="font-medium text-green-800">Success!</h3>
            <p className="text-green-700">{JSON.stringify(result, null, 2)}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

### 4. Hook Implementation

Create custom hooks for the new feature:

```typescript
// hooks/use-new-feature.ts
import { useState, useCallback } from 'react';

interface NewFeatureHook {
  isLoading: boolean;
  error: string | null;
  result: any | null;
  processFeature: (params: { param1: string; param2: number; param3: boolean }) => Promise<any>;
}

export function useNewFeature(): NewFeatureHook {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  const processFeature = useCallback(async (params: { 
    param1: string; 
    param2: number; 
    param3: boolean 
  }) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/new-feature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process request');
      }

      setResult(data);
      return data;
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
    result,
    processFeature,
  };
}
```

### 5. Page Implementation

Create a page for the new feature:

```typescript
// app/new-feature/page.tsx
import { NewFeatureComponent } from '@/components/new-feature/new-feature-component';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function NewFeaturePage() {
  // Get the current user
  const user = await stackServerApp.getUser();
  
  // Redirect to sign in if user is not authenticated
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">New Feature</h1>
          <p className="text-gray-600 mt-2">
            Description of the new feature
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <NewFeatureComponent />
        </div>
      </div>
    </div>
  );
}
```

### 6. Navigation Integration

Add navigation to the new feature:

```typescript
// components/app-sidebar.tsx
import { 
  // existing imports
  // Add new icon
  NewFeatureIcon,
} from "lucide-react";

// In the sidebar menu
<SidebarMenuItem>
  <SidebarMenuButton asChild>
    <Link href="/new-feature">
      <NewFeatureIcon className="size-4" />
      <span>New Feature</span>
    </Link>
  </SidebarMenuButton>
</SidebarMenuItem>
```

## Testing

### 1. Unit Tests

Write unit tests for the new feature:

```typescript
// components/new-feature/new-feature-component.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewFeatureComponent } from './new-feature-component';

describe('NewFeatureComponent', () => {
  it('should render correctly', () => {
    render(<NewFeatureComponent />);
    
    expect(screen.getByLabelText('Parameter 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Parameter 2')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should update input values', () => {
    render(<NewFeatureComponent />);
    
    const param1Input = screen.getByLabelText('Parameter 1') as HTMLInputElement;
    const param2Input = screen.getByLabelText('Parameter 2') as HTMLInputElement;
    
    fireEvent.change(param1Input, { target: { value: 'Test Value' } });
    fireEvent.change(param2Input, { target: { value: '42' } });
    
    expect(param1Input.value).toBe('Test Value');
    expect(param2Input.value).toBe('42');
  });

  it('should handle checkbox toggle', () => {
    render(<NewFeatureComponent />);
    
    const checkbox = screen.getByLabelText('Parameter 3') as HTMLInputElement;
    
    expect(checkbox.checked).toBe(false);
    
    fireEvent.click(checkbox);
    
    expect(checkbox.checked).toBe(true);
  });
});
```

### 2. API Tests

Write API tests for the new feature:

```typescript
// app/api/new-feature/route.test.ts
import { POST } from './route';
import { NextRequest } from 'next/server';

describe('POST /api/new-feature', () => {
  it('should process feature correctly', async () => {
    const mockRequest = new NextRequest('http://localhost/api/new-feature', {
      method: 'POST',
      body: JSON.stringify({
        param1: 'Test Value',
        param2: 42,
        param3: true,
      }),
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('success');
    expect(data.result).toContain('Processed: Test Value, 42, true');
  });

  it('should return error for invalid input', async () => {
    const mockRequest = new NextRequest('http://localhost/api/new-feature', {
      method: 'POST',
      body: JSON.stringify({
        param1: '', // Invalid - required
        param2: 'invalid', // Invalid - should be number
        param3: true,
      }),
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });
});
```

### 3. Integration Tests

Write integration tests:

```typescript
// integration/new-feature.test.ts
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewFeaturePage } from '@/app/new-feature/page';

// Mock dependencies
jest.mock('@/stack', () => ({
  stackServerApp: {
    getUser: jest.fn().mockResolvedValue({
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com',
    }),
  },
}));

describe('NewFeaturePage', () => {
  it('should render for authenticated user', async () => {
    render(await NewFeaturePage());
    
    expect(screen.getByText('New Feature')).toBeInTheDocument();
    expect(screen.getByLabelText('Parameter 1')).toBeInTheDocument();
  });
});
```

## Documentation

### 1. Feature Documentation

Create documentation for the new feature:

```markdown
# New Feature

## Overview

Description of the new feature and its purpose.

## How to Use

Step-by-step instructions on how to use the feature.

### Step 1: Accessing the Feature

Explain how to access the feature.

### Step 2: Using the Feature

Explain how to use the feature.

### Step 3: Viewing Results

Explain how to view the results.

## API Endpoints

Document the API endpoints for the feature:

### POST /api/new-feature

Process the new feature.

#### Request Body

```json
{
  "param1": "string",
  "param2": "number",
  "param3": "boolean"
}
```

#### Response

```json
{
  "status": "success",
  "result": "string"
}
```

## Error Handling

Document possible errors and how to handle them:

- 400: Invalid input
- 401: Unauthorized
- 500: Internal server error
```

### 2. Code Comments

Add comments to explain complex logic:

```typescript
// In the implementation
/**
 * Processes the new feature with the given parameters
 * @param param1 - Description of param1
 * @param param2 - Description of param2
 * @param param3 - Description of param3
 * @returns Processed result
 */
function processNewFeature(
  param1: string, 
  param2: number, 
  param3: boolean
): Promise<string> {
  // Implementation with comments explaining complex logic
  return Promise.resolve(`Processed: ${param1}, ${param2}, ${param3}`);
}
```

## Review Process

### 1. Code Review

Request a code review:

```bash
# Push changes
git push origin feature/new-feature-name

# Create pull request
# Request review from team members
```

### 2. Testing Checklist

Ensure all tests pass:

- [ ] Unit tests
- [ ] Integration tests
- [ ] API tests
- [ ] End-to-end tests (if applicable)

### 3. Documentation Checklist

Ensure documentation is complete:

- [ ] Feature documentation
- [ ] API documentation
- [ ] Code comments
- [ ] README updates (if applicable)

## Deployment

### 1. Merge to Main

After review approval:

```bash
# Merge feature branch to main
git checkout main
git merge feature/new-feature-name
git push origin main
```

### 2. Production Deployment

Monitor deployment:

- [ ] CI/CD pipeline success
- [ ] Smoke tests pass
- [ ] Monitor application logs
- [ ] Verify feature in production

## Monitoring and Maintenance

### 1. Performance Monitoring

Monitor feature performance:

- Response times
- Error rates
- Resource usage

### 2. User Feedback

Collect user feedback:

- User surveys
- Analytics data
- Support tickets

### 3. Feature Iteration

Plan future improvements:

- Based on user feedback
- Performance optimizations
- New use cases

## Best Practices

### 1. Code Quality

Follow established coding standards:

- Use TypeScript for type safety
- Write clear, descriptive variable names
- Keep functions small and focused
- Use meaningful comments

### 2. Security

Implement security best practices:

- Validate all inputs
- Sanitize user data
- Use authentication for protected endpoints
- Follow the principle of least privilege

### 3. Performance

Optimize for performance:

- Minimize API calls
- Use caching where appropriate
- Optimize database queries
- Implement lazy loading for heavy components

### 4. Accessibility

Ensure accessibility compliance:

- Use semantic HTML
- Implement keyboard navigation
- Provide alternative text for images
- Test with screen readers

## Troubleshooting

### Common Issues

#### 1. API Errors

```typescript
// Check for common API issues
// 1. Authentication failures
// 2. Invalid input parameters
// 3. Database connection issues
```

#### 2. UI Issues

```typescript
// Check for common UI issues
// 1. State management problems
// 2. Event handling issues
// 3. Styling inconsistencies
```

### Debugging Tips

1. Use browser developer tools
2. Check console logs for errors
3. Use network tab to inspect API calls
4. Test with different user roles
5. Verify data flow through the application

## Conclusion

Adding new features to SplitMate involves:

1. **Planning**: Thoroughly plan the feature with specifications
2. **Implementation**: Follow the established patterns and practices
3. **Testing**: Write comprehensive tests to ensure quality
4. **Documentation**: Create clear documentation for users and developers
5. **Review**: Get peer review before merging
6. **Deployment**: Monitor deployment and collect feedback
7. **Maintenance**: Continuously improve based on feedback

By following this process, new features can be added to SplitMate efficiently and maintainably.