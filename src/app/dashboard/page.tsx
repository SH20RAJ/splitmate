import type { Metadata } from 'next'
import { Dashboard } from '@/components/dashboard'
import { BottomNav } from '@/components/bottom-nav'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your expense overview and manage group finances with SplitMate.',
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen   mx-auto p-4 space-y-6">
      <div className="container py-6">
        <Dashboard />
      </div>
      <BottomNav />
    </div>
  )
}
