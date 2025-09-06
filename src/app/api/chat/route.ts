import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { convertToModelMessages, streamText, tool } from "ai";
import { z } from "zod";

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
    system: system || `You are SplitMate AI, an intelligent expense management assistant with advanced conversational capabilities. You help users:

1. **Add and Split Expenses**: Help users add expenses and calculate how much each person owes
2. **Natural Language Processing**: Parse natural language inputs like "I spent ₹500 on dinner with Rahul yesterday"
3. **Expense Analytics**: Answer questions about spending patterns, trends, and comparisons
4. **Smart Categorization**: Automatically categorize expenses using AI
5. **Budget Monitoring**: Track budgets and provide alerts when approaching limits
6. **AI Insights**: Generate personalized financial insights and recommendations
7. **Group Settlements**: Calculate optimal settlement plans for groups
8. **Expense Search**: Find expenses using natural language queries
9. **Payment Integration**: Create UPI payment links and QR codes
10. **WhatsApp Integration**: Generate payment reminder messages

**Available Tools:**
- **parseExpense**: Parse natural language expense inputs
- **analyzeExpenses**: Answer analytics questions with visual charts
- **categorizeExpense**: Auto-categorize expenses intelligently
- **checkBudget**: Monitor budget status and provide alerts
- **generateInsights**: Create personalized financial insights
- **calculateSettlement**: Optimize group expense settlements
- **searchExpenses**: Find expenses with natural language search
- **splitExpense**: Visual expense splitting with payment options

**Your personality:**
- Friendly, conversational, and proactive
- Use Indian currency (₹) and understand Indian payment methods (UPI, PhonePe, Google Pay)
- Suggest relevant tools based on user queries
- Provide actionable insights and recommendations
- Ask intelligent follow-up questions

**Example interactions:**
- "I spent ₹1200 on dinner with Rahul and Priya" → Use parseExpense + splitExpense
- "How much did I spend on food last month?" → Use analyzeExpenses with visual charts
- "Show me all restaurant expenses" → Use searchExpenses
- "Is my food budget okay?" → Use checkBudget
- "Give me insights about my spending" → Use generateInsights

Always use the appropriate tool for each query and provide rich, interactive responses with visual elements when possible. Automatically categorize and analyze expenses to provide maximum value.

When users mention splitting expenses, ALWAYS use the splitExpense tool. For analytics questions, use analyzeExpenses with visual charts.`,
    
    tools: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...frontendTools(tools as any || {}),
      
      parseExpense: tool({
        description: 'Parse natural language expense input to extract structured data',
        inputSchema: z.object({
          input: z.string().describe("Natural language input like 'I spent ₹500 on dinner with Rahul yesterday'"),
        }),
        execute: async ({ input }) => {
          // Simple parsing logic for demo
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
      }),

      analyzeExpenses: tool({
        description: 'Analyze expenses and answer analytics questions',
        inputSchema: z.object({
          query: z.string().describe("Analytics question like 'How much did I spend on food last month?'"),
          timeframe: z.string().optional().describe("Time period for analysis"),
          category: z.string().optional().describe("Expense category to focus on"),
        }),
        execute: async ({ query, category = "food" }) => {
          // Mock analytics response
          return {
            answer: `Based on your spending patterns: You spent ₹2,450 on ${category} last month, which is 15% less than the previous month. Query: "${query}"`,
            data: {
              currentMonth: 2450,
              previousMonth: 2900,
              change: -15.5,
              trend: "decreasing"
            },
            insights: ["Food spending has decreased", "Trending towards healthier budget"]
          };
        }
      }),

      categorizeExpense: tool({
        description: 'Automatically categorize expenses using AI',
        inputSchema: z.object({
          description: z.string().describe("Expense description to categorize"),
          amount: z.number().describe("Amount of the expense"),
        }),
        execute: async ({ description }) => {
          // Simple categorization logic
          const categories = {
            food: ["dinner", "lunch", "breakfast", "food", "restaurant", "cafe", "zomato", "swiggy"],
            transport: ["uber", "ola", "taxi", "bus", "train", "flight", "petrol", "fuel"],
            entertainment: ["movie", "game", "netflix", "spotify", "concert", "theater"],
            shopping: ["shopping", "clothes", "amazon", "flipkart", "mall"],
            healthcare: ["doctor", "hospital", "medicine", "pharmacy"],
            utilities: ["electricity", "water", "gas", "internet", "phone"],
          };
          
          let category = "other";
          let subcategory = "";
          
          for (const [cat, keywords] of Object.entries(categories)) {
            if (keywords.some(keyword => description.toLowerCase().includes(keyword))) {
              category = cat;
              subcategory = keywords.find(keyword => description.toLowerCase().includes(keyword)) || "";
              break;
            }
          }
          
          return {
            category,
            subcategory,
            confidence: 0.85,
            suggestions: Object.keys(categories)
          };
        }
      }),

      checkBudget: tool({
        description: 'Check budget status and provide alerts',
        inputSchema: z.object({
          category: z.string().optional().describe("Category to check budget for"),
          amount: z.number().optional().describe("Amount to check against budget"),
        }),
        execute: async ({ category = "overall", amount = 0 }) => {
          // Mock budget checking
          const budgets = {
            food: { limit: 3000, spent: 2450 },
            transport: { limit: 1500, spent: 1200 },
            entertainment: { limit: 1000, spent: 850 },
            overall: { limit: 8000, spent: 6200 }
          };
          
          const budget = budgets[category as keyof typeof budgets] || budgets.overall;
          const newSpent = budget.spent + amount;
          const percentage = Math.round((newSpent / budget.limit) * 100);
          
          let alertType = "safe";
          if (percentage >= 90) alertType = "danger";
          else if (percentage >= 75) alertType = "warning";
          
          return {
            status: alertType,
            currentSpend: newSpent,
            budgetLimit: budget.limit,
            remainingBudget: budget.limit - newSpent,
            percentage,
            alert: percentage >= 75,
            message: percentage >= 90 ? 
              `⚠️ Budget exceeded! You've spent ${percentage}% of your ${category} budget` :
              percentage >= 75 ?
              `⚠️ Warning: You've spent ${percentage}% of your ${category} budget` :
              `✅ You're within budget (${percentage}% spent)`
          };
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
