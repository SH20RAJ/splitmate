"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/theme-toggle'
import {
  MessageSquareIcon,
  BarChart3Icon,
  BellIcon,
  MenuIcon,
  UserIcon
} from 'lucide-react'
import { useState, Suspense } from 'react'
import { useUser } from '@stackframe/stack'

// Separate component for user-related functionality that needs Suspense
function UserSection() {
  const user = useUser()
  
  if (user && user !== null) {
    return (
      <div className="flex items-center space-x-2">
        <span className="hidden sm:inline text-sm font-medium">
          {user.displayName || user.primaryEmail}
        </span>
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
          {user.displayName?.charAt(0) || user.primaryEmail?.charAt(0) || 'U'}
        </div>
      </div>
    )
  } else if (user === null) {
    return (
      <Button variant="default" size="sm" onClick={() => {
        // This would typically open a login modal or redirect to login page
        console.log('Login action needed');
      }}>
        <UserIcon className="h-4 w-4 mr-2" />
        Login
      </Button>
    )
  }
  
  return null
}

export function AppHeader() {
  const pathname = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const navItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: BarChart3Icon
    },
    {
      href: '/chat',
      label: 'AI Chat',
      icon: MessageSquareIcon
    }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-4xl mx-auto flex h-14 items-center px-4">
        {/* Logo and Brand */}
        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80">
            <span className="text-sm font-bold text-primary-foreground">₹</span>
          </div>
          <div className="hidden font-bold sm:inline-block">
            SplitMate
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        {/* Right side actions */}
        <div className="ml-auto flex items-center space-x-2">
          {/* User Section with Suspense Boundary */}
          <Suspense fallback={
            <Button variant="ghost" size="icon" className="relative">
              <UserIcon className="h-4 w-4" />
              <span className="sr-only">Loading...</span>
            </Button>
          }>
            <UserSection />
          </Suspense>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <MenuIcon className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="border-t border-border md:hidden">
          <div className="container py-2">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href} onClick={() => setShowMobileMenu(false)}>
                    <Button
                      variant={pathname === item.href ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
