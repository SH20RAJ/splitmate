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
  generateSmartInsights,
  calculateOptimalSettlement,
  searchExpenses,
  addExpense,
  getExpenseSummary,
  getTopExpenses
} from "@/lib/tools";

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

      categorizeExpense: tool({
        description: 'Automatically categorize expenses using AI',
        inputSchema: z.object({
          description: z.string().describe("Expense description to categorize"),
          amount: z.number().describe("Amount of the expense"),
        }),
        execute: async ({ description, amount }) => {
          return await categorizeExpense(description, amount);
        }
      }),

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

      generateInsights: tool({
        description: 'Generate personalized financial insights and recommendations',
        inputSchema: z.object({
          timeframe: z.enum(["week", "month", "quarter"]).default("month"),
          focus: z.enum(["spending", "saving", "trends", "comparison"]).optional(),
        }),
        execute: async ({ timeframe, focus }) => {
          // Mock insights generation
          return {
            insights: [
              `Your ${timeframe}ly spending is well-balanced across categories`,
              "Food expenses peak on weekends",
              "Transportation costs are stable"
            ],
            trends: ["Decreasing restaurant visits", "Increasing grocery spending"],
            recommendations: [
              "Consider meal planning to reduce food waste",
              "Use public transport during peak hours to save money"
            ],
            achievements: ["Stayed within budget for 3 consecutive months"],
            warnings: focus === "spending" ? ["Entertainment spending increased by 20%"] : []
          };
        }
      }),

      calculateSettlement: tool({
        description: 'Calculate optimal settlement between group members',
        inputSchema: z.object({
          groupId: z.string().describe("ID of the expense group"),
        }),
        execute: async () => {
          // Mock settlement calculation
          return {
            settlements: [
              { from: "Rahul", to: "You", amount: 450 },
              { from: "Priya", to: "Meera", amount: 320 }
            ],
            totalTransactions: 2,
            simplifiedPlan: "Rahul pays you ₹450, Priya pays Meera ₹320",
            paymentLinks: [
              { 
                name: "Rahul", 
                amount: 450,
                upiLink: "upi://pay?pa=your-upi@id&pn=Settlement&am=450" 
              }
            ]
          };
        }
      }),

      searchExpenses: tool({
        description: 'Search through expenses with natural language queries',
        inputSchema: z.object({
          query: z.string().describe("Search query like 'show me all food expenses from last week'"),
          dateRange: z.object({
            start: z.string().optional(),
            end: z.string().optional(),
          }).optional(),
          category: z.string().optional(),
          minAmount: z.number().optional(),
          maxAmount: z.number().optional(),
          participant: z.string().optional(),
        }),
        execute: async ({ query, category }) => {
          // Mock expense search
          return {
            expenses: [
              { 
                id: "1", 
                description: "Dinner at Pizza Hut", 
                amount: 850, 
                date: "2024-12-20", 
                category: category || "Food",
                participants: ["You", "Rahul"]
              },
              { 
                id: "2", 
                description: "Coffee with friends", 
                amount: 300, 
                date: "2024-12-19", 
                category: "Food",
                participants: ["You", "Priya", "Amit"]
              }
            ],
            totalFound: 2,
            totalAmount: 1150,
            categories: ["Food"],
            summary: `Found 2 expenses matching "${query}" totaling ₹1,150`
          };
        }
      }),
      
      splitExpense: tool({
        description: 'Calculate and split expenses among participants, generate payment requests with UPI links and WhatsApp messages',
        inputSchema: z.object({
          totalAmount: z.number().positive().describe('Total amount to be split'),
          paidBy: z.string().describe('Name of the person who paid the bill'),
          participants: z.array(z.string()).min(2).describe('List of all participants including the person who paid'),
          description: z.string().optional().describe('Description of the expense (e.g., "Dinner at restaurant")'),
          splitType: z.enum(['equal', 'custom']).default('equal').describe('How to split the expense'),
          customSplits: z.record(z.string(), z.number()).optional().describe('Custom split amounts per person')
        }),
        execute: async ({ totalAmount, paidBy, participants, description, splitType, customSplits }) => {
          // Define types for split calculation
          type Participant = {
            name: string
            owesAmount: number
            isPaidBy: boolean
          }
          
          type SplitCalculation = {
            totalAmount: number
            perPersonAmount: number
            participants: Participant[]
          }
          
          // Calculate split amounts
          let perPersonAmount: number
          let splitCalculation: SplitCalculation

          if (splitType === 'equal') {
            perPersonAmount = Math.round((totalAmount / participants.length) * 100) / 100
            
            splitCalculation = {
              totalAmount,
              perPersonAmount,
              participants: participants.map((name: string) => ({
                name,
                owesAmount: name === paidBy ? 0 : perPersonAmount,
                isPaidBy: name === paidBy
              }))
            }
          } else {
            // Custom split logic
            const customSplitValues = Object.values(customSplits || {}) as number[]
            const customTotal = customSplitValues.reduce((sum: number, amount: number) => sum + amount, 0)
            if (Math.abs(customTotal - totalAmount) > 0.01) {
              throw new Error('Custom split amounts do not equal total amount')
            }
            
            splitCalculation = {
              totalAmount,
              perPersonAmount: totalAmount / participants.length, // Average for display
              participants: participants.map((name: string) => {
                const customAmount = customSplits?.[name] || 0
                return {
                  name,
                  owesAmount: name === paidBy ? 0 : customAmount,
                  isPaidBy: name === paidBy
                }
              })
            }
          }

          // Generate payment requests for those who owe money
          const paymentRequests = splitCalculation.participants
            .filter((p: Participant) => !p.isPaidBy && p.owesAmount > 0)
            .map((participant: Participant) => {
              const upiId = "splitmate@paytm" // This would come from user settings
              const upiLink = `upi://pay?pa=${upiId}&pn=SplitMate&am=${participant.owesAmount}&cu=INR&tn=${encodeURIComponent(description || 'Split expense')}`
              
              const whatsappMessage = `Hi ${participant.name}! 👋\n\n` +
                `You owe ₹${participant.owesAmount} for ${description || 'our shared expense'}.\n\n` +
                `Total bill: ₹${totalAmount}\n` +
                `Split among ${participants.length} people: ₹${perPersonAmount} each\n\n` +
                `Please pay using this UPI link: ${upiLink}\n\n` +
                `Thanks! 😊`

              return {
                name: participant.name,
                amount: participant.owesAmount,
                upiLink,
                whatsappMessage
              }
            })

          return {
            splitCalculation,
            paymentRequests
          }
        }
      })
    },
  });

  return result.toUIMessageStreamResponse();
}
