import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Send,
  Bot,
  MessageSquare,
  Zap,
  Check,
  Copy,
  ExternalLink,
  Shield,
  Clock,
  Users,
  Receipt,
  DollarSign,
  Settings
} from "lucide-react"

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Telegram Bot - SplitMate',
  description: 'Manage expenses through Telegram bot integration.',
}

const botCommands = [
  {
    command: '/start',
    description: 'Start the bot and link your SplitMate account',
    example: '/start'
  },
  {
    command: '/add',
    description: 'Add a new expense',
    example: '/add 250 lunch Pizza with friends'
  },
  {
    command: '/split',
    description: 'Split an expense with group members',
    example: '/split 1200 dinner 4 Restaurant bill'
  },
  {
    command: '/balance',
    description: 'Check your balance and pending settlements',
    example: '/balance'
  },
  {
    command: '/groups',
    description: 'List your groups and recent activity',
    example: '/groups'
  },
  {
    command: '/settle',
    description: 'Record a settlement between members',
    example: '/settle 500 @john Paid back for dinner'
  }
]

const features = [
  {
    icon: Zap,
    title: 'Quick Expense Entry',
    description: 'Add expenses instantly without opening the app'
  },
  {
    icon: Users,
    title: 'Group Management',
    description: 'Manage group expenses and settlements'
  },
  {
    icon: Receipt,
    title: 'Receipt Processing',
    description: 'Send photos of receipts for automatic processing'
  },
  {
    icon: MessageSquare,
    title: 'Smart Notifications',
    description: 'Get notified about new expenses and settlements'
  },
  {
    icon: Shield,
    title: 'Secure Integration',
    description: 'Bank-grade security with encrypted communication'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Access your expenses anytime, anywhere'
  }
]

export default function TelegramSetupPage() {
  const botUsername = '@SplitMateBot'
  const setupSteps = [
    'Open Telegram and search for @SplitMateBot',
    'Click "Start" to begin the setup process',
    'Follow the prompts to link your SplitMate account',
    'Grant necessary permissions for expense management',
    'Start managing your expenses through Telegram!'
  ]

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 py-6">
        
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Telegram Bot</h1>
            <p className="text-muted-foreground">
              Manage your expenses directly through Telegram for quick and easy access
            </p>
          </div>
        </div>

        {/* Bot Status Card */}
        <div className="px-4 lg:px-6">
          <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-blue-900 dark:text-blue-100">
                    SplitMate Telegram Bot
                  </CardTitle>
                  <CardDescription className="text-blue-700 dark:text-blue-300">
                    Quick access to expense management through Telegram
                  </CardDescription>
                </div>
                <div className="ml-auto">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                    <Bot className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label>Bot Username:</Label>
                  <div className="flex items-center gap-2">
                    <code className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded text-sm">
                      {botUsername}
                    </code>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full sm:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Open in Telegram
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Setup Guide */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Setup Guide</CardTitle>
              <CardDescription>
                Get started with the SplitMate Telegram bot in just a few steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {setupSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-sm pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Bot Features</CardTitle>
              <CardDescription>
                What you can do with the SplitMate Telegram bot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex-shrink-0">
                      <feature.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bot Commands */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Commands</CardTitle>
              <CardDescription>
                List of commands you can use with the Telegram bot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {botCommands.map((cmd, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                        {cmd.command}
                      </code>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {cmd.description}
                    </p>
                    <div className="bg-muted/50 p-2 rounded text-xs font-mono">
                      {cmd.example}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Stats */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>Your Telegram bot activity this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">47</div>
                  <div className="text-sm text-muted-foreground">Commands Used</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">23</div>
                  <div className="text-sm text-muted-foreground">Expenses Added</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-muted-foreground">Bills Split</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">8</div>
                  <div className="text-sm text-muted-foreground">Settlements</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Linking */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your Telegram bot integration settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Bot Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive expense and settlement notifications
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                  <Check className="h-3 w-3 mr-1" />
                  Enabled
                </Badge>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Auto Expense Detection</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically detect expenses from forwarded receipts
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                  <Check className="h-3 w-3 mr-1" />
                  Enabled
                </Badge>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Group Sync</h4>
                  <p className="text-sm text-muted-foreground">
                    Sync expenses with SplitMate groups
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                  <Check className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>

              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Settings
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
