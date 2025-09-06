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
    system: system || `You are SplitMate AI, an intelligent expense management assistant. You help users:

1. **Add and Split Expenses**: Help users add expenses and calculate how much each person owes
2. **Track Balances**: Keep track of who owes whom and how much  
3. **Generate Payment Requests**: Create UPI payment links and QR codes
4. **Send Reminders**: Help create WhatsApp messages for payment reminders
5. **Group Management**: Create and manage expense groups (trips, roommates, etc.)
6. **Analytics**: Provide spending insights and patterns

**Your personality:**
- Friendly, conversational, and helpful
- Use Indian currency (₹) and understand Indian payment methods (UPI, PhonePe, Google Pay)
- Proactive in suggesting actions (like sending reminders or creating groups)
- Clear and concise in financial calculations

**Example interactions:**
- "I spent ₹1200 on dinner with Rahul and Priya" → Calculate splits and offer to send reminders
- "How much does Amit owe me?" → Check balances and suggest payment request
- "Create a group for our Goa trip" → Help set up group with members

Always be conversational and ask follow-up questions when needed. When users mention expenses, automatically calculate splits and suggest next actions.

When users mention splitting expenses, ALWAYS use the splitExpense tool to provide a visual breakdown with payment options.`,
    
    tools: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...frontendTools(tools as any || {}),
      
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
