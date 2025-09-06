'use client'

export const runtime = 'edge';

import { useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LightbulbIcon,
  FileTextIcon,
  MessageSquareIcon,
  UploadIcon,
  CameraIcon,
  SmartphoneIcon,
  CreditCardIcon,
  ShoppingCartIcon,
  PlaneIcon,
  UtensilsIcon,
  HomeIcon,
  CarIcon,
  HeartIcon,
  GiftIcon,
  MusicIcon,
  GamepadIcon,
  BookIcon,
  DumbbellIcon,
  ScissorsIcon,
  PaletteIcon,
  ZapIcon,
  TargetIcon,
  UsersIcon,
  Copy
} from "lucide-react"
import Link from "next/link"

const promptCategories = [
  {
    title: "Bill Splitting",
    icon: CreditCardIcon,
    prompts: [
      "I paid ₹1200 for dinner at Domino's with 3 friends yesterday. How much does each person owe me? Can you help me track who has paid and send payment reminders?",
      "We went to a restaurant and the bill was ₹2400. I want to split it among 6 people, but 2 people had drinks worth ₹300 each that others didn't have. How should we split this?",
      "I paid for groceries worth ₹1800. Some items are shared (₹1200) and some are just mine (₹600). Help me split only the shared items with my 2 roommates.",
      "Split a movie ticket expense of ₹800 among 4 friends, but one person couldn't make it and we should refund their share."
    ]
  },
  {
    title: "Group Management",
    icon: UsersIcon,
    prompts: [
      "Help me add a group expense of ₹5000 for hotel booking for our 3-day Goa trip with 6 friends. Split it equally and track individual contributions.",
      "Create a new group for our Manali trip with 5 friends and set up expense categories like accommodation, food, activities, and transport.",
      "We're organizing my cousin's wedding with a budget of ₹5 lakhs. Help me track expenses across different categories and split costs among family members.",
      "I need to settle balances with multiple friends from different group expenses. Calculate the optimal way to minimize transactions."
    ]
  },
  {
    title: "Expense Analytics",
    icon: LightbulbIcon,
    prompts: [
      "Show me my spending analysis for this month. Break it down by categories like food, transportation, entertainment, and groceries. Highlight where I'm spending the most.",
      "Analyze our group spending pattern for the last 3 months. Which categories are we spending most on and how can we optimize costs?",
      "Compare my individual expenses vs group expenses this month. Am I spending more on shared activities or personal stuff?",
      "Create a detailed report of all my dining expenses this month, including both solo meals and shared restaurant bills with friends."
    ]
  },
  {
    title: "Smart Processing",
    icon: ZapIcon,
    prompts: [
      "I have a screenshot of my Google Pay payment for ₹850 at Starbucks with 2 friends. Can you extract the details and help me split this bill equally?",
      "Parse this restaurant bill receipt: Total ₹2400, items include 4 main courses (₹400 each), 3 drinks (₹200 each), tax ₹240, tip ₹160. Split among 4 people.",
      "Set up automatic bill splitting for our monthly utility expenses: electricity (₹1800), internet (₹600), gas (₹400). Split among 3 roommates.",
      "Connect my PhonePe account to automatically import UPI transactions and categorize food delivery expenses for group splitting."
    ]
  },
  {
    title: "Budget Planning",
    icon: TargetIcon,
    prompts: [
      "Help me create a monthly budget based on my past spending. Set limits for dining out (₹3000), groceries (₹2000), and entertainment (₹1500). Send alerts when I'm close to limits.",
      "We're planning a 4-day trip to Manali with 5 friends. Help me create expense categories and set a budget of ₹8000 per person.",
      "Set up a savings goal to save ₹50,000 for a Europe trip in 8 months. Track my progress and suggest how much I should save monthly.",
      "Create a wedding budget tracker for my sister's wedding. We have ₹3 lakhs total budget across venue, catering, decorations, and photography."
    ]
  },
  {
    title: "Debt Tracking",
    icon: FileTextIcon,
    prompts: [
      "I lent ₹2000 to my friend Rahul last week and ₹1500 to my sister this month. Help me keep track of these personal loans and set payment reminders.",
      "Track all the money I've lent to friends over the last 6 months. Show me who owes me the most and who has been good at paying back.",
      "I borrowed ₹5000 from my friend for my laptop. Set up a repayment plan to pay it back in 5 monthly installments with reminders.",
      "Set up payment reminders for everyone who owes money from our Goa trip expenses. Send gentle reminders after 3 days if not paid."
    ]
  }
]

const expenseCategories = [
  { name: "Food & Dining", icon: UtensilsIcon, color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200" },
  { name: "Travel", icon: PlaneIcon, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200" },
  { name: "Shopping", icon: ShoppingCartIcon, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200" },
  { name: "Housing", icon: HomeIcon, color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200" },
  { name: "Transportation", icon: CarIcon, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200" },
  { name: "Entertainment", icon: MusicIcon, color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200" },
  { name: "Healthcare", icon: HeartIcon, color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200" },
  { name: "Gifts & Donations", icon: GiftIcon, color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200" },
  { name: "Education", icon: BookIcon, color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-200" },
  { name: "Fitness", icon: DumbbellIcon, color: "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-200" },
  { name: "Personal Care", icon: ScissorsIcon, color: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200" },
  { name: "Art & Hobbies", icon: PaletteIcon, color: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-200" }
]

const uploadOptions = [
  {
    title: "Receipt Photos",
    description: "Upload photos of your receipts for automatic processing",
    icon: CameraIcon,
    examples: ["Restaurant bills", "Grocery receipts", "Fuel invoices"]
  },
  {
    title: "Bank Statements",
    description: "Import expenses directly from your bank statements",
    icon: FileTextIcon,
    examples: ["PDF statements", "CSV exports", "Excel sheets"]
  },
  {
    title: "Payment App Screenshots",
    description: "Process screenshots from payment apps like PhonePe, Paytm, etc.",
    icon: SmartphoneIcon,
    examples: ["PhonePe transactions", "Paytm payments", "Google Pay screenshots"]
  },
  {
    title: "Utility Bills",
    description: "Automatically extract details from utility bills",
    icon: HomeIcon,
    examples: ["Electricity bills", "Water bills", "Internet bills"]
  }
]

export default function ChatSuggestionsPage() {
  const [copiedPrompt, setCopiedPrompt] = useState('')

  const copyPrompt = async (prompt: string) => {
    await navigator.clipboard.writeText(prompt)
    setCopiedPrompt(prompt)
    setTimeout(() => setCopiedPrompt(''), 2000)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:p-8">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          
          {/* Header */}
          <div className="px-4 lg:px-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Chat Suggestions</h1>
              <p className="text-muted-foreground text-sm">Copy any prompt below and paste it in the chat</p>
            </div>
          </div>

          {/* Upload Options */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UploadIcon className="h-5 w-5" />
                  Smart Bill Processing
                </CardTitle>
                <CardDescription>
                  Upload your bills or screenshots to automatically process expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {uploadOptions.map((option, index) => (
                    <Card key={index} className="hover:bg-accent/50 transition-colors cursor-pointer">
                      <CardHeader>
                        <option.icon className="h-8 w-8 text-primary mb-2" />
                        <CardTitle className="text-lg">{option.title}</CardTitle>
                        <CardDescription>{option.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {option.examples.map((example, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prompt Categories */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ZapIcon className="h-5 w-5" />
                  Quick Prompts
                </CardTitle>
                <CardDescription>
                  Try these example prompts to get started with the AI assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {promptCategories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <div key={index} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">{category.title}</h3>
                        </div>
                        <div className="space-y-2">
                          {category.prompts.map((prompt, promptIndex) => (
                            <Card 
                              key={promptIndex} 
                              className="hover:bg-accent/50 transition-colors group"
                            >
                              <CardContent className="p-4">
                                <p className="text-sm mb-3 leading-relaxed">
                                  &ldquo;{prompt}&rdquo;
                                </p>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => copyPrompt(prompt)}
                                    disabled={copiedPrompt === prompt}
                                  >
                                    {copiedPrompt === prompt ? (
                                      <>✓ Copied</>
                                    ) : (
                                      <><Copy className="h-3 w-3 mr-1" />Copy</>
                                    )}
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expense Categories */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCartIcon className="h-5 w-5" />
                  Expense Categories
                </CardTitle>
                <CardDescription>
                  Common categories for organizing your expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {expenseCategories.map((category, index) => {
                    const IconComponent = category.icon;
                    return (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className={`${category.color} flex items-center gap-1 px-3 py-2 text-sm`}
                      >
                        <IconComponent className="h-4 w-4" />
                        {category.name}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tips */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LightbulbIcon className="h-5 w-5" />
                  Pro Tips
                </CardTitle>
                <CardDescription>
                  Get the most out of our AI assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <MessageSquareIcon className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            Be Specific
                          </h4>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            The more details you provide, the better the AI can assist you.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <CameraIcon className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                            Use Images
                          </h4>
                          <p className="text-sm text-green-700 dark:text-green-300">
                            Upload receipts and bills for automatic expense processing.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-purple-600 mt-0.5">
                          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 8.16c-.416 1.896-2.208 8.944-3.12 11.872-.384 1.248-1.44 1.464-2.32.912L8.928 18.48l-1.248-2.16 4.896-3.072c.672-.432.432-1.104-.336-.672l-6.048 3.744-2.16-.816c-.48-.144-.48-.48.096-.72l10.08-3.936c.432-.144.816.096.672.552z"/>
                        </svg>
                        <div>
                          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                            Try Telegram Bot
                          </h4>
                          <p className="text-sm text-purple-700 dark:text-purple-300">
                            Use our Telegram bot for quick expense splitting on the go!
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
