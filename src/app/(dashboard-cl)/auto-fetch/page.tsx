import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Smartphone, 
  Zap, 
  Upload, 
  Camera,
  Mail,
  MessageSquare,
  Link,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Receipt,
  CreditCard,
  ShoppingBag,
  Car,
  Home,
  Coffee
} from "lucide-react"

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Auto Fetch & Split - SplitMate',
  description: 'Automatically import and split bills from payment apps and delivery services.',
}

const paymentApps = [
  {
    id: 'phonepe',
    name: 'PhonePe',
    icon: '📱',
    status: 'connected',
    lastSync: '2 hours ago',
    totalBills: 45,
    description: 'UPI payments and merchant transactions'
  },
  {
    id: 'googlepay',
    name: 'Google Pay',
    icon: '💳',
    status: 'connected',
    lastSync: '5 hours ago',
    totalBills: 32,
    description: 'UPI payments and bill payments'
  },
  {
    id: 'paytm',
    name: 'Paytm',
    icon: '💰',
    status: 'disconnected',
    lastSync: 'Never',
    totalBills: 0,
    description: 'Wallet payments and recharges'
  },
  {
    id: 'amazonpay',
    name: 'Amazon Pay',
    icon: '🛒',
    status: 'connected',
    lastSync: '1 day ago',
    totalBills: 18,
    description: 'Shopping and UPI payments'
  },
]

const deliveryApps = [
  {
    id: 'swiggy',
    name: 'Swiggy',
    icon: '🍕',
    status: 'connected',
    lastSync: '30 mins ago',
    totalOrders: 28,
    category: 'Food Delivery',
    description: 'Food and grocery delivery'
  },
  {
    id: 'zomato',
    name: 'Zomato',
    icon: '🍽️',
    status: 'connected',
    lastSync: '2 hours ago',
    totalOrders: 22,
    category: 'Food Delivery',
    description: 'Food delivery and dining'
  },
  {
    id: 'zepto',
    name: 'Zepto',
    icon: '⚡',
    status: 'disconnected',
    lastSync: 'Never',
    totalOrders: 0,
    category: 'Grocery',
    description: '10-minute grocery delivery'
  },
  {
    id: 'blinkit',
    name: 'Blinkit',
    icon: '🛍️',
    status: 'connected',
    lastSync: '6 hours ago',
    totalOrders: 15,
    category: 'Grocery',
    description: 'Quick commerce delivery'
  },
  {
    id: 'instamart',
    name: 'Instamart',
    icon: '🏪',
    status: 'disconnected',
    lastSync: 'Never',
    totalOrders: 0,
    category: 'Grocery',
    description: 'Swiggy grocery delivery'
  },
]

const recentFetches = [
  {
    id: 1,
    source: 'PhonePe',
    type: 'Restaurant Bill',
    merchant: 'Dominos Pizza',
    amount: 850,
    date: '2024-09-07',
    time: '2:30 PM',
    status: 'ready_to_split',
    participants: 3,
    category: 'Food & Dining'
  },
  {
    id: 2,
    source: 'Swiggy',
    type: 'Food Order',
    merchant: 'Burger King',
    amount: 420,
    date: '2024-09-07',
    time: '12:45 PM',
    status: 'split_completed',
    participants: 2,
    category: 'Food & Dining'
  },
  {
    id: 3,
    source: 'Google Pay',
    type: 'UPI Payment',
    merchant: 'Uber',
    amount: 180,
    date: '2024-09-06',
    time: '9:15 PM',
    status: 'pending_approval',
    participants: 4,
    category: 'Transportation'
  },
  {
    id: 4,
    source: 'Blinkit',
    type: 'Grocery Order',
    merchant: 'Blinkit',
    amount: 1250,
    date: '2024-09-06',
    time: '6:30 PM',
    status: 'ready_to_split',
    participants: 3,
    category: 'Groceries'
  },
]

const stats = {
  totalConnected: 6,
  totalApps: 9,
  billsFetched: 160,
  amountProcessed: 45600,
  lastSync: '30 mins ago'
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'connected':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        <CheckCircle className="h-3 w-3 mr-1" />
        Connected
      </Badge>
    case 'disconnected':
      return <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <AlertCircle className="h-3 w-3 mr-1" />
        Disconnected
      </Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

const getActivityStatusBadge = (status: string) => {
  switch (status) {
    case 'ready_to_split':
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        <Users className="h-3 w-3 mr-1" />
        Ready to Split
      </Badge>
    case 'split_completed':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        <CheckCircle className="h-3 w-3 mr-1" />
        Split Completed
      </Badge>
    case 'pending_approval':
      return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
        <Clock className="h-3 w-3 mr-1" />
        Pending Approval
      </Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export default function AutoFetchPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-4">
        <div className="flex flex-col gap-6 py-6">
          
          {/* Header */}
          <div className="px-4 lg:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Auto Fetch & Split</h1>
                <p className="text-muted-foreground">Automatically import bills from payment apps and delivery services</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Zap className="h-3 w-3 mr-1" />
                  Last sync: {stats.lastSync}
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <Link className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Connected</p>
                      <p className="text-lg font-semibold">{stats.totalConnected}/{stats.totalApps}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <Receipt className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bills Fetched</p>
                      <p className="text-lg font-semibold">{stats.billsFetched}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <CreditCard className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Amount Processed</p>
                      <p className="text-lg font-semibold">₹{stats.amountProcessed.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <Zap className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Auto Sync</p>
                      <p className="text-lg font-semibold">ON</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Import bills using different methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button className="h-16 flex flex-col gap-2">
                    <Upload className="h-5 w-5" />
                    <span className="text-xs">Upload SMS/Email</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <Camera className="h-5 w-5" />
                    <span className="text-xs">Screenshot OCR</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <Smartphone className="h-5 w-5" />
                    <span className="text-xs">Share from UPI App</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-2">
                    <Zap className="h-5 w-5" />
                    <span className="text-xs">Sync All Apps</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Apps */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Apps</CardTitle>
                <CardDescription>Connect your UPI and payment apps to auto-import bills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentApps.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{app.icon}</div>
                      <div>
                        <h4 className="font-medium">{app.name}</h4>
                        <p className="text-sm text-muted-foreground">{app.description}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>Last sync: {app.lastSync}</span>
                          <span>Bills: {app.totalBills}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(app.status)}
                      <Switch checked={app.status === 'connected'} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Delivery Apps */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Food & Grocery Delivery</CardTitle>
                <CardDescription>Connect delivery apps to auto-import order bills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {deliveryApps.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{app.icon}</div>
                      <div>
                        <h4 className="font-medium">{app.name}</h4>
                        <p className="text-sm text-muted-foreground">{app.description}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">{app.category}</Badge>
                          <span>Last sync: {app.lastSync}</span>
                          <span>Orders: {app.totalOrders}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(app.status)}
                      <Switch checked={app.status === 'connected'} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Auto-Fetched Bills</CardTitle>
                <CardDescription>Bills automatically imported from your connected apps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentFetches.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <Receipt className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{bill.merchant}</h4>
                          <Badge variant="outline" className="text-xs">{bill.source}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{bill.type} • {bill.category}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>{bill.date} • {bill.time}</span>
                          <span>{bill.participants} participants</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold">₹{bill.amount}</div>
                        <div className="text-xs text-muted-foreground">
                          ₹{Math.round(bill.amount / bill.participants)}/person
                        </div>
                      </div>
                      {getActivityStatusBadge(bill.status)}
                      <Button size="sm" variant="outline">
                        Split Now
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
