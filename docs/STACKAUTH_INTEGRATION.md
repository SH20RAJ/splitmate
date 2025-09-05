# StackAuth Integration in SplitMate

This document explains how SplitMate integrates StackAuth for user authentication and management.

## Overview

StackAuth is an open-source authentication platform that provides a complete authentication solution with comprehensive guides, API references, and platform-specific examples. SplitMate uses StackAuth to handle user sign-up, sign-in, profile management, and session handling.

## Integration Architecture

### 1. Stack Configuration

SplitMate creates a StackAuth server app instance in `stack.tsx`:

```typescript
// stack.tsx
import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
});
```

### 2. Client Configuration

The client-side configuration is handled in the layout:

```typescript
// app/layout.tsx
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            {children}
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
```

## Authentication Flow

### 1. Sign In

Users can sign in using the built-in StackAuth components:

```typescript
// app/sign-in/page.tsx
import { SignIn } from "@stackframe/stack";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8">
        <SignIn fullPage={false} />
      </div>
    </div>
  );
}
```

### 2. Sign Up

Similarly, users can sign up using StackAuth components:

```typescript
// app/sign-up/page.tsx
import { SignUp } from "@stackframe/stack";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8">
        <SignUp fullPage={false} />
      </div>
    </div>
  );
}
```

### 3. User Profile

Users can manage their profile information:

```typescript
// app/profile/page.tsx
import { useUser, AccountSettings } from "@stackframe/stack";

export default function ProfilePage() {
  const user = useUser({ or: "redirect" });
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto">
        <AccountSettings fullPage={false} />
      </div>
    </div>
  );
}
```

## Protected Routes

SplitMate protects sensitive routes using StackAuth's authentication middleware:

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from "./stack";

export async function middleware(request: NextRequest) {
  // List of paths that require authentication
  const protectedPaths = [
    '/profile',
    '/chat',
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
    
    // If no user is found, redirect to sign in
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

## User Context in Components

Components can access user information using StackAuth hooks:

```typescript
// components/app-sidebar.tsx
import { useUser } from "@stackframe/stack";

export function AppSidebar() {
  const user = useUser();
  
  return (
    <Sidebar>
      {/* Sidebar content */}
      {user ? (
        // Show user-specific content
        <div>
          <p>Welcome, {user.displayName}</p>
        </div>
      ) : (
        // Show sign-in option
        <button onClick={() => app.redirectToSignIn()}>
          Sign In
        </button>
      )}
    </Sidebar>
  );
}
```

## Session Management

StackAuth handles session management automatically:

```typescript
// Sign out functionality
import { useUser } from "@stackframe/stack";

export function SignOutButton() {
  const user = useUser();
  
  if (!user) return null;
  
  return (
    <button onClick={() => user.signOut()}>
      Sign Out
    </button>
  );
}
```

## Security Features

### 1. Token Storage

StackAuth securely stores authentication tokens:

```typescript
// Configured to use Next.js cookies for token storage
export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
});
```

### 2. CSRF Protection

StackAuth includes built-in CSRF protection for forms and API requests.

### 3. Rate Limiting

Authentication attempts are rate-limited to prevent abuse.

## Customization

### 1. Branding

SplitMate customizes the authentication UI to match its branding:

```typescript
// Custom styling for authentication components
const customAuthStyles = {
  brandName: "SplitMate",
  brandLogo: "/logo.png",
  colors: {
    primary: "#0EA5A4", // Teal color matching SplitMate theme
  },
};
```

### 2. Email Templates

StackAuth allows customization of email templates for password reset, email verification, etc.

## API Integration

### 1. User Data Sync

SplitMate syncs user data between StackAuth and its internal systems:

```typescript
// app/api/user/sync/route.ts
import { stackServerApp } from '@/stack';

export async function POST(req: NextRequest) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Sync user data with internal database
  // ...
}
```

### 2. Server-Side User Access

Server-side code can access user information:

```typescript
// Server-side route
import { stackServerApp } from '@/stack';

export async function GET(req: NextRequest) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Process request with authenticated user
  // ...
}
```

## Best Practices

### 1. Error Handling

Proper error handling for authentication failures:

```typescript
try {
  const user = await stackServerApp.getUser();
  if (!user) {
    // Handle unauthenticated user
  }
} catch (error) {
  // Handle authentication error
  console.error('Authentication error:', error);
}
```

### 2. Redirects

Graceful handling of authentication redirects:

```typescript
const user = useUser({ or: "redirect" });
```

### 3. Loading States

Show loading states during authentication checks:

```typescript
const user = useUser();

if (user === null) {
  return <div>Loading...</div>;
}

// Render authenticated content
```

## Conclusion

The integration of StackAuth in SplitMate provides a robust, secure, and user-friendly authentication system. With its comprehensive feature set and easy customization options, StackAuth enables SplitMate to focus on its core expense management functionality while ensuring user data remains secure.