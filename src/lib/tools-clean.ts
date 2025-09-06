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

export interface SearchFilters {
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
  participants?: string[];
}

// Helper functions for mock implementations
export async function parseExpenseFromText(input: string): Promise<ExpenseParseResult> {
  // Mock implementation for expense parsing
  const amount = parseFloat(input.match(/(\d+(?:\.\d+)?)/)?.[0] || '100');
  const description = input.replace(/₹?\d+(?:\.\d+)?/g, '').trim() || 'Expense';
  
  return {
    amount,
    description,
    participants: ['You', 'Friend 1'],
    date: new Date().toISOString().split('T')[0],
    category: 'Food & Dining',
    confidence: 0.85
  };
}

export async function processAnalyticsQuery(query: string, timeframe?: string, category?: string): Promise<AnalyticsResult> {
  // Use parameters for context
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

// Additional utility functions for tool integration
export async function splitExpense(expense: ExpenseParseResult, method: 'equal' | 'custom'): Promise<any> {
  const { amount, participants } = expense;
  
  if (method === 'equal') {
    const share = amount / participants.length;
    return participants.map(person => ({
      name: person,
      amount: share,
      paid: false
    }));
  }
  
  return {
    totalAmount: amount,
    participants: participants.map(person => ({
      name: person,
      amount: 0,
      customShare: true
    }))
  };
}

export async function generateSmartInsights(timeframe: string, focus?: string): Promise<any> {
  const period = timeframe || "month";
  const focusArea = focus || "spending";
  
  return {
    insights: [
      `Your weekend ${focusArea} is 40% higher than weekdays this ${period}`,
      `Food expenses peaked on Fridays, suggesting lunch meetings this ${period}`,
      `You've saved ₹800 this ${period} by using public transport`
    ],
    trends: [
      { metric: "Total Spending", change: -12, direction: "down" },
      { metric: "Food & Dining", change: 8, direction: "up" },
      { metric: "Transportation", change: -25, direction: "down" }
    ],
    recommendations: [
      `Set up a weekly food budget of ₹1,200 for this ${period}`,
      "Consider monthly transport passes for additional savings",
      "Track entertainment expenses - they've increased 20%"
    ]
  };
}

export async function calculateOptimalSettlement(groupId?: string, participants?: string[]): Promise<any> {
  const members = participants || ["Alice", "Bob", "Charlie"];
  const group = groupId || "Weekend Trip";
  
  return {
    groupName: group,
    settlements: [
      { from: "Alice", to: "Bob", amount: 450, description: "Restaurant bills" },
      { from: "Charlie", to: "Bob", amount: 320, description: "Transport & snacks" },
      { from: "Alice", to: "Charlie", amount: 180, description: "Movie tickets" }
    ],
    totalSettled: 950,
    participants: members,
    summary: `Optimal settlement calculated for ${group} with ${members.length} participants`
  };
}

export async function searchExpenses(filters: SearchFilters): Promise<any> {
  const { category, dateRange, amountRange } = filters;
  
  return {
    results: [
      {
        id: 1,
        description: "Lunch at Cafe Coffee Day",
        amount: 450,
        category: category || "Food & Dining",
        date: dateRange?.start || "2025-08-25",
        participants: ["You", "Sarah"],
        settled: true
      },
      {
        id: 2,
        description: "Movie tickets for Avengers",
        amount: 800,
        category: "Entertainment",
        date: "2025-08-22",
        participants: ["You", "Mike", "Lisa"],
        settled: false
      }
    ],
    totalFound: 2,
    totalAmount: 1250,
    filters: {
      category,
      dateRange,
      amountRange
    }
  };
}
