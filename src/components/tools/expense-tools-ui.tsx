'use client'

import { makeAssistantToolUI } from "@assistant-ui/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  UsersIcon,
  DollarSignIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ShareIcon
} from "lucide-react";
import Image from 'next/image';

// Split Expense Tool UI
export const SplitExpenseToolUI = makeAssistantToolUI<
  {
    totalAmount: number;
    paidBy: string;
    participants: string[];
    description: string;
  },
  string
>({
  toolName: "splitExpense",
  render: ({ args, result, status }) => {
    if (status.type === "running") {
      return (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Splitting Expense...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span className="text-sm">Calculating split for {args.description}</span>
              </div>
              <p className="text-sm text-muted-foreground">Amount: ₹{args.totalAmount}</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (status.type === "incomplete") {
      return (
        <Card className="max-w-md border-red-200">
          <CardContent className="pt-6">
            <div className="text-red-600 text-sm">
              Failed to split expense: {args.description}
            </div>
          </CardContent>
        </Card>
      );
    }

    const shareAmount = args.totalAmount / args.participants.length;

    // Generate UPI links for each participant
    const generateUPILink = (participant: string, amount: number) => {
      const upiId = "splitmate@paytm"; // This would come from user settings in a real implementation
      const upiLink = `upi://pay?pa=${upiId}&pn=SplitMate&am=${amount}&cu=INR&tn=${encodeURIComponent(`Payment to ${args.paidBy} for ${args.description || 'shared expense'}`)}`;
      return upiLink;
    };

    // Handle share action
    const handleShare = (participant: string, amount: number) => {
      const upiLink = generateUPILink(participant, amount);

      // Try to use Web Share API if available
      if (navigator.share) {
        navigator.share({
          title: 'SplitMate Payment Request',
          text: `Hi ${participant}! You owe ₹${amount.toFixed(2)} to ${args.paidBy} for ${args.description || 'our shared expense'}. Pay via UPI: ${upiLink}`
        }).catch((error) => {
          console.error('Error sharing:', error);
          // Fallback to opening UPI link directly
          window.open(upiLink, '_blank');
        });
      } else {
        // Fallback: open UPI link directly
        window.open(upiLink, '_blank');
      }
    };

    // Handle WhatsApp share
    const handleWhatsAppShare = (participant: string, amount: number) => {
      const upiLink = generateUPILink(participant, amount);
      const message = `Hi ${participant}! You owe ₹${amount.toFixed(2)} to ${args.paidBy} for ${args.description || 'our shared expense'}.\n\nPay via UPI: ${upiLink}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    };

    // Handle Telegram share
    const handleTelegramShare = (participant: string, amount: number) => {
      const upiLink = generateUPILink(participant, amount);
      const message = `Hi ${participant}! You owe ₹${amount.toFixed(2)} to ${args.paidBy} for ${args.description || 'our shared expense'}.\n\nPay via UPI: ${upiLink}`;
      const telegramUrl = `https://t.me/share/url?text=${encodeURIComponent(message)}`;
      window.open(telegramUrl, '_blank');
    };

    return (
      <Card className="max-w-md border-green-200 bg-tgreenr-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-greenr-700">
              <CheckCircleIcon className="h-5 w-5" />
              Split Complete!
            </CardTitle>
            <Badge variant="secondary" className="bg-tgreenr-100 text-greenr-700">
              ₹{args.totalAmount}
            </Badge>
          </div>
          <CardDescription>{args.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Paid by info */}
          <div className="flex items-center gap-3 p-3 bg-tblue-50 rounded-lg">
            <DollarSignIcon className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Paid by {args.paidBy}</p>
              <p className="text-xs text-muted-foreground">Total: ₹{args.totalAmount}</p>
            </div>
          </div>

          {/* Split breakdown */}
          <div className="space-y-2">
            <p className="text-sm font-medium flex items-center gap-2">
              <ArrowRightIcon className="h-3 w-3" />
              Each person owes: ₹{shareAmount.toFixed(2)}
            </p>

            <div className="grid grid-cols-1 gap-2">
              {args.participants.filter(p => p !== args.paidBy).map((participant, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-twhite rounded border">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">{participant.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{participant}</span>
                  <span className="ml-auto text-sm font-medium">₹{shareAmount.toFixed(2)}</span>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => handleShare(participant, shareAmount)}
                      className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600"
                      title="Share payment request"
                    >
                      <ShareIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleWhatsAppShare(participant, shareAmount)}
                      className="p-1 rounded-full bg-green-10 hover:bg-green-200 text-green-600"
                      title="Share via WhatsApp"
                    >
                      <Image
                        src="https://www.svgrepo.com/show/475692/whatsapp-color.svg"
                        alt="WhatsApp"
                        width={16}
                        height={16}
                      />
                    </button>
                    <button
                      onClick={() => handleTelegramShare(participant, shareAmount)}
                      className="p-1 rounded-full bg-blue-40 hover:bg-blue-500 text-white"
                      title="Share via Telegram"
                    >
                      <Image
                        src="https://www.svgrepo.com/show/354443/telegram.svg"
                        alt="Telegram"
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result text */}
          {result && (
            <div className="text-xs text-muted-foreground bg-tgray-50 p-2 rounded">
              {result}
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
});

// Add Expense Tool UI
export const AddExpenseToolUI = makeAssistantToolUI<
  { amount: number; description: string; category?: string },
  { amount: number; description: string; category: string }
>({
  toolName: "addExpense",
  render: ({ args, result, status }) => {
    if (status.type === "running") {
      return (
        <div className="flex items-center gap-2 text-sm">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span>Adding expense: ₹{args.amount} for {args.description}</span>
        </div>
      );
    }

    if (!result) return null;

    return (
      <Card className="max-w-sm border-green-200 bg-tgreen-50/50">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
            Expense Added
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Amount:</span>
            <span className="font-medium">₹{result.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Description:</span>
            <span className="font-medium">{result.description}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Category:</span>
            <Badge variant="outline">{result.category}</Badge>
          </div>
        </CardContent>
      </Card>
    );
  },
});

// Analyze Expenses Tool UI  
export const AnalyzeExpensesToolUI = makeAssistantToolUI<
  { query: string; timeframe?: string; category?: string },
  { message: string; data?: any }
>({
  toolName: "analyzeExpenses",
  render: ({ args, result, status }) => {
    if (status.type === "running") {
      return (
        <div className="flex items-center gap-2 text-sm">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span>Analyzing your {args.timeframe || 'recent'} expenses...</span>
        </div>
      );
    }

    if (!result) return null;

    return (
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-base">Analytics Result</CardTitle>
          <CardDescription>{args.query}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{result.message}</p>
          {result.data && (
            <pre className="mt-2 text-xs bg-tgray-50 p-2 rounded overflow-auto">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          )}
        </CardContent>
      </Card>
    );
  },
});

// Search Expenses Tool UI
export const SearchExpensesToolUI = makeAssistantToolUI<
  { query: string },
  string
>({
  toolName: "searchExpenses",
  render: ({ args, result, status }) => {
    if (status.type === "running") {
      return (
        <div className="flex items-center gap-2 text-sm">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span>Searching expenses: &quot;{args.query}&quot;</span>
        </div>
      );
    }

    if (!result) {
      return (
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">No expenses found for &quot;{args.query}&quot;</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-base">Search Results</CardTitle>
          <CardDescription>Results for &quot;{args.query}&quot;</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm whitespace-pre-line">{result}</div>
        </CardContent>
      </Card>
    );
  },
});

// Categorize Expense Tool UI
export const CategorizeExpenseToolUI = makeAssistantToolUI<
  { description: string; amount?: number },
  string
>({
  toolName: "categorizeExpense",
  render: ({ args, result, status }) => {
    if (status.type === "running") {
      return (
        <div className="flex items-center gap-2 text-sm">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span>Categorizing expense: &quot;{args.description}&quot;</span>
        </div>
      );
    }

    if (!result) return null;

    return (
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-base">Expense Categorized</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">{result}</div>
        </CardContent>
      </Card>
    );
  },
});

// Check Budget Tool UI
export const CheckBudgetToolUI = makeAssistantToolUI<
  { category?: string; amount?: number },
  string
>({
  toolName: "checkBudget",
  render: ({ args, result, status }) => {
    if (status.type === "running") {
      return (
        <div className="flex items-center gap-2 text-sm">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span>Checking budget status...</span>
        </div>
      );
    }

    if (!result) return null;

    return (
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-base">Budget Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm whitespace-pre-line">{result}</div>
        </CardContent>
      </Card>
    );
  },
});

// Get Top Expenses Tool UI
export const GetTopExpensesToolUI = makeAssistantToolUI<
  { count?: number; period?: string },
  string
>({
  toolName: "getTopExpenses",
  render: ({ args, result, status }) => {
    if (status.type === "running") {
      return (
        <div className="flex items-center gap-2 text-sm">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span>Getting top {args.count || 5} expenses...</span>
        </div>
      );
    }

    if (!result) return null;

    return (
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-base">Top Expenses</CardTitle>
          <CardDescription>{args.period || 'Recent'} expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm whitespace-pre-line">{result}</div>
        </CardContent>
      </Card>
    );
  },
});
