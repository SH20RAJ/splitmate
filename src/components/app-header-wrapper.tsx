"use client"

import { Suspense } from 'react'
import { AppHeader } from './app-header'

function AppHeaderFallback() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-4xl2 mx-auto flex h-14 items-center px-4">
        <div className="animate-pulse flex items-center space-x-4 w-full">
          <div className="h-8 w-8 bg-gray-300 rounded-lg"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
          <div className="ml-auto flex items-center space-x-2">
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </header>
  )
}

export function AppHeaderWrapper() {
  return (
    <Suspense fallback={<AppHeaderFallback />}>
      <AppHeader />
    </Suspense>
  )
}
