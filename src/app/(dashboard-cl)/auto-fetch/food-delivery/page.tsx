import type { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ShoppingBag,
  Coffee,
  Car,
  Home,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  Settings,
  RefreshCw,
  TrendingUp,
  Users,
  Receipt,
  Calendar,
  MapPin,
  Star,
  Truck
} from "lucide-react"

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Food & Delivery Apps - Auto Fetch - SplitMate',
  description: 'Manage food delivery and service app integrations.',
}

const foodDeliveryApps = [
  {
    id: 'swiggy',
    name: 'Swiggy',
    icon: '🍕',
    type: 'Food Delivery',
    status: 'connected',
    lastSync: '30 mins ago',
    totalOrders: 45,
    monthlyAmount: 8450,
    billsReady: 6,
    description: 'Food delivery, Instamart grocery, and Genie services',
    features: ['Food Delivery', 'Instamart', 'Genie', 'One'],
    syncProgress: 100,
    autoSync: true,
    color: 'orange',
    avgDeliveryTime: '28 mins',
    topRestaurant: 'Dominos Pizza'
  },
  {
    id: 'zomato',
    name: 'Zomato',
    icon: '🍽️',
    type: 'Food Delivery',
    status: 'connected',
    lastSync: '2 hours ago',
    totalOrders: 32,
    monthlyAmount: 5640,
    billsReady: 4,
    description: 'Food delivery, dining, and grocery services',
    features: ['Food Delivery', 'Dining Out', 'Blinkit', 'Gold'],
    syncProgress: 100,
    autoSync: true,
    color: 'red',
    avgDeliveryTime: '32 mins',
    topRestaurant: 'McDonalds'
  },
  {
    id: 'uber_eats',
    name: 'Uber Eats',
    icon: '🚗',
    type: 'Food Delivery',
    status: 'disconnected',
    lastSync: 'Never',
    totalOrders: 0,
    monthlyAmount: 0,
    billsReady: 0,
    description: 'Food delivery service by Uber',
    features: ['Food Delivery', 'Alcohol Delivery', 'Grocery'],
    syncProgress: 0,
    autoSync: false,
    color: 'green',
    avgDeliveryTime: 'N/A',
    topRestaurant: 'N/A'
  },
]

const groceryApps = [
  {
    id: 'blinkit',
    name: 'Blinkit',
    icon: '⚡',
    type: 'Quick Grocery',
    status: 'connected',
    lastSync: '1 hour ago',
    totalOrders: 28,
    monthlyAmount: 4200,
    billsReady: 3,
    description: '10-minute grocery and essentials delivery',
    features: ['Groceries', 'Medicines', 'Electronics', 'Pet Care'],
    syncProgress: 100,
    autoSync: true,
    color: 'yellow',
    avgDeliveryTime: '12 mins',
    topCategory: 'Groceries'
  },
  {
    id: 'zepto',
    name: 'Zepto',
    icon: '🛍️',
    type: 'Quick Grocery',
    status: 'syncing',
    lastSync: 'Syncing now...',
    totalOrders: 18,
    monthlyAmount: 3240,
    billsReady: 1,
    description: '10-minute grocery delivery service',
    features: ['Groceries', 'Personal Care', 'Baby Care', 'Pet Care'],
    syncProgress: 75,
    autoSync: true,
    color: 'purple',
    avgDeliveryTime: '11 mins',
    topCategory: 'Personal Care'
  },
  {
    id: 'bigbasket',
    name: 'BigBasket',
    icon: '🛒',
    type: 'Grocery',
    status: 'error',
    lastSync: '2 days ago',
    totalOrders: 12,
    monthlyAmount: 2800,
    billsReady: 0,
    description: 'Online grocery shopping and delivery',
    features: ['Groceries', 'BB Instant', 'Fresh Produce', 'Household'],
    syncProgress: 0,
    autoSync: false,
    color: 'green',
    avgDeliveryTime: '2 hours',
    topCategory: 'Fresh Produce'
  },
]

const serviceApps = [
  {
    id: 'uber',
    name: 'Uber',
    icon: '🚙',
    type: 'Transportation',
    status: 'connected',
    lastSync: '4 hours ago',
    totalRides: 23,
    monthlyAmount: 1840,
    billsReady: 5,
    description: 'Ride sharing and transportation service',
    features: ['Rides', 'Rentals', 'Intercity', 'Auto'],
    syncProgress: 100,
    autoSync: true,
    color: 'black',
    avgRideTime: '18 mins',
    topRoute: 'Home to Office'
  },
  {
    id: 'ola',
    name: 'Ola',
    icon: '🚕',
    type: 'Transportation',
    status: 'connected',
    lastSync: '6 hours ago',
    totalRides: 15,
    monthlyAmount: 1200,
    billsReady: 2,
    description: 'Cab booking and transportation service',
    features: ['Rides', 'Rentals', 'Outstation', 'Auto'],
    syncProgress: 100,
    autoSync: false,
    color: 'green',
    avgRideTime: '22 mins',
    topRoute: 'Airport to Home'
  },
  {
    id: 'urban_company',
    name: 'Urban Company',
    icon: '🏠',
    type: 'Home Services',
    status: 'disconnected',
    lastSync: 'Never',
    totalBookings: 0,
    monthlyAmount: 0,
    billsReady: 0,
    description: 'Home services and beauty appointments',
    features: ['Beauty', 'Cleaning', 'Repairs', 'Wellness'],
    syncProgress: 0,
    autoSync: false,
    color: 'purple',
    avgServiceTime: 'N/A',
    topService: 'N/A'
  },
]

const recentOrders = [
  {
    id: 1,
    app: 'Swiggy',
    type: 'Food Order',
    merchant: 'Burger King',
    amount: 420,
    date: '2024-01-15',
    time: '12:45 PM',
    status: 'ready_to_split',
    category: 'Fast Food',
    participants: 2,
    deliveryAddress: 'Home',
    items: 3,
    rating: 4.2
  },
  {
    id: 2,
    app: 'Blinkit',
    type: 'Grocery Order',
    merchant: 'Blinkit Store',
    amount: 850,
    date: '2024-01-15',
    time: '9:30 AM',
    status: 'imported',
    category: 'Groceries',
    participants: 3,
    deliveryAddress: 'Home',
    items: 12,
    rating: 4.5
  },
  {
    id: 3,
    app: 'Uber',
    type: 'Ride',
    merchant: 'Uber Trip',
    amount: 180,
    date: '2024-01-14',
    time: '7:15 PM',
    status: 'split_completed',
    category: 'Transportation',
    participants: 4,
    deliveryAddress: 'Airport',
    items: 1,
    rating: 4.8
  },
]

const monthlyStats = {
  totalOrders: 173,
  totalAmount: 26370,
  billsProcessed: 21,
  avgOrderValue: 152,
  topCategory: 'Food Delivery',
  topApp: 'Swiggy'
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

const getOrderStatusBadge = (status: string) => {
  switch (status) {
    case 'ready_to_split':
      return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
        <Users className="h-3 w-3 mr-1" />
        Ready to Split
      </Badge>
    case 'imported':
      return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
        <Truck className="h-3 w-3 mr-1" />
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

export default function FoodDeliveryPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-6 py-6">
        
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Food & Delivery Apps</h1>
            <p className="text-muted-foreground">
              Manage food delivery, grocery, and service app integrations
            </p>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <ShoppingBag className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Orders</p>
                    <p className="text-lg font-semibold">{monthlyStats.totalOrders}</p>
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
                    <p className="text-sm text-muted-foreground">Total Spent</p>
                    <p className="text-lg font-semibold">₹{monthlyStats.totalAmount.toLocaleString()}</p>
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
                    <p className="text-sm text-muted-foreground">Bills Split</p>
                    <p className="text-lg font-semibold">{monthlyStats.billsProcessed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Order</p>
                    <p className="text-lg font-semibold">₹{monthlyStats.avgOrderValue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* App Categories */}
        <div className="px-4 lg:px-6">
          <Tabs defaultValue="food" className="space-y-6">
            <TabsList>
              <TabsTrigger value="food">Food Delivery</TabsTrigger>
              <TabsTrigger value="grocery">Grocery & Quick Commerce</TabsTrigger>
              <TabsTrigger value="services">Services & Transportation</TabsTrigger>
            </TabsList>
            
            {/* Food Delivery Apps */}
            <TabsContent value="food" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Food Delivery Apps</CardTitle>
                      <CardDescription>Restaurants and food delivery services</CardDescription>
                    </div>
                    <Button>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Orders
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {foodDeliveryApps.map((app) => (
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
                                <span className="text-muted-foreground">Orders: </span>
                                <span className="font-medium">{app.totalOrders}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Amount: </span>
                                <span className="font-medium">₹{app.monthlyAmount.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Avg Time: </span>
                                <span className="font-medium">{app.avgDeliveryTime}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Top Restaurant: </span>
                                <span className="font-medium">{app.topRestaurant}</span>
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
                      
                      {/* Features */}
                      <div className="px-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Coffee className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Services:</span>
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
            </TabsContent>

            {/* Grocery Apps */}
            <TabsContent value="grocery" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Grocery & Quick Commerce</CardTitle>
                      <CardDescription>Grocery delivery and quick commerce apps</CardDescription>
                    </div>
                    <Button>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Orders
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {groceryApps.map((app) => (
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
                                <span className="text-muted-foreground">Orders: </span>
                                <span className="font-medium">{app.totalOrders}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Amount: </span>
                                <span className="font-medium">₹{app.monthlyAmount.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Avg Time: </span>
                                <span className="font-medium">{app.avgDeliveryTime}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Top Category: </span>
                                <span className="font-medium">{app.topCategory}</span>
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
                            <span className="text-sm font-medium">Syncing orders...</span>
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
                                Connection error - Unable to sync orders
                              </span>
                            </div>
                            <Button size="sm" variant="outline">
                              Reconnect
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {/* Categories */}
                      <div className="px-4">
                        <div className="flex items-center gap-2 mb-2">
                          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Categories:</span>
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
            </TabsContent>

            {/* Service Apps */}
            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Services & Transportation</CardTitle>
                      <CardDescription>Ride sharing, home services, and other apps</CardDescription>
                    </div>
                    <Button>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Bookings
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {serviceApps.map((app) => (
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
                                <span className="text-muted-foreground">
                                  {app.type === 'Transportation' ? 'Rides' : 'Bookings'}: 
                                </span>
                                <span className="font-medium ml-1">
                                  {app.totalRides || app.totalBookings || 0}
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Amount: </span>
                                <span className="font-medium">₹{app.monthlyAmount.toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Avg Time: </span>
                                <span className="font-medium">{app.avgRideTime || app.avgServiceTime}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">
                                  {app.type === 'Transportation' ? 'Top Route' : 'Top Service'}: 
                                </span>
                                <span className="font-medium ml-1">
                                  {app.topRoute || app.topService}
                                </span>
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
                      
                      {/* Features */}
                      <div className="px-4">
                        <div className="flex items-center gap-2 mb-2">
                          {app.type === 'Transportation' ? (
                            <Car className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Home className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm font-medium">Services:</span>
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
            </TabsContent>
          </Tabs>
        </div>

        {/* Recent Orders */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders & Bookings</CardTitle>
              <CardDescription>Latest orders imported from your delivery apps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <ShoppingBag className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{order.merchant}</h4>
                          <Badge variant="outline" className="text-xs">
                            {order.app}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {order.type} • {order.category}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>{order.date} • {order.time}</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{order.deliveryAddress}</span>
                          </div>
                          <span>{order.items} items</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{order.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold text-lg">₹{order.amount}</div>
                        <div className="text-xs text-muted-foreground">
                          ₹{Math.round(order.amount / order.participants)}/person
                        </div>
                      </div>
                      {getOrderStatusBadge(order.status)}
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

      </div>
    </div>
  )
}
