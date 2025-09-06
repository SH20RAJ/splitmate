"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  Smartphone, 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Info,
  Lock,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Settings,
  Key
} from "lucide-react"

const connectedAccounts = [
  {
    id: 1,
    name: 'PhonePe',
    type: 'UPI',
    phone: '+91 ****7890',
    status: 'connected',
    lastSync: '2 hours ago',
    permissions: ['Read SMS', 'Access Payment History'],
    icon: '📱',
    color: 'purple'
  },
  {
    id: 2,
    name: 'Google Pay',
    type: 'UPI',
    email: 'user****@gmail.com',
    status: 'connected',
    lastSync: '5 hours ago',
    permissions: ['Read Email', 'Access Transactions'],
    icon: '💳',
    color: 'blue'
  },
  {
    id: 3,
    name: 'Amazon Pay',
    type: 'Wallet',
    email: 'user****@gmail.com',
    status: 'connected',
    lastSync: '1 day ago',
    permissions: ['Read Order History'],
    icon: '🛒',
    color: 'orange'
  },
]

const availableApps = [
  {
    id: 'paytm',
    name: 'Paytm',
    type: 'UPI & Wallet',
    description: 'Connect Paytm for UPI payments and wallet transactions',
    icon: '💰',
    supported: true,
    methods: ['SMS Parser', 'Email Parser']
  },
  {
    id: 'cred',
    name: 'CRED',
    type: 'Credit Card',
    description: 'Import credit card bills and payments from CRED',
    icon: '💎',
    supported: true,
    methods: ['SMS Parser', 'Email Parser']
  },
  {
    id: 'mobikwik',
    name: 'MobiKwik',
    type: 'Wallet',
    description: 'Connect MobiKwik for wallet and UPI transactions',
    icon: '📱',
    supported: false,
    methods: ['Coming Soon']
  },
  {
    id: 'freecharge',
    name: 'FreeCharge',
    type: 'Wallet',
    description: 'Import bills and recharges from FreeCharge',
    icon: '⚡',
    supported: false,
    methods: ['Coming Soon']
  },
]

export default function ConnectAccountsPage() {
  const [showApiKeys, setShowApiKeys] = useState(false)
  const [newAccountForm, setNewAccountForm] = useState({
    app: '',
    method: '',
    phone: '',
    email: '',
    apiKey: ''
  })

  const getStatusBadge = (status: string) => {
    if (status === 'connected') {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Connected
        </Badge>
      )
    }
    return (
      <Badge variant="secondary">
        <AlertCircle className="h-3 w-3 mr-1" />
        Disconnected
      </Badge>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 py-6">
        
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Connect Accounts</h1>
            <p className="text-muted-foreground">
              Connect your payment apps and services to automatically import bills and transactions
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="px-4 lg:px-6">
          <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    Your data is secure
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    We use bank-grade encryption and never store your payment credentials. 
                    We only read transaction SMS/emails to import bill information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connected Accounts */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                Your currently connected payment apps and services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectedAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{account.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{account.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {account.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {account.phone || account.email}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          Last sync: {account.lastSync}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(account.status)}
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" />
                      Manage
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Available Apps */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Available Apps</CardTitle>
              <CardDescription>
                Connect more payment apps to automatically import bills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableApps.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{app.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{app.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {app.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {app.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {app.methods.map((method, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    {app.supported ? (
                      <Button>
                        <Plus className="h-4 w-4 mr-1" />
                        Connect
                      </Button>
                    ) : (
                      <Button variant="outline" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Connection Methods */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Connection Methods</CardTitle>
              <CardDescription>
                Different ways to connect your payment apps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* SMS Parser */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <Smartphone className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">SMS Parser</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically parse transaction SMS messages (Recommended)
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-10">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={newAccountForm.phone}
                      onChange={(e) => setNewAccountForm(prev => ({...prev, phone: e.target.value}))}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full">
                      Enable SMS Parser
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Email Parser */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <Smartphone className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email Parser</h4>
                    <p className="text-sm text-muted-foreground">
                      Parse transaction emails from payment apps
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-10">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@gmail.com"
                      value={newAccountForm.email}
                      onChange={(e) => setNewAccountForm(prev => ({...prev, email: e.target.value}))}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" className="w-full">
                      Connect Email
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* API Integration */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <Key className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">API Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Direct API integration for supported apps (Advanced)
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-10">
                  <div className="space-y-2">
                    <Label htmlFor="api-app">App</Label>
                    <select
                      id="api-app"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
                      value={newAccountForm.app}
                      onChange={(e) => setNewAccountForm(prev => ({...prev, app: e.target.value}))}
                    >
                      <option value="">Select App</option>
                      <option value="phonepe">PhonePe</option>
                      <option value="googlepay">Google Pay</option>
                      <option value="paytm">Paytm</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">
                      <div className="flex items-center gap-2">
                        API Key
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowApiKeys(!showApiKeys)}
                        >
                          {showApiKeys ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </div>
                    </Label>
                    <Input
                      id="api-key"
                      type={showApiKeys ? "text" : "password"}
                      placeholder="Enter API key"
                      value={newAccountForm.apiKey}
                      onChange={(e) => setNewAccountForm(prev => ({...prev, apiKey: e.target.value}))}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" className="w-full">
                      Connect API
                    </Button>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Privacy & Security */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security Settings</CardTitle>
              <CardDescription>
                Control how your data is processed and stored
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Auto-sync transactions</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically import new transactions as they occur
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Store transaction data locally</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep transaction data on your device for faster access
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Share usage analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Help us improve the service by sharing anonymous usage data
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Privacy Policy
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
