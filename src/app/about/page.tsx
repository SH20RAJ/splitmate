import type { Metadata } from 'next'
export const runtime = 'edge';
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import WrapButton from '@/components/ui/wrap-button'
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
import { Navbar1 } from '@/components/ui/navbar1'
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
      <Navbar1 
        logo={{
          url: "/dashboard",
          src: "/logo.png",
          alt: "SplitMate Logo",
          title: "SplitMate"
        }}
      />

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

      {/* Logo Section */}
      <div className="container mx-auto py-8 text-center">
        <div className="flex justify-center items-center mb-4">
          <Image 
            src="/logo.png" 
            alt="SplitMate Logo" 
            width={80} 
            height={80}
            className="object-contain"
          />
        </div>
        <h3 className="text-2xl font-bold mb-2">SplitMate</h3>
        <p className="text-muted-foreground mb-6">Your Smart Expense Splitting Companion</p>
        
        {/* WrapButton CTA */}
        <div className="flex justify-center">
          <WrapButton href="/dashboard" className="mt-4">
            Get Started Now
          </WrapButton>
        </div>
      </div>


      <div className='container mx-auto text-center pb-24 flex justify-center items-center flex-col'>
        <Bento />
      </div>

      {/* Telegram Bot Section */}
      <div className="container mx-auto py-16">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            New Feature
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            Manage Expenses on <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Telegram</span>
          </h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            Now you can split bills, track expenses, and manage group finances directly through our Telegram bot. 
            No need to open the app - just chat with SplitMate Bot!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-left">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-3">
                  <MessageSquareIcon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Chat Interface</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Split bills using simple chat commands. Just tell the bot &ldquo;Split ₹1200 with 3 friends&rdquo; and it handles the rest.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-left">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-3">
                  <UsersIcon className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Group Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Add the bot to your Telegram groups and manage expenses together. Everyone gets notified automatically.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-left">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-3">
                  <SmartphoneIcon className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Instant Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get real-time updates about payments, new expenses, and settlement reminders right in Telegram.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://t.me/splitmate2_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-base font-medium transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 8.16c-.416 1.896-2.208 8.944-3.12 11.872-.384 1.248-1.44 1.464-2.32.912L8.928 18.48l-1.248-2.16 4.896-3.072c.672-.432.432-1.104-.336-.672l-6.048 3.744-2.16-.816c-.48-.144-.48-.48.096-.72l10.08-3.936c.432-.144.816.096.672.552z"/>
              </svg>
              Start SplitMate Bot
            </a>
            <p className="text-sm text-muted-foreground">
              Free to use • Works in group chats • Instant setup
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-border mx-auto text-center bg-muted/30">
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
