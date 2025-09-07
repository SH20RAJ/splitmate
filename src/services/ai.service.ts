import { createOpenAI } from '@ai-sdk/openai';
import { generateText, embed } from 'ai';
import { DatabaseService } from './database.service';
import { ExpenseController } from '../controllers/ExpenseController';
import { GroupController } from '../controllers/GroupController';
import { PaymentController } from '../controllers/PaymentController';
import { BudgetController } from '../controllers/BudgetController';
import { CategoryController } from '../controllers/CategoryController';

export class AIService {
  private static instance: AIService;
  private openai: ReturnType<typeof createOpenAI>;
  private embeddingModel: string = 'text-embedding-3-small';
  private chatModel: string = 'gpt-4o-mini';

  private constructor() {
    // Initialize OpenAI client
    this.openai = createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  // Get OpenAI client
  getOpenAI() {
    return this.openai;
  }

  // Generate embedding for text
  async generateEmbedding(text: string) {
    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not configured');
      }

      const { embedding } = await embed({
        model: this.openai.embedding(this.embeddingModel),
        value: text,
      });

      return embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }

  // Store embedding in database (simplified)
  async storeEmbedding(text: string, embedding: number[], metadata: Record<string, any> = {}) {
    try {
      // In a real implementation, you would store this in a vector database
      // For now, we'll just log it
      console.log('Storing embedding for:', text.substring(0, 50) + '...', metadata);
      return { success: true };
    } catch (error) {
      console.error('Error storing embedding:', error);
      throw error;
    }
  }

  // Semantic search using embeddings
  async semanticSearch(query: string, limit: number = 10) {
    try {
      // Generate embedding for the query
      const queryEmbedding = await this.generateEmbedding(query);
      
      // In a real implementation, you would search a vector database
      // For now, we'll return mock results
      console.log('Performing semantic search for:', query);
      
      return {
        query,
        results: [],
        message: 'Semantic search not fully implemented in this demo'
      };
    } catch (error) {
      console.error('Error performing semantic search:', error);
      throw error;
    }
  }

  // Analyze expense using AI
  async analyzeExpense(description: string, amount?: number, category?: string) {
    try {
      const prompt = `Analyze this expense and provide insights:
Description: ${description}
Amount: ${amount ? `₹${amount}` : 'Not specified'}
Category: ${category || 'Not specified'}

Please provide:
1. A categorized classification
2. Whether this is a necessary or discretionary expense
3. Suggestions for similar cheaper alternatives if applicable
4. Budgeting advice for this type of expense`;

      const { text } = await generateText({
        model: this.openai(this.chatModel),
        messages: [
          {
            role: 'system',
            content: 'You are a personal finance assistant helping users understand and manage their expenses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      });

      return text;
    } catch (error) {
      console.error('Error analyzing expense:', error);
      throw error;
    }
  }

  // Generate expense insights
  async generateExpenseInsights(userId: string, groupId?: string) {
    try {
      // Get user's expenses
      let expenses = [];
      
      if (groupId) {
        // Get group expenses
        expenses = await DatabaseService.getInstance().expenses.getGroupExpenses(groupId);
      } else {
        // Get user expenses
        expenses = await DatabaseService.getInstance().expenses.getUserExpenses(userId);
      }
      
      if (expenses.length === 0) {
        return 'No expenses found to analyze.';
      }
      
      // Prepare expense data for analysis
      const expenseData = expenses.map(expense => ({
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
        date: expense.expenseDate,
      }));
      
      const prompt = `Analyze these expenses and provide financial insights:
${JSON.stringify(expenseData, null, 2)}

Please provide:
1. Spending patterns and trends
2. Categories where the user is spending the most
3. Areas where they could potentially save money
4. Recommendations for better budgeting
5. Overall financial health assessment`;

      const { text } = await generateText({
        model: this.openai(this.chatModel),
        messages: [
          {
            role: 'system',
            content: 'You are a personal finance assistant providing detailed expense analysis and insights.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      });

      return text;
    } catch (error) {
      console.error('Error generating expense insights:', error);
      throw error;
    }
  }

  // Categorize expense using AI
  async categorizeExpense(description: string, amount?: number) {
    try {
      // Get default categories
      const categories = await CategoryController.getDefaultCategories();
      const categoryNames = categories.map(cat => cat.name).join(', ');
      
      const prompt = `Categorize this expense based on its description:
Description: ${description}
Amount: ${amount ? `₹${amount}` : 'Not specified'}
Available categories: ${categoryNames}

Please select the most appropriate category from the list above.`;

      const { text } = await generateText({
        model: this.openai(this.chatModel),
        messages: [
          {
            role: 'system',
            content: 'You are an expense categorization assistant. Always select from the provided categories.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      });

      const category = text;
      
      // Validate that the category exists
      const validCategory = categories.find(cat => 
        category.toLowerCase().includes(cat.name.toLowerCase())
      );
      
      return validCategory ? validCategory.name : 'Other';
    } catch (error) {
      console.error('Error categorizing expense:', error);
      return 'Other';
    }
  }

  // Split expense among participants
  async splitExpense(totalAmount: number, participants: string[], description: string) {
    try {
      const prompt = `Split this expense equally among the participants:
Total Amount: ₹${totalAmount}
Description: ${description}
Participants: ${participants.join(', ')}

Calculate how much each person owes and provide a breakdown.`;

      const { text } = await generateText({
        model: this.openai(this.chatModel),
        messages: [
          {
            role: 'system',
            content: 'You are an expense splitting assistant. Provide exact calculations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      });

      return text;
    } catch (error) {
      console.error('Error splitting expense:', error);
      throw error;
    }
  }

  // Generate budget recommendations
  async generateBudgetRecommendations(userId: string, groupId?: string) {
    try {
      // Get user's expenses for analysis
      let expenses = [];
      
      if (groupId) {
        // Get group expenses
        expenses = await DatabaseService.getInstance().expenses.getGroupExpenses(groupId);
      } else {
        // Get user expenses
        expenses = await DatabaseService.getInstance().expenses.getUserExpenses(userId);
      }
      
      if (expenses.length === 0) {
        return 'No expenses found to generate budget recommendations.';
      }
      
      // Prepare expense data for analysis
      const expenseData = expenses.map(expense => ({
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
        date: expense.expenseDate,
      }));
      
      const prompt = `Based on these expenses, generate personalized budget recommendations:
${JSON.stringify(expenseData, null, 2)}

Please provide:
1. Recommended monthly budget allocations by category
2. Areas where the user could reduce spending
3. Savings targets based on income (assume ₹50,000/month if not specified)
4. Specific actionable tips for better financial management`;

      const { text } = await generateText({
        model: this.openai(this.chatModel),
        messages: [
          {
            role: 'system',
            content: 'You are a financial planning assistant providing personalized budget recommendations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      });

      return text;
    } catch (error) {
      console.error('Error generating budget recommendations:', error);
      throw error;
    }
  }

  // Process natural language query
  async processNaturalLanguageQuery(query: string, userId: string, context?: Record<string, any>) {
    try {
      const prompt = `Process this natural language query and provide a helpful response:
Query: ${query}
User ID: ${userId}
Context: ${context ? JSON.stringify(context, null, 2) : 'No additional context'}

Please interpret the query and provide a relevant response based on the user's financial data.`;

      const { text } = await generateText({
        model: this.openai(this.chatModel),
        messages: [
          {
            role: 'system',
            content: 'You are a helpful personal finance assistant. Interpret natural language queries and provide relevant financial information.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      });

      return text;
    } catch (error) {
      console.error('Error processing natural language query:', error);
      throw error;
    }
  }

  // Generate financial summary
  async generateFinancialSummary(userId: string, period: 'week' | 'month' | 'year' = 'month') {
    try {
      // Get user's expenses for the period
      const expenses = await DatabaseService.getInstance().expenses.getUserExpenses(userId);
      
      if (expenses.length === 0) {
        return 'No expenses found for the selected period.';
      }
      
      // Filter expenses by period
      const periodStart = new Date();
      switch (period) {
        case 'week':
          periodStart.setDate(periodStart.getDate() - 7);
          break;
        case 'month':
          periodStart.setMonth(periodStart.getMonth() - 1);
          break;
        case 'year':
          periodStart.setFullYear(periodStart.getFullYear() - 1);
          break;
      }
      
      const periodExpenses = expenses.filter(expense => 
        new Date(expense.expenseDate) >= periodStart
      );
      
      if (periodExpenses.length === 0) {
        return `No expenses found for the past ${period}.`;
      }
      
      // Prepare expense data for analysis
      const expenseData = periodExpenses.map(expense => ({
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
        date: expense.expenseDate,
      }));
      
      const totalAmount = periodExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      const prompt = `Generate a financial summary for this period:
Period: Past ${period}
Total Expenses: ₹${totalAmount}
Number of Transactions: ${periodExpenses.length}

Expense Details:
${JSON.stringify(expenseData, null, 2)}

Please provide:
1. Total spending summary
2. Breakdown by category
3. Comparison to previous period if applicable
4. Key insights and recommendations`;

      const { text } = await generateText({
        model: this.openai(this.chatModel),
        messages: [
          {
            role: 'system',
            content: 'You are a financial reporting assistant providing clear, concise summaries.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
      });

      return text;
    } catch (error) {
      console.error('Error generating financial summary:', error);
      throw error;
    }
  }

  // Get top expenses
  async getTopExpenses(userId: string, count: number = 5, period: 'week' | 'month' | 'year' = 'month') {
    try {
      // Get user's expenses
      const expenses = await DatabaseService.getInstance().expenses.getUserExpenses(userId);
      
      if (expenses.length === 0) {
        return 'No expenses found.';
      }
      
      // Filter expenses by period
      const periodStart = new Date();
      switch (period) {
        case 'week':
          periodStart.setDate(periodStart.getDate() - 7);
          break;
        case 'month':
          periodStart.setMonth(periodStart.getMonth() - 1);
          break;
        case 'year':
          periodStart.setFullYear(periodStart.getFullYear() - 1);
          break;
      }
      
      const periodExpenses = expenses
        .filter(expense => new Date(expense.expenseDate) >= periodStart)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, count);
      
      if (periodExpenses.length === 0) {
        return `No expenses found for the past ${period}.`;
      }
      
      // Format the response
      const topExpensesList = periodExpenses.map((expense, index) => 
        `${index + 1}. ${expense.name}: ₹${expense.amount} (${expense.category})`
      ).join('\n');
      
      return `Top ${count} expenses for the past ${period}:\n${topExpensesList}`;
    } catch (error) {
      console.error('Error getting top expenses:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export default AIService.getInstance();