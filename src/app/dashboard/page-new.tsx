import type { Metadata } from 'next'
import { Dashboard } from '@/components/dashboard'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your expense overview and manage group finances with SplitMate.',
}

export default function DashboardPage() {
  return (
    <div className="container py-6">
      <Dashboard />
    </div>
  )
}
