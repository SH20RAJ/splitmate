'use client'

export const runtime = 'edge';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Assistant component to avoid SSR issues
const Assistant = dynamic(
  () => import("@/app/assistant").then(mod => ({ default: mod.Assistant })),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading AI Assistant...</p>
        </div>
      </div>
    )
  }
);

export default function ChatPage() {
  return (
    <div className="h-full w-full">
      <Suspense fallback={
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading AI Assistant...</p>
          </div>
        </div>
      }>
        <Assistant />
      </Suspense>
    </div>
  )
}
