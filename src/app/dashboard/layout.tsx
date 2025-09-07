import { Inter } from 'next/font/google'
import { SplitMateSidebar } from '@/components/splitmate-sidebar'
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 16)",
        } as React.CSSProperties
      }
    >
      <div className={`min-h-screen bg-background ${inter.className}`}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <SplitMateSidebar variant="sidebar" />
          </div>
          
          {/* Main Content */}
          <SidebarInset>
            <div className="flex-1 flex flex-col overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}
