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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  PlusIcon, 
  UsersIcon, 
  ReceiptIcon,
  CreditCardIcon
} from "lucide-react"

export const metadata: Metadata = {
  title: 'Add Expense - SplitMate',
  description: 'Add and split expenses with your groups.',
}

export default function AddExpensePage() {
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
              
              <div className="px-4 lg:px-6">
                <div className="max-w-2xl mx-auto">
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ReceiptIcon className="h-5 w-5" />
                        Add New Expense
                      </CardTitle>
                      <CardDescription>Split expenses with your friends and groups</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="amount">Amount (₹)</Label>
                          <Input id="amount" placeholder="0.00" type="number" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="food">Food & Dining</SelectItem>
                              <SelectItem value="transportation">Transportation</SelectItem>
                              <SelectItem value="entertainment">Entertainment</SelectItem>
                              <SelectItem value="shopping">Shopping</SelectItem>
                              <SelectItem value="utilities">Utilities</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" placeholder="What was this expense for?" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea id="notes" placeholder="Additional details..." />
                      </div>

                      {/* Group Selection */}
                      <div className="space-y-2">
                        <Label>Split with Group</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="goa-trip">🏖️ Goa Trip 2024</SelectItem>
                            <SelectItem value="roommates">🏠 Roommates</SelectItem>
                            <SelectItem value="office">💼 Office Team</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Payment Method */}
                      <div className="space-y-2">
                        <Label>Paid by</Label>
                        <div className="flex items-center space-x-4">
                          <Button variant="outline" size="sm">
                            <CreditCardIcon className="h-4 w-4 mr-2" />
                            You
                          </Button>
                          <Button variant="ghost" size="sm">
                            Someone else
                          </Button>
                        </div>
                      </div>

                      {/* Split Method */}
                      <div className="space-y-4">
                        <Label>Split Method</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button variant="outline" size="sm">
                            Equal Split
                          </Button>
                          <Button variant="ghost" size="sm">
                            By Amount
                          </Button>
                          <Button variant="ghost" size="sm">
                            By %
                          </Button>
                        </div>
                        
                        {/* Members */}
                        <div className="space-y-2">
                          <Label>Split between</Label>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">You - ₹0.00</Badge>
                            <Badge variant="outline">Rahul - ₹0.00</Badge>
                            <Badge variant="outline">Priya - ₹0.00</Badge>
                            <Button variant="ghost" size="sm">
                              <PlusIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-4">
                        <Button className="flex-1">
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Add Expense
                        </Button>
                        <Button variant="outline">Cancel</Button>
                      </div>

                    </CardContent>
                  </Card>

                  {/* Quick Templates */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Quick Templates</CardTitle>
                      <CardDescription>Common expense scenarios</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <ReceiptIcon className="h-5 w-5" />
                          <span className="text-sm">Restaurant</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <CreditCardIcon className="h-5 w-5" />
                          <span className="text-sm">Transportation</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <UsersIcon className="h-5 w-5" />
                          <span className="text-sm">Group Activity</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col gap-2">
                          <PlusIcon className="h-5 w-5" />
                          <span className="text-sm">Custom</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                </div>
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
