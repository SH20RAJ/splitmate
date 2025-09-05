# SplitMate Development Setup

This document explains how to set up your development environment for SplitMate.

## Prerequisites

Before setting up SplitMate, ensure you have the following installed:

1. **Node.js** (version 18 or higher)
2. **npm** or **yarn** package manager
3. **Git** for version control
4. **Code Editor** (VS Code recommended)

## System Requirements

### Operating Systems
- Windows 10 or higher
- macOS 10.15 or higher
- Linux (Ubuntu 20.04+, Fedora 32+, etc.)

### Hardware Requirements
- Minimum 4GB RAM (8GB recommended)
- 10GB free disk space
- Modern processor (Intel i5/AMD Ryzen 5 or equivalent)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/splitmate.git
cd splitmate
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### 3. Environment Configuration

Create a local environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
# OpenAI API
OPENAI_API_KEY=sk-...

# StackAuth Configuration
STACK_PROJECT_ID=...
STACK_PUBLISHABLE_CLIENT_KEY=pck_...
STACK_SECRET_SERVER_KEY=ssk_...

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Database URL (for local development)
DATABASE_URL=postgresql://...
```

### 4. Database Setup

SplitMate uses Supabase for data storage. You can either:

#### Option A: Use Supabase Cloud
1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and API keys
4. Add them to `.env.local`

#### Option B: Use Local Supabase
1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Start local Supabase:
   ```bash
   supabase start
   ```

3. Apply database migrations:
   ```bash
   supabase db reset
   ```

### 5. AI Service Setup

SplitMate uses OpenAI for AI capabilities:

1. Create an account at [platform.openai.com](https://platform.openai.com)
2. Create an API key
3. Add it to `.env.local`

### 6. Authentication Setup

SplitMate uses StackAuth for authentication:

1. Create a free account at [stackauth.com](https://stackauth.com)
2. Create a new project
3. Get your project ID and API keys
4. Add them to `.env.local`

## Development Server

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## IDE Setup

### VS Code Extensions

Install these recommended extensions for VS Code:

1. **ESLint** - JavaScript/TypeScript linting
2. **Prettier** - Code formatting
3. **Tailwind CSS IntelliSense** - TailwindCSS support
4. **TypeScript Importer** - Automatic imports
5. **GitLens** - Enhanced Git capabilities
6. **Auto Rename Tag** - Rename paired HTML tags
7. **Bracket Pair Colorizer** - Visualize bracket pairs
8. **Path Intellisense** - Autocomplete filenames
9. **DotENV** - .env file syntax highlighting

### VS Code Settings

Recommended VS Code settings (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  }
}
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- src/utils/bill-splitter.test.ts
```

### Writing Tests

Tests should be colocated with the code they test:

```
components/
├── bill-splitter.tsx
├── bill-splitter.test.tsx
└── __snapshots__/
    └── bill-splitter.test.tsx.snap
```

## Debugging

### Browser Debugging

Use browser developer tools:

1. **Chrome DevTools** - F12 or Ctrl+Shift+I
2. **Firefox Developer Tools** - F12 or Ctrl+Shift+I
3. **Safari Web Inspector** - Cmd+Option+I

### Server-Side Debugging

Use Node.js inspector:

```bash
# Start with inspector
npm run dev:inspect

# Connect with Chrome DevTools
# chrome://inspect
```

### Logging

Use console.log for debugging:

```typescript
// Good
console.log('User data:', user);

// Better with context
console.log('Fetching user data for ID:', userId);

// Best with timestamp
console.log(`[${new Date().toISOString()}] Fetching user data for ID: ${userId}`);
```

## Code Quality

### Linting

SplitMate uses ESLint for code linting:

```bash
# Check for linting errors
npm run lint

# Fix linting errors
npm run lint:fix
```

### Formatting

SplitMate uses Prettier for code formatting:

```bash
# Format all files
npm run format

# Check formatting without changes
npm run format:check
```

### Type Checking

SplitMate uses TypeScript for type safety:

```bash
# Check for type errors
npm run type-check
```

## Database Management

### Local Development

For local database development with Supabase:

```bash
# Start Supabase locally
supabase start

# Stop Supabase
supabase stop

# Reset database
supabase db reset

# Apply migrations
supabase db push
```

### Database Migrations

Create new migrations:

```bash
supabase migration new create_users_table
```

Apply migrations:

```bash
supabase db push
```

## Environment Variables

### Development vs Production

Use different environment variables for different environments:

```env
# Development
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Production
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Secret Management

Never commit secrets to version control:

```bash
# Good - in .env.local (gitignored)
OPENAI_API_KEY=sk-...

# Bad - in .env (committed to repo)
OPENAI_API_KEY=sk-...
```

## Performance Optimization

### Bundle Analysis

Analyze bundle size:

```bash
npm run build
npm run analyze
```

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/images/logo.png"
  alt="Logo"
  width={100}
  height={100}
  priority
/>
```

### Code Splitting

Use dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/heavy-component'),
  { ssr: false }
);
```

## Troubleshooting

### Common Issues

#### 1. Dependency Installation Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### 2. Environment Variable Issues

```bash
# Check if variables are loaded
console.log(process.env.OPENAI_API_KEY);
```

#### 3. Database Connection Errors

```bash
# Check Supabase status
supabase status

# Restart Supabase
supabase stop
supabase start
```

### Getting Help

1. Check the documentation
2. Review existing issues on GitHub
3. Join the community discussions
4. Contact the maintainers

## Conclusion

Setting up the SplitMate development environment involves:

1. Installing prerequisites
2. Cloning the repository
3. Installing dependencies
4. Configuring environment variables
5. Setting up databases
6. Configuring IDE
7. Running tests

With this setup, you'll be ready to contribute to SplitMate development.