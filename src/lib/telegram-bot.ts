import TelegramBot from 'node-telegram-bot-api';
import { 
  parseExpenseFromText,
  processAnalyticsQuery, 
  splitExpense,
  searchExpenses,
  getTopExpenses,
  addExpense
} from "@/lib/tools";

export interface ExpenseAction {
  type: 'add_expense' | 'split_expense' | 'search_expenses' | 'analytics' | 'top_expenses';
  data: any;
}

export class SplitMateBotService {
  private bot: TelegramBot;
  
  constructor(token: string) {
    this.bot = new TelegramBot(token);
  }

  // Analyze message and determine intent
  async analyzeMessage(message: string): Promise<ExpenseAction | null> {
    const text = message.toLowerCase().trim();
    
    // Add expense patterns
    if (this.matchesAddExpense(text)) {
      return {
        type: 'add_expense',
        data: await this.extractExpenseData(message)
      };
    }
    
    // Split expense patterns  
    if (this.matchesSplitExpense(text)) {
      return {
        type: 'split_expense', 
        data: await this.extractSplitData(message)
      };
    }
    
    // Search patterns
    if (this.matchesSearch(text)) {
      return {
        type: 'search_expenses',
        data: { query: message }
      };
    }
    
    // Analytics patterns
    if (this.matchesAnalytics(text)) {
      return {
        type: 'analytics',
        data: { query: message }
      };
    }
    
    // Top expenses patterns
    if (this.matchesTopExpenses(text)) {
      return {
        type: 'top_expenses', 
        data: await this.extractTopExpensesData(message)
      };
    }
    
    return null;
  }

  // Execute the determined action
  async executeAction(action: ExpenseAction, userId: number): Promise<string> {
    try {
      switch (action.type) {
        case 'add_expense':
          return await this.handleAddExpense(action.data, userId);
          
        case 'split_expense':
          return await this.handleSplitExpense(action.data, userId);
          
        case 'search_expenses':
          return await this.handleSearchExpenses(action.data, userId);
          
        case 'analytics':
          return await this.handleAnalytics(action.data, userId);
          
        case 'top_expenses':
          return await this.handleTopExpenses(action.data, userId);
          
        default:
          return "I didn't understand that. Try asking me to add an expense or split a bill! 💡";
      }
    } catch (error) {
      console.error('Error executing action:', error);
      return "Sorry, something went wrong processing that request. Please try again! 😅";
    }
  }

  // Pattern matchers
  private matchesAddExpense(text: string): boolean {
    const addPatterns = [
      /add.*₹\d+/i,
      /spent.*₹\d+/i,
      /₹\d+.*for/i,
      /₹\d+.*on/i,
      /paid.*₹\d+/i
    ];
    return addPatterns.some(pattern => pattern.test(text));
  }

  private matchesSplitExpense(text: string): boolean {
    const splitPatterns = [
      /split.*₹\d+/i,
      /divide.*₹\d+/i,
      /share.*₹\d+/i,
      /₹\d+.*split/i,
      /₹\d+.*with/i
    ];
    return splitPatterns.some(pattern => pattern.test(text));
  }

  private matchesSearch(text: string): boolean {
    const searchPatterns = [
      /show.*expenses?/i,
      /find.*expenses?/i,
      /search.*expenses?/i,
      /list.*expenses?/i,
      /my.*expenses?/i
    ];
    return searchPatterns.some(pattern => pattern.test(text));
  }

  private matchesAnalytics(text: string): boolean {
    const analyticsPatterns = [
      /how much.*spend/i,
      /total.*spent/i,
      /spending.*this/i,
      /expenses?.*this/i,
      /budget.*status/i
    ];
    return analyticsPatterns.some(pattern => pattern.test(text));
  }

  private matchesTopExpenses(text: string): boolean {
    const topPatterns = [
      /top.*expenses?/i,
      /biggest.*expenses?/i,
      /highest.*expenses?/i,
      /largest.*expenses?/i
    ];
    return topPatterns.some(pattern => pattern.test(text));
  }

  // Data extractors
  private async extractExpenseData(message: string): Promise<any> {
    const result = await parseExpenseFromText(message);
    return result;
  }

  private async extractSplitData(message: string): Promise<any> {
    // Extract amount
    const amountMatch = message.match(/₹(\d+)/);
    const amount = amountMatch ? parseFloat(amountMatch[1]) : 0;
    
    // Extract participants (simple name extraction)
    const withMatch = message.match(/with (.+)$/i);
    const participantText = withMatch ? withMatch[1] : '';
    const participants = participantText
      .split(/,| and |&/)
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    // Extract description
    const descMatch = message.match(/₹\d+\s+(.+?)\s+(?:with|bill|split)/i);
    const description = descMatch ? descMatch[1].trim() : 'shared expense';
    
    return {
      totalAmount: amount,
      participants: ['You', ...participants], // Add current user
      paidBy: 'You',
      description
    };
  }

  private async extractTopExpensesData(message: string): Promise<any> {
    const countMatch = message.match(/top\s+(\d+)/i);
    const count = countMatch ? parseInt(countMatch[1]) : 5;
    
    const periodMatch = message.match(/(week|month|year)/i);
    const period = periodMatch ? periodMatch[1].toLowerCase() : 'month';
    
    return { count, period };
  }

  // Action handlers
  private async handleAddExpense(data: any, userId: number): Promise<string> {
    const result = await addExpense(data.amount, data.description, data.category);
    
    return `✅ *Added expense:* ₹${data.amount} for ${data.description}
📊 *Category:* ${data.category || 'Miscellaneous'}
📅 *Date:* Today

Your expense has been saved! 💰`;
  }

  private async handleSplitExpense(data: any, userId: number): Promise<string> {
    const result = await splitExpense(data.totalAmount, data.participants, data.paidBy, data.description);
    
    return `💸 *Bill Split Complete!*

${result}

Payment requests sent! 📤`;
  }

  private async handleSearchExpenses(data: any, userId: number): Promise<string> {
    const result = await searchExpenses(data.query);
    
    return `� *Search Results:*

${result}`;
  }

  private async handleAnalytics(data: any, userId: number): Promise<string> {
    const result = await processAnalyticsQuery(data.query);
    
    return `� *Expense Analytics:*

${result}`;
  }

  private async handleTopExpenses(data: any, userId: number): Promise<string> {
    const result = await getTopExpenses(data.count, data.period);
    
    return `${result}

📊 Keep an eye on your biggest expenses! �`;
  }

  private async handleSearchExpenses(data: any, userId: number): Promise<string> {
    const result = await searchExpenses(data.query);
    
    if (!result.expenses || result.expenses.length === 0) {
      return "📭 No expenses found matching your search. Try a different keyword! 🔍";
    }
    
    const expensesList = result.expenses
      .slice(0, 5) // Limit to 5 for Telegram
      .map((exp: any, idx: number) => 
        `${idx + 1}. ₹${exp.amount} - ${exp.description} (${exp.date})`
      )
      .join('\n');
    
    return `🔍 *Search Results:*

${expensesList}

📊 *Total found:* ${result.totalFound} expenses
💰 *Total amount:* ₹${result.totalAmount || 0}`;
  }

  private async handleAnalytics(data: any, userId: number): Promise<string> {
    const result = await processAnalyticsQuery(data.query);
    
    return `📊 *Expense Analytics:*

💰 *Total Spent:* ₹${result.totalAmount || 0}
📈 *Period:* ${result.period || 'This month'}
🏷️ *Top Category:* ${result.topCategory || 'N/A'}

${result.insights || 'Keep tracking your expenses for better insights!'} 💡`;
  }

  private async handleTopExpenses(data: any, userId: number): Promise<string> {
    const result = await getTopExpenses(data.count, data.period);
    
    if (!result.expenses || result.expenses.length === 0) {
      return "📭 No expenses found for this period. Start tracking your expenses! 💰";
    }
    
    const topList = result.expenses
      .map((exp: any, idx: number) => 
        `${idx + 1}. ₹${exp.amount} - ${exp.description}`
      )
      .join('\n');
    
    return `🏆 *Top ${data.count} Expenses (${data.period}):*

${topList}

💰 *Total:* ₹${result.totalAmount || 0}
📊 Keep an eye on your biggest expenses! 👀`;
  }

  // Generate quick reply keyboard
  generateQuickReplies(): any {
    return {
      keyboard: [
        ['💰 Add Expense', '📊 Split Bill'],
        ['🔍 Search Expenses', '📈 Analytics'],  
        ['🏆 Top Expenses', '📱 Help']
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
      placeholder: 'Choose an action...'
    };
  }

  // Generate inline keyboard for actions
  generateInlineKeyboard(): any {
    return {
      inline_keyboard: [
        [
          { text: '💰 Add Expense', callback_data: 'add_expense' },
          { text: '📊 Split Bill', callback_data: 'split_bill' }
        ],
        [
          { text: '🔍 Search', callback_data: 'search' },
          { text: '📈 Analytics', callback_data: 'analytics' }
        ],
        [
          { text: '🆘 Help', callback_data: 'get_help' },
          { text: '🌐 Open App', url: 'https://splitmate.app' }
        ]
      ]
    };
  }
}

export default SplitMateBotService;
