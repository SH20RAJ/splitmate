import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { convertToModelMessages, streamText, tool } from "ai";
import { z } from "zod";
import { 
  parseExpenseFromText,
  processAnalyticsQuery, 
  categorizeExpense, 
  checkBudgetStatus,
  splitExpense,
  searchExpenses,
  getTopExpenses
} from "@/lib/tools";
import { extractEmail } from "@/lib/email-detect";
import { sendNotificationEmail } from "@/lib/email";

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();
  const { messages, system, tools } = body as { 
    messages: unknown[]; 
    system?: string; 
    tools?: Record<string, unknown>; 
  };

  // Check for email in the latest user message and send notification if found
  const lastUserMessage = Array.isArray(messages) ? messages.slice().reverse().find((m: any) => m.role === 'user' && typeof m.content === 'string') : null;
  if (lastUserMessage) {
    const email = extractEmail((lastUserMessage as any).content);
    if (email) {
      // Send notification email (fire and forget)
      sendNotificationEmail({
        to: email,
        subject: "SplitMate Notification",
        text: "You have a new notification from SplitMate!",
        html: `<p>You have a new notification from <b>SplitMate</b>!</p>`
      }).catch(() => {});
    }
  }

  const result = streamText({
    model: openai("gpt-4o"),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: convertToModelMessages(messages as any),
    system: system || `You are SplitMate AI, an intelligent expense management assistant. You help users track expenses, split bills, and manage budgets through simple conversational interactions.

RESPONSE STYLE:
- Keep responses concise and clear
- Use emojis to make responses engaging  
- Format amounts as ₹XXX
- Use bold text for important information
- Provide direct, actionable answers

EXAMPLE INTERACTIONS:
User: "Add ₹250 for pizza yesterday"  
Bot: "Got it! Added ₹250 to *Food > Dining* on Aug 2."

User: "Show me my top 3 expenses this week"
Bot: "1. Rent – ₹5000, 2. Food – ₹2300, 3. Transport – ₹1200."

User: "Split ₹600 Domino's bill with Rahul and Aditi"  
Bot: "Done! Each person owes ₹200."

Always use the appropriate tool for each query and provide helpful, formatted text responses.`,
    
    tools: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...frontendTools(tools as any || {}),
      
      // Add expense tool
      addExpense: tool({
        description: 'Add a new expense entry',
        inputSchema: z.object({
          amount: z.number().positive().describe('Amount of the expense'),
          description: z.string().describe('Description of the expense'),
          category: z.string().optional().describe('Category of the expense'),
        }),
        execute: async ({ amount, description, category }) => {
          return await parseExpenseFromText(`₹${amount} for ${description} ${category ? `in ${category}` : ''}`);
        }
      }),

      // Analytics tool  
      analyzeExpenses: tool({
        description: 'Analyze expenses and answer analytics questions',
        inputSchema: z.object({
          query: z.string().describe("Analytics question like 'How much did I spend on food last month?'"),
          timeframe: z.string().optional().describe("Time period for analysis"),
          category: z.string().optional().describe("Expense category to focus on"),
        }),
        execute: async ({ query, category, timeframe }) => {
          return await processAnalyticsQuery(query, timeframe, category);
        }
      }),

      // Categorize expense tool
      categorizeExpense: tool({
        description: 'Automatically categorize expenses using AI',
        inputSchema: z.object({
          description: z.string().describe("Expense description to categorize"),
          amount: z.number().optional().describe("Amount of the expense"),
        }),
        execute: async ({ description, amount }) => {
          return await categorizeExpense(description, amount);
        }
      }),

      // Budget check tool
      checkBudget: tool({
        description: 'Check budget status and provide alerts',
        inputSchema: z.object({
          category: z.string().optional().describe("Category to check budget for"),
          amount: z.number().optional().describe("Amount to check against budget"),
        }),
        execute: async ({ category, amount }) => {
          return await checkBudgetStatus(category, amount);
        }
      }),

      // Split expense tool
      splitExpense: tool({
        description: 'Split expenses equally among participants',
        inputSchema: z.object({
          totalAmount: z.number().positive().describe('Total amount to be split'),
          paidBy: z.string().describe('Name of the person who paid the bill'),
          participants: z.array(z.string()).min(2).describe('List of all participants including the person who paid'),
          description: z.string().optional().describe('Description of the expense (e.g., "Dinner at restaurant")'),
        }),
        execute: async ({ totalAmount, paidBy, participants, description }) => {
          return await splitExpense(totalAmount, participants, paidBy, description);
        }
      }),

      // Search expenses tool
      searchExpenses: tool({
        description: 'Search for expenses by category, description, or time period',
        inputSchema: z.object({
          query: z.string().describe("Search query like 'show me all food expenses' or 'expenses from last week'"),
        }),
        execute: async ({ query }) => {
          return await searchExpenses(query);
        }
      }),

      // Get top expenses tool
      getTopExpenses: tool({
        description: 'Get top expenses for a period',
        inputSchema: z.object({
          count: z.number().optional().describe("Number of top expenses to show (default 5)"),
          period: z.string().optional().describe("Time period like 'this week', 'this month'"),
        }),
        execute: async ({ count, period }) => {
          return await getTopExpenses(count, period);
        }
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
