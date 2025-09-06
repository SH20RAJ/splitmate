"use client";

import { StackProvider, StackClientApp } from "@stackframe/stack";

export default function StackProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const stackApp = new StackClientApp({
    projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
    tokenStore: "nextjs-cookie",
  });

  return (
    <StackProvider app={stackApp}>
      {children}
    </StackProvider>
  );
}
