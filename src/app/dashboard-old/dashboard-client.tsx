"use client"

import { Dashboard } from '@/components/dashboard'
import { AppHeader } from '@/components/app-header'

export function DashboardClient() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-6">
        <Dashboard />
      </main>
    </div>
  )
}
