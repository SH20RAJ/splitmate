"use client";
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  HomeIcon, 
  MessageSquareIcon, 
  UsersIcon, 
  BarChart3Icon,
  MenuIcon,
  XIcon
} from 'lucide-react'
import { useState } from 'react'

export function ModernAboutNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3Icon },
    { href: '/groups', label: 'Groups', icon: UsersIcon },
    { href: '/chat', label: 'AI Chat', icon: MessageSquareIcon },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left side - Logo/Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <span className="text-lg font-bold text-primary-foreground">₹</span>
          </div>
          <span className="text-xl font-bold">SplitMate</span>
        </div>

        {/* Center - Navigation (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Right side - CTA and Mobile menu button */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button size="sm" className="hidden sm:flex">
              Get Started
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container py-4 px-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <Link href="/dashboard">
                <Button className="w-full mt-2">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}