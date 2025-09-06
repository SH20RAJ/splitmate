// Simple tool definitions for SplitMate conversational AI
// These will be used in the API route for backend tool execution

export interface ExpenseParseResult {
  amount: number;
  description: string;
  participants: string[];
  date: string;
  category: string;
  confidence: number;
}

export interface AnalyticsResult {
  answer: string;
  data: {
    totalAmount: number;
    percentageChange: number;
    topExpenses: Array<{
      description: string;
      amount: number;
      date: string;
    }>;
  };
  insights: string[];
  chartData: Array<{
    category: string;
    amount: number;
    color: string;
  }>;
}

export interface CategoryResult {
  category: string;
  confidence: number;
  subcategory: string;
  icon: string;
  color: string;
}

export interface BudgetResult {
  status: 'safe' | 'warning' | 'danger';
  currentSpend: number;
  budgetLimit: number;
  remainingBudget: number;
  alert: string;
  suggestions: string[];
}

// Helper functions for mock implementations
export async function parseExpenseFromText(input: string): Promise<ExpenseParseResult> {
  const amountMatch = input.match(/₹?(\d+)/);
  const amount = amountMatch ? parseInt(amountMatch[1]) : 0;
  
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
  
  const participantMatch = input.match(/with (.+?)(?:\s|$)/);
  const participants = participantMatch ? 
    participantMatch[1].split(/\s+and\s+|\s*,\s*/) : [];
  
  return {
    amount,
    description: input.replace(/₹?\d+/, '').trim(),
    participants,
    date: new Date().toISOString().split('T')[0],
    category,
    confidence: 0.8
  };
}

export async function processAnalyticsQuery(query: string, timeframe?: string, category?: string): Promise<AnalyticsResult> {
  // Mock response incorporating query parameters
  const categoryName = category || "food";
  const timePeriod = timeframe || "month";
  
  return {
    answer: `Based on your ${query.toLowerCase()}, you spent ₹2,450 on ${categoryName} last ${timePeriod}, which is 15% less than the previous ${timePeriod}.`,
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
      `Your ${categoryName} spending has decreased compared to last ${timePeriod}`,
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

export async function categorizeExpense(description: string, amount?: number, merchant?: string): Promise<CategoryResult> {
  // Use parameters in categorization logic
  const lowerDesc = description.toLowerCase();
  
  const categories = {
    "zomato": { name: "Food & Dining", subcategory: "Online Food", icon: "🍕", color: "#FF6B6B", confidence: 0.95 },
    "uber": { name: "Transportation", subcategory: "Ride Share", icon: "🚗", color: "#4ECDC4", confidence: 0.95 },
    "movie": { name: "Entertainment", subcategory: "Movies", icon: "🎬", color: "#45B7D1", confidence: 0.9 },
    "amazon": { name: "Shopping", subcategory: "Online Shopping", icon: "🛒", color: "#FFA07A", confidence: 0.9 },
  };
  
  // Check merchant name if provided
  if (merchant) {
    const merchantLower = merchant.toLowerCase();
    for (const [keyword, category] of Object.entries(categories)) {
      if (merchantLower.includes(keyword)) {
        return {
          category: category.name,
          subcategory: category.subcategory,
          icon: category.icon,
          color: category.color,
          confidence: category.confidence
        };
      }
    }
  }
  
  // Check description
  for (const [keyword, category] of Object.entries(categories)) {
    if (lowerDesc.includes(keyword)) {
      return {
        category: category.name,
        subcategory: category.subcategory,
        icon: category.icon,
        color: category.color,
        confidence: category.confidence
      };
    }
  }
  
  // Adjust confidence based on amount
  let confidence = 0.5;
  if (amount && amount > 1000) confidence += 0.1;
  
  return {
    category: "Other",
    subcategory: "Miscellaneous", 
    icon: "💳",
    color: "#98D8C8",
    confidence
  };
}

export async function checkBudgetStatus(category?: string, amount?: number): Promise<BudgetResult> {
  const budgetName = category || "overall";
  const newAmount = amount || 0;
  
  return {
    status: "warning",
    currentSpend: 4500 + newAmount,
    budgetLimit: 5000,
    remainingBudget: 500 - newAmount,
    alert: `You're approaching your monthly ${budgetName} budget limit`,
    suggestions: [
      "Consider cooking at home more often",
      "Look for lunch deals and discounts", 
      "Set daily spending alerts"
    ]
  };
}

// Helper functions for mock implementations
export async function parseExpenseFromText(input: string): Promise<ExpenseParseResult> {
  const amountMatch = input.match(/₹?(\d+)/);
  const amount = amountMatch ? parseInt(amountMatch[1]) : 0;
  
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
  
  const participantMatch = input.match(/with (.+?)(?:\s|$)/);
  const participants = participantMatch ? 
    participantMatch[1].split(/\s+and\s+|\s*,\s*/) : [];
  
  return {
    amount,
    description: input.replace(/₹?\d+/, '').trim(),
    participants,
    date: new Date().toISOString().split('T')[0],
    category,
    confidence: 0.8
  };
}

export async function processAnalyticsQuery(query: string, timeframe?: string, category?: string): Promise<AnalyticsResult> {
  // Mock response incorporating query parameters
  const categoryName = category || "food";
  const timePeriod = timeframe || "month";
  
  return {
    answer: `Based on your ${query.toLowerCase()}, you spent ₹2,450 on ${categoryName} last ${timePeriod}, which is 15% less than the previous ${timePeriod}.`,
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
      `Your ${categoryName} spending has decreased compared to last ${timePeriod}`,
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

export async function categorizeExpense(description: string, amount?: number, merchant?: string): Promise<CategoryResult> {
  // Use parameters in categorization logic
  const lowerDesc = description.toLowerCase();
  
  const categories = {
    "zomato": { name: "Food & Dining", subcategory: "Online Food", icon: "🍕", color: "#FF6B6B", confidence: 0.95 },
    "uber": { name: "Transportation", subcategory: "Ride Share", icon: "🚗", color: "#4ECDC4", confidence: 0.95 },
    "movie": { name: "Entertainment", subcategory: "Movies", icon: "🎬", color: "#45B7D1", confidence: 0.9 },
    "amazon": { name: "Shopping", subcategory: "Online Shopping", icon: "🛒", color: "#FFA07A", confidence: 0.9 },
  };
  
  // Check merchant name if provided
  if (merchant) {
    const merchantLower = merchant.toLowerCase();
    for (const [keyword, category] of Object.entries(categories)) {
      if (merchantLower.includes(keyword)) {
        return {
          category: category.name,
          subcategory: category.subcategory,
          icon: category.icon,
          color: category.color,
          confidence: category.confidence
        };
      }
    }
  }
  
  // Check description
  for (const [keyword, category] of Object.entries(categories)) {
    if (lowerDesc.includes(keyword)) {
      return {
        category: category.name,
        subcategory: category.subcategory,
        icon: category.icon,
        color: category.color,
        confidence: category.confidence
      };
    }
  }
  
  // Adjust confidence based on amount
  let confidence = 0.5;
  if (amount && amount > 1000) confidence += 0.1;
  
  return {
    category: "Other",
    subcategory: "Miscellaneous", 
    icon: "💳",
    color: "#98D8C8",
    confidence
  };
}

export async function checkBudgetStatus(category?: string, amount?: number): Promise<BudgetResult> {
  const budgetName = category || "overall";
  const newAmount = amount || 0;
  
  return {
    status: "warning",
    currentSpend: 4500 + newAmount,
    budgetLimit: 5000,
    remainingBudget: 500 - newAmount,
    alert: `You're approaching your monthly ${budgetName} budget limit`,
    suggestions: [
      "Consider cooking at home more often",
      "Look for lunch deals and discounts", 
      "Set daily spending alerts"
    ]
  };
}

// Smart Expense Categorization Tool
export const categorizationTool = tool({
  description: "Automatically categorize expenses using AI pattern recognition",
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
});

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
      status: budgetStatus.status,
      currentSpend: budgetStatus.currentSpend,
      budgetLimit: budgetStatus.budgetLimit,
      remainingBudget: budgetStatus.remainingBudget,
      alert: budgetStatus.alert,
      suggestions: budgetStatus.suggestions
    }
  },
});

// Smart Insights Generator Tool
export const insightsGeneratorTool = tool({
  description: "Generate personalized financial insights and recommendations",
  parameters: z.object({
    timeframe: z.enum(["week", "month", "quarter"]).default("month"),
    focus: z.enum(["spending", "saving", "trends", "comparison"]).optional(),
  }),
  execute: async ({ timeframe, focus }) => {
    const insights = await generateSmartInsights(timeframe, focus)
    return {
      insights: insights.insights,
      trends: insights.trends,
      recommendations: insights.recommendations,
      achievements: insights.achievements,
      warnings: insights.warnings
    }
  },
});

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
});

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
});

// Helper functions
async function parseExpenseFromText(input: string) {
  const amountMatch = input.match(/₹?(\d+)/);
  const amount = amountMatch ? parseInt(amountMatch[1]) : 0;
  
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
