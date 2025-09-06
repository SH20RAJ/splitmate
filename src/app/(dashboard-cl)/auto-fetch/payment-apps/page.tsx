import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { 
  Smartphone, 
  CreditCard,
  Wallet,
  QrCode,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  Settings,
  Download,
  RefreshCw,
  TrendingUp,
  Users,
  Receipt,
  Calendar
} from "lucide-react"

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Payment Apps - Auto Fetch - SplitMate',
  description: 'Manage payment app integrations and import UPI transactions.',
}

const paymentApps = [
  {
    id: 'phonepe',
    name: 'PhonePe',
    icon: '📱',
    type: 'UPI',
    status: 'connected',
    lastSync: '2 hours ago',
    totalTransactions: 156,
    monthlyAmount: 12450,
    billsReady: 8,
    description: 'UPI payments, merchant transactions, and bill payments',
    features: ['UPI Transactions', 'Merchant Payments', 'Bill Payments', 'QR Code Payments'],
    syncProgress: 100,
    autoSync: true,
    color: 'purple'
  },
  {
    id: 'googlepay',
    name: 'Google Pay',
    icon: '💳',
    type: 'UPI',
    status: 'connected',
    lastSync: '5 hours ago',
    totalTransactions: 89,
    monthlyAmount: 8920,
    billsReady: 5,
    description: 'Google Pay UPI transactions and integrated services',
    features: ['UPI Transactions', 'Bill Payments', 'Recharges', 'Gold Investment'],
    syncProgress: 100,
    autoSync: true,
    color: 'blue'
  },
  {
    id: 'paytm',
    name: 'Paytm',
    icon: '💰',
    type: 'UPI & Wallet',
    status: 'syncing',
    lastSync: 'Syncing now...',
    totalTransactions: 45,
    monthlyAmount: 3420,
    billsReady: 2,
    description: 'Paytm wallet, UPI, and merchant payments',
    features: ['Wallet Payments', 'UPI Transactions', 'Recharges', 'Travel Bookings'],
    syncProgress: 65,
    autoSync: true,
    color: 'indigo'
  },
  {
    id: 'amazonpay',
    name: 'Amazon Pay',
    icon: '🛒',
    type: 'Wallet',
    status: 'connected',
    lastSync: '1 day ago',
    totalTransactions: 34,
    monthlyAmount: 5640,
    billsReady: 3,
    description: 'Amazon Pay wallet and UPI transactions',
    features: ['Shopping Payments', 'UPI Transactions', 'Bill Payments', 'Gift Cards'],
    syncProgress: 100,
    autoSync: false,
    color: 'orange'
  },
  {
    id: 'cred',
    name: 'CRED',
    icon: '💎',
    type: 'Credit Card',
    status: 'error',
    lastSync: '3 days ago',
    totalTransactions: 23,
    monthlyAmount: 15230,
    billsReady: 0,
    description: 'Credit card bill payments and rewards',
    features: ['Credit Card Bills', 'Rent Payments', 'Insurance', 'Investments'],
    syncProgress: 0,
    autoSync: false,
    color: 'pink'
  },
  {
    id: 'mobikwik',
    name: 'MobiKwik',
    icon: '📱',
    type: 'Wallet',
    status: 'disconnected',
    lastSync: 'Never',
    totalTransactions: 0,
    monthlyAmount: 0,
    billsReady: 0,
    description: 'MobiKwik wallet and UPI payments',
    features: ['Wallet Payments', 'UPI Transactions', 'Bill Payments', 'Zip Payments'],
    syncProgress: 0,
    autoSync: false,
    color: 'red'
  },
]

const recentTransactions = [
  {
    id: 1,
    app: 'PhonePe',
    type: 'UPI Payment',
    merchant: 'Zomato',
    amount: 420,
    date: '2024-01-15',
    time: '12:45 PM',
    status: 'ready_to_split',
    category: 'Food & Dining',
    participants: 2,
    upiId: 'merchant@paytm'
  },
  {
    id: 2,
    app: 'Google Pay',
    type: 'Bill Payment',
    merchant: 'Uber',
    amount: 180,
    date: '2024-01-15',
    time: '9:15 AM',
    status: 'imported',
    category: 'Transportation',
    participants: 4,
    upiId: 'uber@okhdfcbank'
  },
  {
    id: 3,
    app: 'Paytm',
    type: 'Wallet Payment',
    merchant: 'BookMyShow',
    amount: 600,
    date: '2024-01-14',
    time: '7:30 PM',
    status: 'split_completed',
    category: 'Entertainment',
    participants: 3,
    upiId: 'bookmyshow@paytm'
  },
]

const monthlyStats = {
  totalTransactions: 347,
  totalAmount: 45660,
  billsProcessed: 18,
  averageBillSize: 2537,
  topCategory: 'Food & Dining',
  topApp: 'PhonePe'
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'connected':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
        <CheckCircle className="h-3 w-3 mr-1" />
        Connected
      </Badge>
    case 'syncing':
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
        <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
        Syncing
      </Badge>
    case 'error':
      return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Error
      </Badge>
    case 'disconnected':
      return <Badge variant="secondary">
        <Clock className="h-3 w-3 mr-1" />
        Disconnected
      </Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

const getTransactionStatusBadge = (status: string) => {
  switch (status) {
    case 'ready_to_split':
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
        <Users className="h-3 w-3 mr-1" />
        Ready to Split
      </Badge>
    case 'imported':
      return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
        <Download className="h-3 w-3 mr-1" />
        Imported
      </Badge>
    case 'split_completed':
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
        <CheckCircle className="h-3 w-3 mr-1" />
        Split Completed
      </Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

export default function PaymentAppsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 py-6">
        
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Payment Apps</h1>
            <p className="text-muted-foreground">
              Manage UPI apps, wallets, and payment services for automatic bill importing
            </p>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <Receipt className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <p className="text-lg font-semibold">{monthlyStats.totalTransactions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="text-lg font-semibold">₹{monthlyStats.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bills Split</p>
                    <p className="text-lg font-semibold">{monthlyStats.billsProcessed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <Calendar className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Bill Size</p>
                    <p className="text-lg font-semibold">₹{monthlyStats.averageBillSize}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Connected Payment Apps */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Connected Payment Apps</CardTitle>
                  <CardDescription>Your UPI apps, wallets, and payment services</CardDescription>
                </div>
                <Button>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {paymentApps.map((app) => (
                <div key={app.id} className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{app.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-lg">{app.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {app.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {app.description}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Last sync: </span>
                            <span className="font-medium">{app.lastSync}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Transactions: </span>
                            <span className="font-medium">{app.totalTransactions}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">This month: </span>
                            <span className="font-medium">₹{app.monthlyAmount.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Bills ready: </span>
                            <span className="font-medium text-blue-600">{app.billsReady}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(app.status)}
                      <Switch checked={app.status === 'connected'} />
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                  
                  {/* Sync Progress */}
                  {app.status === 'syncing' && (
                    <div className="px-4 py-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Syncing transactions...</span>
                        <span className="text-sm text-muted-foreground">{app.syncProgress}%</span>
                      </div>
                      <Progress value={app.syncProgress} className="h-2" />
                    </div>
                  )}
                  
                  {/* Error State */}
                  {app.status === 'error' && (
                    <div className="px-4 py-3 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm font-medium text-red-900 dark:text-red-100">
                            Connection error - Unable to sync transactions
                          </span>
                        </div>
                        <Button size="sm" variant="outline">
                          Reconnect
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Features */}
                  <div className="px-4">
                    <div className="flex items-center gap-2 mb-2">
                      <QrCode className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Supported Features:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {app.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest transactions imported from your payment apps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <Receipt className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{transaction.merchant}</h4>
                          <Badge variant="outline" className="text-xs">
                            {transaction.app}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {transaction.type} • {transaction.category}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>{transaction.date} • {transaction.time}</span>
                          <span>UPI: {transaction.upiId}</span>
                          <span>{transaction.participants} participants</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold text-lg">₹{transaction.amount}</div>
                        <div className="text-xs text-muted-foreground">
                          ₹{Math.round(transaction.amount / transaction.participants)}/person
                        </div>
                      </div>
                      {getTransactionStatusBadge(transaction.status)}
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integration Guide */}
        <div className="px-4 lg:px-6">
          <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="text-blue-900 dark:text-blue-100">
                How Payment App Integration Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-blue-100 dark:bg-blue-900/40 rounded">
                      <Smartphone className="h-4 w-4 text-blue-600" />
                    </div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">
                      SMS Parsing
                    </h4>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-200 pl-7">
                    We automatically parse transaction SMS messages from your payment apps to extract bill information.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-blue-100 dark:bg-blue-900/40 rounded">
                      <ExternalLink className="h-4 w-4 text-blue-600" />
                    </div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">
                      API Integration
                    </h4>
                  </div>
                  <p className="text-sm text-blue-800 dark:text-blue-200 pl-7">
                    For supported apps, we use official APIs to securely fetch transaction data.
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Learn More About Data Security
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
