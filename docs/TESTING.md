# SplitMate Testing Guide

This document explains how to run and write tests for SplitMate.

## Testing Framework

SplitMate uses Jest as the testing framework with React Testing Library for component testing.

### Test Configuration

The test configuration is defined in `jest.config.ts`:

```typescript
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
  ],
};

export default config;
```

### Setup Files

Global test setup is in `jest.setup.ts`:

```typescript
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills for JSDOM
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
```

## Running Tests

### All Tests

Run all tests:

```bash
npm test
```

### Watch Mode

Run tests in watch mode:

```bash
npm run test:watch
```

### Specific Test Files

Run a specific test file:

```bash
npm test -- src/components/bill-splitter.test.tsx
```

### Test Coverage

Generate test coverage report:

```bash
npm run test:coverage
```

## Writing Tests

### Unit Tests

Unit tests should focus on testing individual functions and pure logic:

```typescript
// src/utils/bill-splitter.test.ts
import { splitBillEqually } from './bill-splitter';

describe('splitBillEqually', () => {
  it('should split bill equally between participants', () => {
    const result = splitBillEqually(100, ['Alice', 'Bob', 'Charlie']);
    expect(result).toEqual([
      { person: 'Alice', amount: 33.33 },
      { person: 'Bob', amount: 33.33 },
      { person: 'Charlie', amount: 33.34 },
    ]);
  });

  it('should handle zero amount', () => {
    const result = splitBillEqually(0, ['Alice', 'Bob']);
    expect(result).toEqual([
      { person: 'Alice', amount: 0 },
      { person: 'Bob', amount: 0 },
    ]);
  });

  it('should handle single participant', () => {
    const result = splitBillEqually(50, ['Alice']);
    expect(result).toEqual([
      { person: 'Alice', amount: 50 },
    ]);
  });
});
```

### Component Tests

Component tests should verify UI behavior and user interactions:

```typescript
// src/components/bill-splitter.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BillSplitter } from './bill-splitter';

describe('BillSplitter', () => {
  it('should render with default participants', () => {
    render(<BillSplitter />);
    
    expect(screen.getByLabelText('Amount (₹)')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox', { name: /participant/i })).toHaveLength(3);
  });

  it('should add new participant when clicking add button', () => {
    render(<BillSplitter />);
    
    const addButton = screen.getByRole('button', { name: /add participant/i });
    fireEvent.click(addButton);
    
    expect(screen.getAllByRole('textbox', { name: /participant/i })).toHaveLength(4);
  });

  it('should remove participant when clicking remove button', () => {
    render(<BillSplitter />);
    
    // Initially 3 participants
    expect(screen.getAllByRole('textbox', { name: /participant/i })).toHaveLength(3);
    
    // Remove one participant (only possible when there are more than 2)
    const removeButtons = screen.getAllByRole('button', { name: '×' });
    fireEvent.click(removeButtons[0]);
    
    // Now 2 participants
    expect(screen.getAllByRole('textbox', { name: /participant/i })).toHaveLength(2);
  });
});
```

### API Tests

API tests should verify endpoint behavior:

```typescript
// src/app/api/splitmate/split/route.test.ts
import { POST } from './route';
import { NextRequest } from 'next/server';

describe('POST /api/splitmate/split', () => {
  it('should split bill correctly', async () => {
    const mockRequest = new NextRequest('http://localhost/api/splitmate/split', {
      method: 'POST',
      body: JSON.stringify({
        amount: 100,
        description: 'Dinner',
        participants: ['Alice', 'Bob'],
      }),
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.totalAmount).toBe(100);
    expect(data.splits).toHaveLength(2);
    expect(data.splits[0]).toEqual({
      person: 'Alice',
      amount: 50,
    });
  });

  it('should return error for invalid input', async () => {
    const mockRequest = new NextRequest('http://localhost/api/splitmate/split', {
      method: 'POST',
      body: JSON.stringify({
        amount: -100, // Invalid amount
        description: 'Dinner',
        participants: ['Alice', 'Bob'],
      }),
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });
});
```

### Integration Tests

Integration tests should verify the interaction between multiple components:

```typescript
// src/integration/bill-splitting.test.ts
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BillSplitter } from '@/components/splitmate/bill-splitter';
import { useSplitMate } from '@/hooks/use-splitmate';

// Mock the hook
jest.mock('@/hooks/use-splitmate');

describe('Bill Splitting Integration', () => {
  beforeEach(() => {
    (useSplitMate as jest.Mock).mockReturnValue({
      splitBill: jest.fn().mockResolvedValue({
        totalAmount: 100,
        splits: [
          { person: 'Alice', amount: 50 },
          { person: 'Bob', amount: 50 },
        ],
        description: 'Dinner',
      }),
      isLoading: false,
      error: null,
    });
  });

  it('should call splitBill when form is submitted', async () => {
    const mockSplitBill = jest.fn().mockResolvedValue({
      totalAmount: 100,
      splits: [
        { person: 'Alice', amount: 50 },
        { person: 'Bob', amount: 50 },
      ],
      description: 'Dinner',
    });

    (useSplitMate as jest.Mock).mockReturnValue({
      splitBill: mockSplitBill,
      isLoading: false,
      error: null,
    });

    render(<BillSplitter />);
    
    // Fill in form
    fireEvent.change(screen.getByLabelText('Amount (₹)'), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Dinner' },
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /split bill equally/i }));
    
    // Verify splitBill was called
    await waitFor(() => {
      expect(mockSplitBill).toHaveBeenCalledWith({
        amount: 100,
        description: 'Dinner',
        participants: ['', '', ''],
      });
    });
  });
});
```

## Mocking

### Mocking External Dependencies

Mock external dependencies to isolate tests:

```typescript
// __mocks__/qrcode.ts
export default {
  toDataURL: jest.fn().mockResolvedValue('data:image/png;base64,...'),
};
```

### Mocking API Calls

Mock API calls to avoid network dependencies:

```typescript
// __mocks__/fetch.ts
const mockFetch = jest.fn();
global.fetch = mockFetch;

export default mockFetch;
```

### Mocking Hooks

Mock custom hooks for component testing:

```typescript
// __mocks__/use-splitmate.ts
import { useState } from 'react';

export const useSplitMate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const splitBill = async (data: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock implementation
      return {
        totalAmount: data.amount,
        splits: data.participants.map((person: string) => ({
          person,
          amount: data.amount / data.participants.length,
        })),
        description: data.description,
      };
    } catch (err) {
      setError('Failed to split bill');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    splitBill,
  };
};
```

## Test Utilities

### Test Data Factories

Create factories for test data:

```typescript
// src/test-utils/factories.ts
import { User, Expense, Group } from '@/types';

export const createUser = (overrides?: Partial<User>): User => ({
  id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});

export const createExpense = (overrides?: Partial<Expense>): Expense => ({
  id: 'expense-1',
  amount: 100,
  description: 'Test Expense',
  category: 'Food',
  date: new Date().toISOString(),
  participants: ['user-1', 'user-2'],
  paidBy: 'user-1',
  ...overrides,
});

export const createGroup = (overrides?: Partial<Group>): Group => ({
  id: 'group-1',
  name: 'Test Group',
  description: 'A test group',
  members: [
    { id: 'user-1', name: 'User 1', email: 'user1@example.com' },
    { id: 'user-2', name: 'User 2', email: 'user2@example.com' },
  ],
  createdAt: new Date().toISOString(),
  ...overrides,
});
```

### Test Helpers

Create helper functions for common test operations:

```typescript
// src/test-utils/helpers.ts
import { render } from '@testing-library/react';
import { UserProvider } from '@/contexts/user-context';

export const renderWithUser = (ui: React.ReactElement, user: any) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <UserProvider user={user}>
        {children}
      </UserProvider>
    ),
  });
};

export const createMockRouter = (router: Partial<NextRouter> = {}) => {
  return {
    basePath: '',
    pathname: '/',
    route: '/',
    query: {},
    asPath: '/',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: 'en',
    domainLocales: [],
    isPreview: false,
    ...router,
  };
};
```

## Continuous Integration

### GitHub Actions

GitHub Actions configuration for automated testing:

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test -- --coverage
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
```

## Test Coverage

### Coverage Thresholds

Set minimum coverage thresholds in `jest.config.ts`:

```typescript
const config: Config.InitialOptions = {
  // ... other config
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Coverage Reports

Generate HTML coverage reports:

```bash
npm run test:coverage
```

Reports will be available in `coverage/lcov-report/index.html`

## Debugging Tests

### Debugging with VS Code

Use VS Code debugger for test debugging:

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileBasenameNoExtension}",
        "--detectOpenHandles"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true
    }
  ]
}
```

### Console Logging

Use console.log for debugging in tests:

```typescript
it('should handle complex scenario', () => {
  console.log('Starting test...');
  
  const result = complexFunction();
  console.log('Result:', result);
  
  expect(result).toBeDefined();
});
```

## Best Practices

### Test Organization

Organize tests logically:

```
src/
├── components/
│   ├── bill-splitter.tsx
│   ├── bill-splitter.test.tsx
│   └── __snapshots__/
│       └── bill-splitter.test.tsx.snap
├── utils/
│   ├── bill-splitter.ts
│   └── bill-splitter.test.ts
├── app/
│   └── api/
│       └── splitmate/
│           ├── split/
│           │   ├── route.ts
│           │   └── route.test.ts
│           └── qr/
│               ├── route.ts
│               └── route.test.ts
└── test-utils/
    ├── factories.ts
    └── helpers.ts
```

### Test Naming

Use descriptive test names:

```typescript
// Good
it('should split bill equally when participants count is 3', () => {
  // test implementation
});

// Bad
it('should work', () => {
  // test implementation
});
```

### Test Isolation

Ensure tests are independent:

```typescript
// Good - Each test sets up its own data
beforeEach(() => {
  mockData = createTestData();
});

it('should handle case 1', () => {
  // test with mockData
});

it('should handle case 2', () => {
  // test with mockData (fresh instance)
});

// Bad - Tests depend on shared state
let sharedData;

beforeAll(() => {
  sharedData = createTestData();
});

it('should modify shared data', () => {
  // modifies sharedData
});

it('should depend on modified shared data', () => {
  // depends on previous test
});
```

## Troubleshooting

### Common Issues

#### 1. Test Environment Issues

```bash
# Clear Jest cache
npm test -- --clearCache

# Run with verbose output
npm test -- --verbose
```

#### 2. Mocking Issues

```typescript
// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});

// Reset modules
beforeEach(() => {
  jest.resetModules();
});
```

#### 3. Async Test Issues

```typescript
// Good - Wait for async operations
it('should handle async operation', async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});

// Bad - Don't await
it('should handle async operation', () => {
  asyncFunction(); // This won't be waited for
  expect(something).toBeDefined(); // May fail due to timing
});
```

## Conclusion

Testing in SplitMate follows these principles:

1. **Comprehensive Coverage** - Test all critical paths and edge cases
2. **Fast Execution** - Optimize tests for quick feedback
3. **Reliable Results** - Ensure tests are deterministic and isolated
4. **Clear Documentation** - Use descriptive test names and comments
5. **Continuous Integration** - Automate testing in CI pipelines

By following these guidelines, SplitMate maintains high code quality and reliability.