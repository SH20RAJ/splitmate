import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from "./stack";

export async function middleware(request: NextRequest) {
  // List of paths that require authentication
  const protectedPaths = [
    '/profile',
    '/chat',
    '/api/expenses',
    '/api/groups',
    '/api/user',
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

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/profile/:path*',
    '/chat/:path*',
    '/api/expenses/:path*',
    '/api/groups/:path*',
    '/api/user/:path*',
  ],
};