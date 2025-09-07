"use client"

export const runtime = 'edge';

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
  Camera,
  Upload,
  Image,
  FileImage,
  Scan,
  CheckCircle,
  Clock,
  AlertCircle,
  Bot,
  Smartphone,
  Eye,
  Download,
  RefreshCw,
  Zap,
  Crop,
  RotateCw,
  Settings
} from "lucide-react"

const ocrHistory = [
  {
    id: 1,
    fileName: 'gpay_receipt_001.jpg',
    uploadTime: '2 hours ago',
    status: 'processed',
    confidence: '96%',
    extractedData: {
      merchant: 'Dominos Pizza',
      amount: 850,
      date: '2024-01-15',
      paymentMethod: 'Google Pay',
      category: 'Food & Dining',
      upiRef: 'GPA123456789'
    },
    processingTime: '2.1s'
  },
  {
    id: 2,
    fileName: 'phonepe_bill_cafe.png',
    uploadTime: '5 hours ago',
    status: 'processed',
    confidence: '94%',
    extractedData: {
      merchant: 'Starbucks Coffee',
      amount: 420,
      date: '2024-01-15',
      paymentMethod: 'PhonePe',
      category: 'Food & Dining',
      upiRef: 'PPE987654321'
    },
    processingTime: '1.8s'
  },
  {
    id: 3,
    fileName: 'paytm_screenshot.jpg',
    uploadTime: '1 day ago',
    status: 'failed',
    confidence: '45%',
    extractedData: null,
    processingTime: '3.2s',
    errorMessage: 'Image quality too low - text not clearly visible'
  },
]

const processingStats = {
  totalProcessed: 234,
  successRate: '94.2%',
  avgProcessingTime: '2.1s',
  avgConfidence: '92.8%',
  imagesThisMonth: 48,
  topApp: 'Google Pay'
}

const supportedFormats = ['JPG', 'PNG', 'WEBP', 'HEIC', 'PDF']
const supportedApps = [
  'PhonePe', 'Google Pay', 'Paytm', 'Amazon Pay', 
  'CRED', 'MobiKwik', 'Freecharge', 'BHIM', 
  'Bank Apps', 'Swiggy', 'Zomato', 'Uber'
]

export default function ScreenshotOcrPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [processingStatus, setProcessingStatus] = useState(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      console.log('Files dropped:', e.dataTransfer.files)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
          <CheckCircle className="h-3 w-3 mr-1" />
          Processed
        </Badge>
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
          Processing
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
            <h1 className="text-2xl font-bold tracking-tight">Screenshot OCR</h1>
            <p className="text-muted-foreground">
              Extract bill information from UPI app screenshots using AI-powered OCR
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
                    <Camera className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Processed</p>
                    <p className="text-lg font-semibold">{processingStats.totalProcessed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-lg font-semibold">{processingStats.successRate}</p>
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
                    <p className="text-sm text-muted-foreground">Avg Confidence</p>
                    <p className="text-lg font-semibold">{processingStats.avgConfidence}</p>
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
                    <p className="text-sm text-muted-foreground">Avg Time</p>
                    <p className="text-lg font-semibold">{processingStats.avgProcessingTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-pink-50 dark:bg-pink-950/20 rounded-lg">
                    <FileImage className="h-4 w-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-lg font-semibold">{processingStats.imagesThisMonth}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg">
                    <Smartphone className="h-4 w-4 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Top App</p>
                    <p className="text-lg font-semibold">{processingStats.topApp}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upload Interface */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Screenshots</CardTitle>
              <CardDescription>
                Upload UPI app screenshots to extract bill information automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Drag & Drop Area */}
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20' 
                    : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-full">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Drop your screenshots here</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to select files from your device
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {supportedFormats.map((format) => (
                        <Badge key={format} variant="outline" className="text-xs">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Select Screenshots
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-16 flex flex-col gap-2">
                  <Camera className="h-5 w-5" />
                  <span className="text-xs">Take Photo</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-2">
                  <Smartphone className="h-5 w-5" />
                  <span className="text-xs">From Phone</span>
                </Button>
                <Button variant="outline" className="h-16 flex flex-col gap-2">
                  <FileImage className="h-5 w-5" />
                  <span className="text-xs">Batch Upload</span>
                </Button>
              </div>

              {/* Supported Apps */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Supported Payment Apps:</h4>
                <div className="flex flex-wrap gap-2">
                  {supportedApps.map((app) => (
                    <Badge key={app} variant="secondary" className="text-xs">
                      {app}
                    </Badge>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Processing History */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Processing History</CardTitle>
                  <CardDescription>Recently processed screenshots and extracted data</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export Data
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ocrHistory.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                          <FileImage className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.fileName}</h4>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>Uploaded {item.uploadTime}</span>
                            <span>Processed in {item.processingTime}</span>
                            {item.confidence && (
                              <span className="text-green-600 font-medium">
                                Confidence: {item.confidence}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(item.status)}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {item.extractedData ? (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h5 className="font-medium text-sm mb-3">Extracted Information:</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Merchant: </span>
                            <span className="font-semibold">{item.extractedData.merchant}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Amount: </span>
                            <span className="font-semibold text-green-600">₹{item.extractedData.amount}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Date: </span>
                            <span className="font-medium">{item.extractedData.date}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Method: </span>
                            <span className="font-medium">{item.extractedData.paymentMethod}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Category: </span>
                            <span className="font-medium">{item.extractedData.category}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">UPI Ref: </span>
                            <span className="font-mono text-xs">{item.extractedData.upiRef}</span>
                          </div>
                        </div>
                        <div className="flex justify-end mt-3">
                          <Button size="sm">
                            Split This Bill
                          </Button>
                        </div>
                      </div>
                    ) : item.status === 'failed' && (
                      <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <span className="font-medium text-red-900 dark:text-red-100 text-sm">
                            Processing Failed
                          </span>
                        </div>
                        <p className="text-sm text-red-800 dark:text-red-200">
                          {item.errorMessage}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Crop className="h-4 w-4 mr-1" />
                            Crop & Retry
                          </Button>
                          <Button size="sm" variant="outline">
                            <RotateCw className="h-4 w-4 mr-1" />
                            Rotate & Retry
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* OCR Settings */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>OCR Settings</CardTitle>
              <CardDescription>Configure image processing and extraction settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Auto-enhance images</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically enhance image quality before processing
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Auto-rotate images</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically detect and correct image orientation
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Smart crop detection</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically detect and crop relevant bill areas
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Processing engine</h4>
                  <p className="text-sm text-muted-foreground">
                    OCR engine used for text extraction
                  </p>
                </div>
                <select className="px-3 py-2 border rounded-md text-sm">
                  <option value="gpt4-vision">GPT-4 Vision (Recommended)</option>
                  <option value="google-vision">Google Vision API</option>
                  <option value="aws-textract">AWS Textract</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium">Confidence threshold</h4>
                  <p className="text-sm text-muted-foreground">
                    Minimum confidence level for automatic processing
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">80%</span>
                  <input type="range" min="60" max="95" defaultValue="80" className="w-20" />
                </div>
              </div>

              <Separator />

              <div className="pt-2 space-y-2">
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced OCR Settings
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Processing images with AI costs ₹2-3 per image. Monthly limits apply.
                </p>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
