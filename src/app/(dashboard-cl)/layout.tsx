import type { Metadata } from 'next'
import { ErrorBoundary } from "@/components/error-boundary";

export const metadata: Metadata = {
  title: {
    default: 'Dashboard - SplitMate',
    template: '%s | SplitMate Dashboard'
  },
  description: 'Comprehensive expense management dashboard with AI-powered insights.',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </div>
  )
}
