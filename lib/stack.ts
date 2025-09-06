"use client";

import { StackClientApp } from "@stackframe/stack";

export const stackApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
});
