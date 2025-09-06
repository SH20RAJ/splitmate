import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { convertToModelMessages, streamText, tool } from "ai";
import { z } from "zod";
import {
  parseExpenseFromText,
  processAnalyticsQuery,
} from "@/lib/tools"; // Only import necessary tools

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();
  const { messages, system, tools } = body as {
    messages: unknown[];
    system?: string;
    tools?: Record<string, unknown>;
  };

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
    },
  });

  return result.toUIMessageStreamResponse();
}
