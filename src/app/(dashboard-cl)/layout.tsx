import type { Metadata } from 'next'
import { ErrorBoundary } from "@/components/error-boundary";
import { SplitMateSidebar } from "@/components/splitmate-sidebar"
import { SiteHeader } from "@/components/site-header"
import { BottomNav } from "@/components/bottom-nav"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export const runtime = 'edge'; // Add runtime export
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
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <SplitMateSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
      
      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </SidebarProvider>
  )
}