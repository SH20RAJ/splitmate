// Simple tool definitions for SplitMate conversational AI
// Returns text-based responses instead of components to avoid rendering errors

export interface ExpenseParseResult {
  amount: number;
  description: string;
  category: string;
}

export interface AnalyticsResult {
  answer: string;
  data: {
    currentMonth: number;
    previousMonth: number;
    change: number;
    trend: string;
  };
  insights: string[];
}

export interface CategoryResult {
  message: string; // Simple text response
}

export interface BudgetResult {
  message: string; // Simple text response
}

export interface SplitResult {
  message: string; // Simple text response
}

// Helper functions for mock implementations
export async function parseExpenseFromText(input: string): Promise<ExpenseParseResult> {
  // Extract amount and description from input
  const amountMatch = input.match(/₹?(\d+(?:\.\d+)?)/);
  const amount = amountMatch ? parseFloat(amountMatch[1]) : 100;
  
  // Simple category detection
  let category = "Other";
  if (input.toLowerCase().includes("food") || input.toLowerCase().includes("pizza") || input.toLowerCase().includes("dinner") || input.toLowerCase().includes("lunch")) {
    category = "Food & Dining";
  } else if (input.toLowerCase().includes("uber") || input.toLowerCase().includes("transport") || input.toLowerCase().includes("taxi")) {
    category = "Transportation";
  } else if (input.toLowerCase().includes("movie") || input.toLowerCase().includes("entertainment")) {
    category = "Entertainment";
  } else if (input.toLowerCase().includes("shopping") || input.toLowerCase().includes("amazon") || input.toLowerCase().includes("clothes")) {
    category = "Shopping";
  }
  
  // Extract description (remove amount and clean up)
  let description = input.replace(/₹?\d+(?:\.\d+)?/, '').replace(/for\s+/i, '').trim();
  if (!description) description = "Expense";
  
  // Return structured data that matches the UI component expectations
  return {
    amount: amount,
    description: description,
    category: category
  };
}

export async function processAnalyticsQuery(query: string, timeframe?: string, category?: string): Promise<AnalyticsResult> {
  const currentMonth = 4200;
  const previousMonth = 4800;
  const change = ((currentMonth - previousMonth) / previousMonth) * 100;
  
  // Return structured data that matches the UI component expectations
  return {
    answer: `Based on your ${timeframe || "monthly"} spending analysis: You spent ₹${currentMonth.toLocaleString()} this ${timeframe || "month"}, which is ${Math.abs(change).toFixed(1)}% ${change < 0 ? 'less' : 'more'} than last ${timeframe || "month"}.`,
    data: {
      currentMonth: currentMonth,
      previousMonth: previousMonth,
      change: change,
      trend: change < 0 ? "decreasing" : "increasing"
    },
    insights: [
      "Your spending has decreased compared to last month",
      "Food expenses account for 40% of your total spending",
      "Transportation costs have been optimized well",
      "Weekend spending is 25% higher than weekdays"
    ]
  };
}

export async function categorizeExpense(description: string, amount?: number, merchant?: string): Promise<string> {
  const lowerDesc = description.toLowerCase();
  let category = "Other";
  let icon = "💳";
  
  if (lowerDesc.includes("zomato") || lowerDesc.includes("food") || lowerDesc.includes("restaurant") || lowerDesc.includes("pizza") || lowerDesc.includes("dinner")) {
    category = "Food & Dining";
    icon = "🍕";
  } else if (lowerDesc.includes("uber") || lowerDesc.includes("transport") || lowerDesc.includes("taxi") || lowerDesc.includes("bus")) {
    category = "Transportation";
    icon = "🚗";
  } else if (lowerDesc.includes("movie") || lowerDesc.includes("netflix") || lowerDesc.includes("entertainment")) {
    category = "Entertainment";
    icon = "🎬";
  } else if (lowerDesc.includes("amazon") || lowerDesc.includes("shopping") || lowerDesc.includes("clothes")) {
    category = "Shopping";
    icon = "🛒";
  }
  
  return `${icon} Categorized as **${category}** with 85% confidence.`;
}

export async function checkBudgetStatus(category?: string, amount?: number): Promise<string> {
  const budgetCategory = category || "overall";
  const spentAmount = amount || 0;
  
  if (budgetCategory.toLowerCase().includes("food")) {
    return "🍕 **Food Budget Alert**: You've spent ₹2,100 of ₹2,500 this month (84%). ₹400 remaining.";
  } else if (budgetCategory.toLowerCase().includes("transport")) {
    return "🚗 **Transport Budget**: You've spent ₹800 of ₹1,200 this month (67%). You're on track!";
  } else {
    return "📊 **Overall Budget**: You've used ₹4,200 of ₹6,000 this month (70%). ₹1,800 remaining.";
  }
}

export async function splitExpense(totalAmount: number, participants: string[], paidBy?: string, description?: string): Promise<string> {
  const numPeople = participants.length;
  const sharePerPerson = Math.round(totalAmount / numPeople);
  const payer = paidBy || participants[0];
  
  if (numPeople === 2) {
    const other = participants.find(p => p !== payer) || "Friend";
    return `✅ **Split Complete!** ${other} owes ₹${sharePerPerson} to ${payer} for ${description || "the expense"}.`;
  } else {
    const otherParticipants = participants.filter(p => p !== payer);
    return `✅ **Split Complete!** Each person owes ₹${sharePerPerson} to ${payer}.\n${otherParticipants.map(p => `• ${p}: ₹${sharePerPerson}`).join('\n')}`;
  }
}

export async function generateSmartInsights(timeframe?: string, focus?: string): Promise<string> {
  const period = timeframe || "month";
  
  return `📈 **Smart Insights for this ${period}:**
• Your weekend spending is 40% higher than weekdays
• Food expenses peaked on Fridays (₹350 avg)
• You saved ₹800 by using public transport
• Entertainment spending increased 20% - consider setting limits`;
}

export async function calculateOptimalSettlement(groupId?: string, participants?: string[]): Promise<string> {
  const members = participants || ["Alice", "Bob", "Charlie"];
  
  return `💰 **Optimal Settlement:**
• Alice pays Bob: ₹450 (restaurant bills)
• Charlie pays Bob: ₹320 (transport & snacks)  
• Alice pays Charlie: ₹180 (movie tickets)

**Total settled: ₹950** across ${members.length} people.`;
}

export async function searchExpenses(query: string, filters?: Record<string, unknown>): Promise<string> {
  // Simple expense search
  if (query.toLowerCase().includes("food")) {
    return `🍕 **Food Expenses Found:**
• Pizza Hut dinner - ₹850 (Aug 28)
• Starbucks coffee - ₹450 (Aug 25) 
• McDonald's lunch - ₹320 (Aug 22)

**Total: ₹1,620** in 3 transactions`;
  } else if (query.toLowerCase().includes("last week")) {
    return `📅 **Last Week's Expenses:**
• Groceries - ₹1,200 (Aug 20)
• Movie tickets - ₹600 (Aug 22)
• Uber rides - ₹450 (Aug 24)

**Total: ₹2,250** in 3 transactions`;
  }
  
  return `📊 **Search Results:** Found 5 expenses totaling ₹3,200 matching your criteria.`;
}

// Additional utility functions
export async function addExpense(amount: number, description: string, category?: string): Promise<string> {
  const cat = category || "Other";
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  return `✅ **Expense Added!** ₹${amount} for "${description}" in *${cat}* on ${today}.`;
}

export async function getExpenseSummary(period?: string): Promise<string> {
  const timePeriod = period || "this month";
  
  return `📊 **Expense Summary for ${timePeriod}:**
• **Total Spent:** ₹4,200
• **Top Category:** Food & Dining (₹1,850)
• **Average Daily:** ₹140
• **Budget Used:** 70% of ₹6,000`;
}

export async function getTopExpenses(limit?: number, period?: string): Promise<string> {
  const count = limit || 5;
  const timePeriod = period || "this month";
  
  return `🏆 **Top ${count} Expenses ${timePeriod}:**
1. **Rent** - ₹5,000
2. **Groceries** - ₹1,850  
3. **Internet Bill** - ₹1,200
4. **Dining Out** - ₹850
5. **Transport** - ₹650`;
}
