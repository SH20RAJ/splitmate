"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MessageSquare,
  Mail,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Smartphone,
  Bot,
  Settings,
  Eye,
  Trash2,
  Filter,
  Search,
  Download,
  RefreshCw
} from "lucide-react"

const smsRules = [
  {
    id: 1,
    name: 'UPI Transaction Messages',
    sender: 'HDFCBK, ICICIBANK, SBIBANK',
    keywords: ['debited', 'credited', 'UPI', 'transaction'],
    status: 'active',
    processed: 156,
    lastMatch: '2 hours ago',
    accuracy: '96%'
  },
  {
    id: 2,
    name: 'Food Delivery Orders',
    sender: 'SWIGGY, ZOMATO, UBERAT',
    keywords: ['order placed', 'delivery', 'restaurant'],
    status: 'active',
    processed: 89,
    lastMatch: '5 hours ago',
    accuracy: '94%'
  },
  {
    id: 3,
    name: 'Payment App Notifications',
    sender: 'PHONEPE, GPAY, PAYTM',
    keywords: ['payment', 'successful', 'merchant'],
    status: 'active',
    processed: 124,
    lastMatch: '1 hour ago',
    accuracy: '98%'
  },
]

const emailRules = [
  {
    id: 1,
    name: 'E-commerce Receipts',
    sender: 'noreply@amazon.in, orders@flipkart.com',
    subject: ['order confirmation', 'receipt', 'invoice'],
    status: 'active',
    processed: 45,
    lastMatch: '1 day ago',
    accuracy: '92%'
  },
  {
    id: 2,
    name: 'Payment Confirmations',
    sender: 'notifications@phonepe.com, receipts@paytm.in',
    subject: ['payment receipt', 'transaction successful'],
    status: 'active',
    processed: 78,
    lastMatch: '3 hours ago',
    accuracy: '97%'
  },
]

const recentMessages = [
  {
    id: 1,
    type: 'SMS',
    sender: 'HDFCBK',
    content: 'Your A/c XX1234 debited Rs.420 on 15-Jan-24 for UPI/SWIGGY/9876543210@paytm. Available bal: Rs.XX,XXX.XX',
    amount: 420,
    merchant: 'Swiggy',
    category: 'Food & Dining',
    status: 'processed',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    type: 'EMAIL',
    sender: 'receipts@zomato.com',
    content: 'Your order #ZO123456 has been delivered. Amount paid: ₹340 via Google Pay. Thank you for ordering!',
    amount: 340,
    merchant: 'Zomato',
    category: 'Food & Dining',
    status: 'processed',
    timestamp: '4 hours ago'
  },
  {
    id: 3,
    type: 'SMS',
    sender: 'PHONEPE',
    content: 'Payment of Rs.180 to UBER TECHNOLOGIES via PhonePe is successful. UPI Ref: 402938475934',
    amount: 180,
    merchant: 'Uber',
    category: 'Transportation',
    status: 'pending',
    timestamp: '6 hours ago'
  },
]

const stats = {
  totalProcessed: 892,
  thisMonth: 156,
  accuracy: '96.2%',
  avgProcessingTime: '2.3s',
  smsRules: 8,
  emailRules: 5
}

export default function SmsEmailParserPage() {
  const [newRule, setNewRule] = useState({
    type: 'sms',
    name: '',
    sender: '',
    keywords: '',
    subject: ''
  })
  
  const [uploadedContent, setUploadedContent] = useState('')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Active
        </Badge>
      case 'inactive':
        return <Badge variant="secondary">
          <Clock className="h-3 w-3 mr-1" />
          Inactive
        </Badge>
      case 'error':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
          <AlertCircle className="h-3 w-3 mr-1" />
          Error
        </Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getMessageStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Processed
        </Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
          <AlertCircle className="h-3 w-3 mr-1" />
          Failed
        </Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 py-6">
        
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">SMS & Email Parser</h1>
            <p className="text-muted-foreground">
              Automatically extract bill information from SMS messages and emails
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Processed</p>
                    <p className="text-lg font-semibold">{stats.totalProcessed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <RefreshCw className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-lg font-semibold">{stats.thisMonth}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <Bot className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="text-lg font-semibold">{stats.accuracy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <Clock className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Time</p>
                    <p className="text-lg font-semibold">{stats.avgProcessingTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
                    <Smartphone className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SMS Rules</p>
                    <p className="text-lg font-semibold">{stats.smsRules}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg">
                    <Mail className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Rules</p>
                    <p className="text-lg font-semibold">{stats.emailRules}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Upload */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Import</CardTitle>
              <CardDescription>Upload SMS messages or emails to extract bill information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="paste" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="paste">Paste Text</TabsTrigger>
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                </TabsList>
                
                <TabsContent value="paste" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content">SMS Message or Email Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Paste your SMS or email content here..."
                      rows={4}
                      value={uploadedContent}
                      onChange={(e) => setUploadedContent(e.target.value)}
                    />
                  </div>
                  <Button className="w-full">
                    <Bot className="h-4 w-4 mr-2" />
                    Process Content
                  </Button>
                </TabsContent>
                
                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your files here, or click to select
                    </p>
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Select Files
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Parsing Rules */}
        <div className="px-4 lg:px-6">
          <Tabs defaultValue="sms" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="sms">SMS Rules</TabsTrigger>
                <TabsTrigger value="email">Email Rules</TabsTrigger>
              </TabsList>
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                Add New Rule
              </Button>
            </div>
            
            {/* SMS Rules */}
            <TabsContent value="sms" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SMS Parsing Rules</CardTitle>
                  <CardDescription>
                    Configure rules to automatically extract bill information from SMS messages
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {smsRules.map((rule) => (
                    <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{rule.name}</h4>
                          {getStatusBadge(rule.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Sender patterns: </span>
                            <span className="font-medium">{rule.sender}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Keywords: </span>
                            <span className="font-medium">{rule.keywords.join(', ')}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Processed: </span>
                            <span className="font-medium">{rule.processed} messages</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Accuracy: </span>
                            <span className="font-medium text-green-600">{rule.accuracy}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Last match: {rule.lastMatch}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={rule.status === 'active'} />
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Email Rules */}
            <TabsContent value="email" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Parsing Rules</CardTitle>
                  <CardDescription>
                    Configure rules to automatically extract bill information from emails
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {emailRules.map((rule) => (
                    <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{rule.name}</h4>
                          {getStatusBadge(rule.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Sender domains: </span>
                            <span className="font-medium">{rule.sender}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Subject patterns: </span>
                            <span className="font-medium">{rule.subject.join(', ')}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Processed: </span>
                            <span className="font-medium">{rule.processed} emails</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Accuracy: </span>
                            <span className="font-medium text-green-600">{rule.accuracy}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Last match: {rule.lastMatch}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={rule.status === 'active'} />
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Recent Messages */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Recently processed SMS messages and emails</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-blue-50 dark:bg-blue-950/20 rounded">
                          {message.type === 'SMS' ? (
                            <MessageSquare className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Mail className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {message.type}
                        </Badge>
                        <span className="text-sm font-medium">{message.sender}</span>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getMessageStatusBadge(message.status)}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded text-sm mb-3 font-mono">
                      {message.content}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Amount: </span>
                          <span className="font-semibold">₹{message.amount}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Merchant: </span>
                          <span className="font-medium">{message.merchant}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Category: </span>
                          <span className="font-medium">{message.category}</span>
                        </div>
                      </div>
                      {message.status === 'processed' && (
                        <Button size="sm" variant="outline">
                          Split Bill
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Parser Settings</CardTitle>
              <CardDescription>Configure how messages are processed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Auto-process new messages</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically process SMS and emails as they arrive
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Enable smart categorization</h4>
                  <p className="text-sm text-muted-foreground">
                    Use AI to automatically categorize transactions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Store message content</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep original message content for reference (encrypted)
                  </p>
                </div>
                <Switch />
              </div>

              <Separator />

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Confidence threshold</h4>
                  <p className="text-sm text-muted-foreground">
                    Minimum confidence level for automatic processing
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">85%</span>
                  <input type="range" min="70" max="95" defaultValue="85" className="w-20" />
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
