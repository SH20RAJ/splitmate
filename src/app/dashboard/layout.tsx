import { Inter } from 'next/font/google'
import { SplitMateSidebar } from '@/components/splitmate-sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen bg-background ${inter.className}`}>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 border-r">
          <SplitMateSidebar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
