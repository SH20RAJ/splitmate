import { makeAssistantToolUI } from "@assistant-ui/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calculator,
  Send,
  Copy,
  CheckCircle,
  IndianRupee,
  Users,
  Clock
} from "lucide-react"
import { useState } from "react"
import React from "react"

// Types for the expense splitting tool
type ExpenseSplitArgs = {
  totalAmount?: number
  paidBy?: string
  participants?: string[]
  description?: string
  splitType?: "equal" | "custom"
  customSplits?: Record<string, number>
}

type ExpenseSplitResult = {
  splitCalculation: {
    totalAmount: number
    perPersonAmount: number
    participants: Array<{
      name: string
      owesAmount: number
      isPaidBy: boolean
    }>
  }
  paymentRequests: Array<{
    name: string
    amount: number
    upiLink: string
    whatsappMessage: string
  }>
}

// Tool status type based on assistant-ui types
type ToolStatus = {
  type: "running" | "complete" | "incomplete" | "error" | "requires-action"
  reason?: string
  error?: unknown
}

// Separate component to handle state - memoized to prevent unnecessary re-renders
const ExpenseSplitUI = React.memo(({ args, result, status }: {
  args: ExpenseSplitArgs
  result?: ExpenseSplitResult
  status: ToolStatus
}) => {
  const [notificationsSent, setNotificationsSent] = useState<string[]>([])

  const handleSendUPIRequest = (participant: { name: string; amount: number; upiLink: string }) => {
    // Simulate sending UPI request
    window.open(participant.upiLink, '_blank')
    setNotificationsSent(prev => [...prev, participant.name])
  }

  const handleSendWhatsApp = (participant: { name: string; whatsappMessage: string }) => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(participant.whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
    setNotificationsSent(prev => [...prev, participant.name])
  }

  const handleCopyUPI = (upiLink: string) => {
    navigator.clipboard.writeText(upiLink)
  }

  if (status.type === "running") {
    return (
      <Card className="w-full max-w-7xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 animate-spin" />
            <CardTitle>Calculating Split...</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Amount:</span>
              <span className="font-medium">₹{args.totalAmount || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Participants:</span>
              <span className="font-medium">{args.participants?.length || 0} people</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Paid by:</span>
              <span className="font-medium">{args.paidBy || 'Loading...'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (status.type === "incomplete") {
    return (
      <Card className="w-full max-w-7xl border-red-200">
        <CardContent className="pt-6">
          <div className="text-center text-red-600">
            <p>Failed to calculate expense split</p>
            <p className="text-sm mt-1">Please try again with valid amounts</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!result) return null

  const { splitCalculation, paymentRequests } = result

  return (
    <div className="w-full max-w-4xl2 space-y-4">
      {/* Split Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-green-600" />
            Expense Split Calculated
          </CardTitle>
          {args.description && (
            <p className="text-sm text-muted-foreground">{args.description}</p>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹{splitCalculation.totalAmount}</div>
              <div className="text-sm text-muted-foreground">Total Amount</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">₹{splitCalculation.perPersonAmount}</div>
              <div className="text-sm text-muted-foreground">Per Person</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{splitCalculation.participants.length}</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{splitCalculation.participants.filter(p => !p.isPaidBy).length}</div>
              <div className="text-sm text-muted-foreground">Owes Money</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participants List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Split Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {splitCalculation.participants.map((participant, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg border ${participant.isPaidBy ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {participant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{participant.name}</div>
                    {participant.isPaidBy && (
                      <Badge variant="secondary" className="text-xs">
                        Paid the bill
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {participant.isPaidBy ? (
                    <div className="text-green-600 font-medium">
                      Will receive ₹{splitCalculation.totalAmount - splitCalculation.perPersonAmount}
                    </div>
                  ) : (
                    <div className="text-red-600 font-medium">
                      Owes ₹{participant.owesAmount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Actions */}
      {paymentRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send Payment Requests
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Instantly notify friends and request payments
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentRequests.map((request, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {request.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{request.name}</div>
                        <div className="text-lg font-bold text-red-600 flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" />
                          {request.amount}
                        </div>
                      </div>
                    </div>
                    {notificationsSent.includes(request.name) && (
                      <Badge variant="secondary" className="text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Sent
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      onClick={() => handleSendUPIRequest(request)}
                      disabled={notificationsSent.includes(request.name)}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <IndianRupee className="h-4 w-4 mr-1" />
                      Send UPI Request
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendWhatsApp(request)}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyUPI(request.upiLink)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy UPI
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <div className="text-sm text-muted-foreground">What&apos;s next?</div>
            <div className="flex gap-2 justify-center flex-wrap">
              <Button variant="outline" size="sm" onClick={() => alert("Set reminder functionality to be implemented")}>
                <Clock className="h-4 w-4 mr-1" />
                Set Reminder
              </Button>
              <Button variant="outline" size="sm" onClick={() => alert("Add to group functionality to be implemented")}>
                <Users className="h-4 w-4 mr-1" />
                Add to Group
              </Button>
              <Button variant="outline" size="sm" onClick={() => alert("Add another expense functionality to be implemented")}>
                <Calculator className="h-4 w-4 mr-1" />
                Add Another Expense
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

// Add display name for React DevTools
ExpenseSplitUI.displayName = 'ExpenseSplitUI'

// Create the tool UI component once, outside of any render cycle
export const ExpenseSplitToolUI = makeAssistantToolUI<ExpenseSplitArgs, ExpenseSplitResult>({
  toolName: "splitExpense",
  render: ({ args, result, status }) => {
    return <ExpenseSplitUI args={args} result={result} status={status} />
  }
})