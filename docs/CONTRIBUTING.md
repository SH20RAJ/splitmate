# Contributing to SplitMate

Thank you for your interest in contributing to SplitMate! We welcome contributions from the community to help improve the project.

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project, you agree to abide by its terms.

## How to Contribute

### Reporting Bugs

Before submitting a bug report:

1. Check the existing issues to see if the bug has already been reported
2. Try to reproduce the bug in the latest version of the code
3. Include as much detail as possible in your report

When reporting a bug, please include:

- A clear and descriptive title
- Steps to reproduce the bug
- Expected behavior vs. actual behavior
- Screenshots if applicable
- Your environment (OS, browser, etc.)

### Suggesting Enhancements

We welcome suggestions for new features or enhancements. Before submitting:

1. Check existing issues to see if the enhancement has already been suggested
2. Provide a clear description of the enhancement
3. Explain why this enhancement would be useful

### Code Contributions

#### Setting Up Your Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/splitmate.git
   cd splitmate
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Coding Standards

##### TypeScript
- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

##### React Components
- Use functional components with hooks
- Follow the existing component structure
- Use TypeScript interfaces for props
- Implement proper error handling

##### Styling
- Use TailwindCSS classes
- Follow the existing styling patterns
- Use shadcn/ui components when appropriate

#### Commit Messages

Follow the conventional commit format:

```
type(scope): description

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Example:
```
feat(auth): add sign-up with email verification

Implement email verification flow for new users
- Send verification email on sign-up
- Add verification page
- Update user status on verification
```

#### Pull Request Process

1. Ensure your code follows the coding standards
2. Write clear, descriptive commit messages
3. Add tests for new functionality
4. Update documentation as needed
5. Submit a pull request with a clear description

### Testing

#### Unit Tests

Write unit tests for new functionality:

```typescript
// Example test
import { splitBillEqually } from '../src/utils/bill-splitter';

describe('splitBillEqually', () => {
  it('should split bill equally between participants', () => {
    const result = splitBillEqually(100, ['Alice', 'Bob', 'Charlie']);
    expect(result).toEqual([
      { person: 'Alice', amount: 33.33 },
      { person: 'Bob', amount: 33.33 },
      { person: 'Charlie', amount: 33.34 },
    ]);
  });
});
```

#### Integration Tests

For API endpoints:

```typescript
// Example integration test
import { POST } from '../src/app/api/splitmate/split/route';

describe('POST /api/splitmate/split', () => {
  it('should split bill correctly', async () => {
    const request = new Request('http://localhost/api/splitmate/split', {
      method: 'POST',
      body: JSON.stringify({
        amount: 100,
        description: 'Dinner',
        participants: ['Alice', 'Bob'],
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.splits).toHaveLength(2);
  });
});
```

#### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- src/utils/bill-splitter.test.ts
```

### Documentation

#### Code Documentation

- Add JSDoc comments for public functions and classes
- Document complex algorithms or business logic
- Keep documentation up to date with code changes

#### User Documentation

- Update README.md when adding new features
- Add documentation files for major features
- Include examples and usage instructions

### Style Guide

#### File Naming

- Use kebab-case for file names
- Use PascalCase for React components
- Use camelCase for utility functions

#### Component Structure

```typescript
// components/ExampleComponent.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface ExampleComponentProps {
  title: string;
  onAction: () => void;
}

export const ExampleComponent: React.FC<ExampleComponentProps> = ({
  title,
  onAction,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <Button onClick={onAction}>Click me</Button>
    </div>
  );
};
```

#### API Routes

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Process request
    const body = await req.json();
    // ... implementation

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Issue Triage

#### Labels

Use the following labels to categorize issues:

- `bug`: Something isn't working
- `feature`: New feature request
- `enhancement`: Improvement to existing functionality
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed

#### Priority

- `priority:high`: Needs immediate attention
- `priority:medium`: Should be addressed soon
- `priority:low`: Nice to have but not urgent

### Community

#### Communication

- Be respectful and constructive in all communications
- Provide feedback promptly on pull requests
- Help newcomers get started with the project

#### Recognition

- Contributors will be added to the contributors list
- Significant contributions will be highlighted in release notes
- Active community members may be invited to become maintainers

## Getting Help

If you need help with contributing:

1. Check the documentation
2. Look at existing issues and pull requests
3. Join our community discussions
4. Contact the maintainers

## License

By contributing to SplitMate, you agree that your contributions will be licensed under the MIT License.