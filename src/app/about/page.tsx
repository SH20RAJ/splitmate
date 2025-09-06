import type { Metadata } from 'next'
export const runtime = 'edge';
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BarChart3Icon,
  MessageSquareIcon,
  UsersIcon,
  SmartphoneIcon,
  ShieldIcon,
  TrendingUpIcon,
  ArrowRightIcon
} from 'lucide-react'
import { Bento } from '@/components/bento'
import { HeroSection } from '@/components/blocks/hero-section-dark'
import { ModernAboutNavbar } from '@/components/modern-about-navbar'
import { FloatingChatButton } from '@/components/floating-chat'

export const metadata: Metadata = {
  title: 'About SplitMate',
  description: 'Learn more about SplitMate - the AI-powered expense splitting app that makes managing group finances effortless.',
}

export default function AboutPage() {
  const features = [
    {
      icon: BarChart3Icon,
      title: 'Smart Expense Tracking',
      description: 'Track and categorize expenses automatically with intelligent insights.',
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    },
    {
      icon: MessageSquareIcon,
      title: 'AI Assistant',
      description: 'Get instant help with expense splitting and financial calculations.',
      color: 'bg-green-500/10 text-green-600 dark:text-green-400'
    },
    {
      icon: UsersIcon,
      title: 'Group Management',
      description: 'Easily manage expenses across different friend groups and trips.',
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
    },
    {
      icon: SmartphoneIcon,
      title: 'Mobile First',
      description: 'Beautiful, responsive design that works perfectly on all devices.',
      color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
    },
    {
      icon: ShieldIcon,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and stored securely.',
      color: 'bg-red-500/10 text-red-600 dark:text-red-400'
    },
    {
      icon: TrendingUpIcon,
      title: 'Real-time Sync',
      description: 'Keep everyone in sync with instant updates and notifications.',
      color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ModernAboutNavbar />

      <HeroSection
        title="Split Expenses Smartly"
        subtitle={{
          regular: "The AI-Powered ",
          gradient: "Expense Splitting Platform"
        }}
        description="SplitMate uses advanced AI to automatically categorize, split, and track shared expenses with friends, roommates, and groups. Say goodbye to manual calculations and awkward money conversations."
        ctaText="Get Started"
        ctaHref="/dashboard"
      />


      <div className='container mx-auto text-center pb-24 flex justify-center items-center flex-col'>
        <Bento />
      </div>

      {/* CTA Section */}
      <div className="border-t border-border bg-muted/30">
        <div className="container py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Ready to simplify your shared expenses?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of users who trust SplitMate to manage their group expenses.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Start Splitting Bills
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <FloatingChatButton />
    </div>
  )
}
