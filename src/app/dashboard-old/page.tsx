import type { Metadata } from 'next'
export const runtime = 'edge';
import { Dashboard } from '@/components/dashboard'
import { BottomNav } from '@/components/bottom-nav'
import { AppContainer } from '@/components/app-container'
import { FloatingChatButton } from '@/components/floating-chat'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your expense overview and manage group finances with SplitMate.',
}

export default function DashboardPage() {
  return (
    <>
      <AppContainer>
        <div className="py-6">
          <Dashboard />
        </div>
      </AppContainer>
      <BottomNav />
      <FloatingChatButton />
    </>
  )
}