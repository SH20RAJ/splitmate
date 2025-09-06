// Clean tool definitions for SplitMate conversational AI
// These helper functions will be used in the API route

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
  percentage: number;
  alert: boolean;
  message: string;
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
  const currentSpend = 4500 + newAmount;
  const budgetLimit = 5000;
  const percentage = Math.round((currentSpend / budgetLimit) * 100);
  
  let status: 'safe' | 'warning' | 'danger' = 'safe';
  let message = '';
  
  if (percentage >= 90) {
    status = 'danger';
    message = `⚠️ Budget exceeded! You've spent ${percentage}% of your ${budgetName} budget`;
  } else if (percentage >= 75) {
    status = 'warning'; 
    message = `⚠️ Warning: You've spent ${percentage}% of your ${budgetName} budget`;
  } else {
    status = 'safe';
    message = `✅ You're within budget (${percentage}% spent)`;
  }
  
  return {
    status,
    currentSpend,
    budgetLimit,
    remainingBudget: budgetLimit - currentSpend,
    percentage,
    alert: percentage >= 75,
    message,
    suggestions: [
      "Consider cooking at home more often",
      "Look for lunch deals and discounts", 
      "Set daily spending alerts"
    ]
  };
}
