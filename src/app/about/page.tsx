import type { Metadata } from 'next'
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
      {/* Hero Section */}
      <div className="container py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <span className="text-2xl font-bold text-primary-foreground">₹</span>
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              SplitMate
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            The smart way to split expenses with friends. Track, calculate, and settle bills
            effortlessly with our AI-powered expense management platform.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="outline" size="lg" className="gap-2">
                <MessageSquareIcon className="h-4 w-4" />
                Try AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to manage shared expenses
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              From simple bill splitting to complex group expense management,
              SplitMate has you covered.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-muted/20 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      <div className='container pb-24'>
        {/* Bento Section */}
        <Bento />
      </div>

      {/* CTA Section */}
      <div className="border-t border-border bg-muted/30">
        <div className="container py-16">
          <div className="mx-auto max-w-2xl text-center">
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
    </div>
  )
}
