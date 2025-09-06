import { makeAssistantTool, tool } from "@assistant-ui/react"
import { z } from "zod"

/* eslint-disable @typescript-eslint/no-unused-vars */

// Natural Language Expense Parser Tool
export const expenseParserTool = tool({
  description: "Parse natural language input to extract expense details like amount, description, participants, and date",
  parameters: z.object({
    input: z.string().describe("Natural language input like 'I spent ₹500 on dinner with Rahul yesterday'"),
  }),
  execute: async ({ input }) => {
    // Parse natural language input
    const result = await parseExpenseFromText(input)
    return {
      amount: result.amount,
      description: result.description,
      participants: result.participants,
      date: result.date,
      category: result.category,
      confidence: result.confidence
    }
  },
})

// Expense Analytics Query Tool
export const expenseAnalyticsTool = tool({
  description: "Answer questions about spending patterns, categories, and analytics",
  parameters: z.object({
    query: z.string().describe("Analytics question like 'How much did I spend on food last month?' or 'Show my top 3 expenses this week'"),
    timeframe: z.enum(["day", "week", "month", "year"]).optional(),
    category: z.string().optional(),
  }),
  execute: async ({ query, timeframe, category }) => {
    // Process analytics query
    const result = await processAnalyticsQuery(query, timeframe, category)
    return {
      answer: result.answer,
      data: result.data,
      insights: result.insights,
      chartData: result.chartData
    }
  },
})

// Smart Expense Categorization Tool
export const categorizationTool = tool({
  description: "Automatically categorize expenses based on description and context",
  parameters: z.object({
    description: z.string().describe("Expense description like 'Zomato order' or 'Uber ride'"),
    amount: z.number().optional(),
    merchant: z.string().optional(),
  }),
  execute: async ({ description, amount, merchant }) => {
    const category = await categorizeExpense(description, amount, merchant)
    return {
      category: category.name,
      confidence: category.confidence,
      subcategory: category.subcategory,
      icon: category.icon,
      color: category.color
    }
  },
})

// Budget Alert Tool
export const budgetAlertTool = tool({
  description: "Check budget status and provide alerts when approaching limits",
  parameters: z.object({
    category: z.string().optional(),
    amount: z.number().optional(),
  }),
  execute: async ({ category, amount }) => {
    const budgetStatus = await checkBudgetStatus(category, amount)
    return {
      status: budgetStatus.status, // "safe", "warning", "exceeded"
      currentSpend: budgetStatus.currentSpend,
      budgetLimit: budgetStatus.budgetLimit,
      remainingBudget: budgetStatus.remainingBudget,
      alert: budgetStatus.alert,
      suggestions: budgetStatus.suggestions
    }
  },
})

// Smart Insights Generator Tool
export const insightsGeneratorTool = tool({
  description: "Generate personalized financial insights and recommendations",
  parameters: z.object({
    timeframe: z.enum(["week", "month", "quarter"]).default("month"),
    focus: z.enum(["spending", "saving", "trends", "comparison"]).optional(),
  }),
  execute: async ({ timeframe, focus }) => {
    const insights = await generateSmartInsights(timeframe, focus ?? "")
    return {
      insights: insights.insights,
      trends: insights.trends,
      recommendations: insights.recommendations,
      achievements: insights.achievements,
      warnings: insights.warnings
    }
  },
})

// Group Expense Settlement Tool
export const settlementTool = tool({
  description: "Calculate optimal settlement plan for group expenses",
  parameters: z.object({
    groupId: z.string().optional(),
    participants: z.array(z.string()).optional(),
  }),
  execute: async ({ groupId, participants }) => {
    const settlement = await calculateOptimalSettlement(groupId, participants)
    return {
      settlements: settlement.settlements,
      totalTransactions: settlement.totalTransactions,
      simplifiedPlan: settlement.simplifiedPlan,
      paymentLinks: settlement.paymentLinks
    }
  },
})

// Expense Search Tool
export const expenseSearchTool = tool({
  description: "Search through expense history with filters",
  parameters: z.object({
    query: z.string().describe("Search query for expenses"),
    dateRange: z.object({
      start: z.string().optional(),
      end: z.string().optional(),
    }).optional(),
    category: z.string().optional(),
    minAmount: z.number().optional(),
    maxAmount: z.number().optional(),
    participant: z.string().optional(),
  }),
  execute: async ({ query, dateRange, category, minAmount, maxAmount, participant }) => {
    const results = await searchExpenses({
      query,
      dateRange,
      category,
      minAmount,
      maxAmount,
      participant
    })
    return {
      expenses: results.expenses,
      totalFound: results.totalFound,
      totalAmount: results.totalAmount,
      categories: results.categories,
      summary: results.summary
    }
  },
})

// Helper functions (would be implemented with actual logic)
async function parseExpenseFromText(input: string) {
  // NLP parsing logic
  // Extract: amount (₹500), description (dinner), participants (Rahul), time (yesterday)
  
  // Mock implementation
  const amountMatch = input.match(/₹?(\d+)/);
  const amount = amountMatch ? parseInt(amountMatch[1]) : 0;
  
  // Simple keyword detection for categories
  const categories = {
    food: ["dinner", "lunch", "breakfast", "food", "restaurant", "zomato", "swiggy"],
    travel: ["uber", "ola", "taxi", "bus", "train", "flight", "petrol"],
    entertainment: ["movie", "game", "netflix", "spotify", "concert"],
    shopping: ["shopping", "clothes", "amazon", "flipkart"],
  };
  
  let category = "other";
  for (const [cat, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => input.toLowerCase().includes(keyword))) {
      category = cat;
      break;
    }
  }
  
  // Extract participants (simple implementation)
  const participantMatch = input.match(/with (.+?)(?:\s|$)/);
  const participants = participantMatch ? 
    participantMatch[1].split(/\s+and\s+|\s*,\s*/) : [];
  
  return {
    amount,
    description: input.replace(/₹?\d+/, '').trim(),
    participants,
    date: new Date().toISOString(),
    category,
    confidence: 0.8
  };
}

async function processAnalyticsQuery(_query: string, _timeframe?: string, _category?: string) {
  // Mock analytics processing
  return {
    answer: `Based on your spending patterns, here's what I found: You spent ₹2,450 on food last month, which is 15% less than the previous month.`,
    data: {
      totalAmount: 2450,
      percentageChange: -15,
      topExpenses: [
        { description: "Dinner at Pizza Hut", amount: 850, date: "2025-08-28" },
        { description: "Lunch with colleagues", amount: 650, date: "2025-08-25" },
        { description: "Coffee meetup", amount: 450, date: "2025-08-22" },
      ]
    },
    insights: [
      "Your food spending has decreased compared to last month",
      "Weekend spending accounts for 40% of food expenses",
      "Group dining is your largest food expense category"
    ],
    chartData: [
      { category: "Food", amount: 2450, color: "#FF6B6B" },
      { category: "Travel", amount: 1800, color: "#4ECDC4" },
      { category: "Entertainment", amount: 950, color: "#45B7D1" },
    ]
  };
}

async function categorizeExpense(description: string, _amount?: number, _merchant?: string) {
  // AI-powered categorization logic
  const categories = {
    "zomato": { name: "Food & Dining", subcategory: "Online Food", icon: "🍕", color: "#FF6B6B", confidence: 0.95 },
    "uber": { name: "Transportation", subcategory: "Ride Share", icon: "🚗", color: "#4ECDC4", confidence: 0.95 },
    "movie": { name: "Entertainment", subcategory: "Movies", icon: "🎬", color: "#45B7D1", confidence: 0.9 },
    "amazon": { name: "Shopping", subcategory: "Online Shopping", icon: "🛒", color: "#FFA07A", confidence: 0.9 },
  };
  
  const lowerDesc = description.toLowerCase();
  for (const [keyword, category] of Object.entries(categories)) {
    if (lowerDesc.includes(keyword)) {
      return category;
    }
  }
  
  return {
    name: "Other",
    subcategory: "Miscellaneous",
    icon: "💳",
    color: "#98D8C8",
    confidence: 0.5
  };
}

async function checkBudgetStatus(_category?: string, _amount?: number) {
  // Mock budget checking
  return {
    status: "warning" as const,
    currentSpend: 4500,
    budgetLimit: 5000,
    remainingBudget: 500,
    alert: "You're approaching your monthly food budget limit",
    suggestions: [
      "Consider cooking at home more often",
      "Look for lunch deals and discounts",
      "Set daily spending alerts"
    ]
  };
}

async function generateSmartInsights(_timeframe: string, _focus?: string) {
  // AI-generated insights
  return {
    insights: [
      "Your weekend spending is 40% higher than weekdays",
      "Food expenses peaked on Fridays, suggesting lunch meetings",
      "You've saved ₹800 this month by using public transport"
    ],
    trends: [
      { metric: "Total Spending", change: -12, direction: "down" },
      { metric: "Food & Dining", change: 8, direction: "up" },
      { metric: "Transportation", change: -25, direction: "down" }
    ],
    recommendations: [
      "Set up a weekly food budget of ₹1,200",
      "Consider monthly transport passes for additional savings",
      "Track entertainment expenses - they've increased 20%"
    ],
    achievements: [
      "🎯 Stayed under budget for 3 weeks straight!",
      "💰 Saved ₹500 compared to last month",
      "📈 Improved spending awareness score: 85%"
    ],
    warnings: [
      "Entertainment spending is trending upward",
      "Weekend expenses need attention"
    ]
  };
}

async function calculateOptimalSettlement(_groupId?: string, _participants?: string[]) {
  // Settlement calculation logic
  return {
    settlements: [
      { from: "Rahul", to: "You", amount: 450 },
      { from: "Priya", to: "Meera", amount: 320 },
    ],
    totalTransactions: 2,
    simplifiedPlan: "Rahul pays you ₹450, Priya pays Meera ₹320",
    paymentLinks: [
      { name: "Rahul", upiLink: "upi://pay?pa=your-upi@id&pn=Settlement&am=450" },
      { name: "Priya", upiLink: "upi://pay?pa=meera-upi@id&pn=Settlement&am=320" },
    ]
  };
}

interface SearchFilters {
  query: string;
  dateRange?: {
    start?: string;
    end?: string;
  };
  category?: string;
  minAmount?: number;
  maxAmount?: number;
  participant?: string;
}

async function searchExpenses(_filters: SearchFilters) {
  // Expense search logic
  return {
    expenses: [
      { id: "1", description: "Dinner at restaurant", amount: 850, date: "2025-09-05", category: "Food" },
      { id: "2", description: "Coffee with friends", amount: 300, date: "2025-09-04", category: "Food" },
    ],
    totalFound: 2,
    totalAmount: 1150,
    categories: ["Food"],
    summary: "Found 2 expenses totaling ₹1,150 in the Food category"
  };
}

// Export tool components for registration
export const ExpenseParserTool = makeAssistantTool({
  ...expenseParserTool,
  toolName: "parseExpense",
})

export const ExpenseAnalyticsTool = makeAssistantTool({
  ...expenseAnalyticsTool,
  toolName: "analyzeExpenses",
})

export const CategorizationTool = makeAssistantTool({
  ...categorizationTool,
  toolName: "categorizeExpense",
})

export const BudgetAlertTool = makeAssistantTool({
  ...budgetAlertTool,
  toolName: "checkBudget",
})

export const InsightsGeneratorTool = makeAssistantTool({
  ...insightsGeneratorTool,
  toolName: "generateInsights",
})

export const SettlementTool = makeAssistantTool({
  ...settlementTool,
  toolName: "calculateSettlement",
})

export const ExpenseSearchTool = makeAssistantTool({
  ...expenseSearchTool,
  toolName: "searchExpenses",
})
