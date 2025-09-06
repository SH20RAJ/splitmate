import type { Metadata } from 'next'
import { SplitMateSidebar } from "@/components/splitmate-sidebar"
import { SiteHeader } from "@/components/site-header"
import { BottomNav } from "@/components/bottom-nav"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { 
  PlusIcon, 
  UsersIcon, 
  CalendarIcon,
  TrendingUpIcon,
  MoreHorizontalIcon,
  MapPinIcon
} from "lucide-react"

export const metadata: Metadata = {
  title: 'Groups - SplitMate',
  description: 'Manage your expense groups and settlements.',
}

const groups = [
  {
    id: '1',
    name: '🏖️ Goa Trip 2024',
    description: 'Beach vacation with college friends',
    members: 6,
    totalExpenses: 45200,
    yourShare: 7533,
    settled: 35200,
    avatars: ['JD', 'RS', 'PK', 'MS', 'AK'],
    lastActivity: '2 hours ago',
    location: 'Goa, India'
  },
  {
    id: '2',
    name: '🏠 Roommates',
    description: 'Monthly house expenses',
    members: 4,
    totalExpenses: 12800,
    yourShare: 3200,
    settled: 9600,
    avatars: ['RK', 'PG', 'SK'],
    lastActivity: '1 day ago',
    location: 'Home'
  },
  {
    id: '3',
    name: '💼 Office Team',
    description: 'Team lunches and outings',
    members: 8,
    totalExpenses: 8400,
    yourShare: 1050,
    settled: 7350,
    avatars: ['AM', 'VK', 'SN', 'RJ', 'KP'],
    lastActivity: '3 days ago',
    location: 'Office'
  }
]

export default function GroupsPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <SplitMateSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              
              {/* Header */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Groups</h1>
                    <p className="text-muted-foreground">Manage your expense groups and settlements</p>
                  </div>
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create Group
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Groups</CardTitle>
                      <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">
                        +1 from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                      <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹66,400</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Your Share</CardTitle>
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹11,783</div>
                      <p className="text-xs text-muted-foreground">
                        Across all groups
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Groups List */}
              <div className="px-4 lg:px-6">
                <div className="space-y-4">
                  {groups.map((group) => (
                    <Card key={group.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{group.name}</CardTitle>
                            <CardDescription className="flex items-center gap-2">
                              <MapPinIcon className="h-3 w-3" />
                              {group.location} • {group.members} members • {group.lastActivity}
                            </CardDescription>
                            <p className="text-sm text-muted-foreground">{group.description}</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        
                        {/* Members */}
                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-2">
                            {group.avatars.slice(0, 5).map((avatar, index) => (
                              <Avatar key={index} className="h-8 w-8 border-2 border-background">
                                <AvatarFallback className="text-xs">{avatar}</AvatarFallback>
                              </Avatar>
                            ))}
                            {group.members > 5 && (
                              <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                                <span className="text-xs text-muted-foreground">+{group.members - 5}</span>
                              </div>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">{group.members} members</span>
                        </div>

                        {/* Expense Info */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Total Expenses</p>
                            <p className="font-medium">₹{group.totalExpenses.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Your Share</p>
                            <p className="font-medium">₹{group.yourShare.toLocaleString()}</p>
                          </div>
                          <div className="md:col-span-1 col-span-2">
                            <p className="text-muted-foreground">Settlement Progress</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={(group.settled / group.totalExpenses) * 100} className="flex-1" />
                              <span className="text-xs font-medium">{Math.round((group.settled / group.totalExpenses) * 100)}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          <Button size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Add Expense</Button>
                          <Button variant="outline" size="sm">Settle Up</Button>
                        </div>

                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Create Group CTA */}
              <div className="px-4 lg:px-6">
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <UsersIcon className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Create a New Group</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Start splitting expenses with friends, family, or colleagues
                    </p>
                    <Button>
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Create Group
                    </Button>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
      
      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </SidebarProvider>
  )
}
