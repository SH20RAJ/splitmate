import { openai } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { convertToModelMessages, streamText } from "ai";

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

Always be conversational and ask follow-up questions when needed. When users mention expenses, automatically calculate splits and suggest next actions.`,
    
    tools: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...frontendTools(tools as any || {}),
      // Backend tools would be added here in the future
    },
  });

  return result.toUIMessageStreamResponse();
}
