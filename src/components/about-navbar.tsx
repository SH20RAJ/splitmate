import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, HomeIcon, MessageSquareIcon } from 'lucide-react'

export function AboutNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Left side - Back to Home */}
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Center - Logo/Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <span className="text-sm font-bold text-primary-foreground">₹</span>
          </div>
          <span className="text-xl font-bold">SplitMate</span>
        </div>

        {/* Right side - Navigation */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <HomeIcon className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="outline" size="sm" className="gap-2">
              <MessageSquareIcon className="h-4 w-4" />
              AI Chat
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
