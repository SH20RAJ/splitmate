# Expense Splitting with Vercel AI SDK

This document explains how SplitMate implements smart bill splitting using the Vercel AI SDK and custom tools.

## Overview

SplitMate leverages the Vercel AI SDK to create an intelligent expense splitting system that can understand natural language requests and automatically calculate fair shares among participants.

## Vercel AI SDK Integration

### 1. Runtime Setup

SplitMate uses `useChatRuntime` from `@assistant-ui/react-ai-sdk` to integrate with the Vercel AI SDK:

```typescript
// app/splitmate-runtime-provider.tsx
import { 
  AssistantRuntimeProvider,
} from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

export function SplitMateRuntimeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
```

### 2. API Route Implementation

The backend API route uses the Vercel AI SDK for streaming responses:

```typescript
// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
} from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  
  const result = streamText({
    model: openai("gpt-4o"),
    messages: convertToModelMessages(messages),
    tools: {
      split_bill: splitBillTool,
      show_qr: qrCodeTool,
      send_reminder: reminderTool,
    },
  });

  return result.toUIMessageStreamResponse();
}
```

## Custom Tools Implementation

### 1. Bill Splitting Tool

The bill splitting tool calculates equal shares among participants:

```typescript
// lib/tools/split-bill-tool.ts
import { tool } from "@assistant-ui/react";
import { z } from "zod";

// Define the tool schema
const splitBillSchema = z.object({
  amount: z.number().positive().describe("Total amount of the bill"),
  description: z.string().min(1).describe("Description of the expense"),
  participants: z.array(z.string()).min(2).describe("List of participants"),
});

// Define types for our data structures
interface SplitBillArgs {
  amount: number;
  description: string;
  participants: string[];
}

interface SplitResult {
  totalAmount: number;
  splits: { person: string; amount: number }[];
  description: string;
}

// Implement the tool
export const splitBillTool = tool({
  description: "Split a bill equally among participants",
  parameters: splitBillSchema,
  execute: async ({ amount, description, participants }: SplitBillArgs) => {
    try {
      // Calculate split amount
      const splitAmount = amount / participants.length;
      
      // Create split result
      const splitResult: SplitResult = {
        totalAmount: amount,
        splits: participants.map((person) => ({
          person,
          amount: parseFloat(splitAmount.toFixed(2)),
        })),
        description,
      };
      
      // Return result as JSON string for the UI component
      return JSON.stringify(splitResult);
    } catch (error) {
      console.error('Error splitting bill:', error);
      throw new Error('Failed to split bill');
    }
  },
});
```

### 2. QR Code Generation Tool

The QR code generation tool creates UPI payment QR codes:

```typescript
// lib/tools/qr-code-tool.ts
import { tool } from "@assistant-ui/react";
import { z } from "zod";
import { generateUpiLink, generateUpiQrCode } from "@/lib/upi";

// Define the tool schema
const qrCodeSchema = z.object({
  amount: z.number().positive().describe("Amount to be paid"),
  description: z.string().optional().describe("Description of the payment"),
  upiId: z.string().optional().describe("Recipient's UPI ID"),
});

// Define types for our data structures
interface QrCodeArgs {
  amount: number;
  description?: string;
  upiId?: string;
}

interface QrResult {
  qrCode: string;
  upiLink: string;
  amount: number;
  description: string;
}

// Implement the tool
export const qrCodeTool = tool({
  description: "Generate a UPI QR code for payment",
  parameters: qrCodeSchema,
  execute: async ({ amount, description, upiId }: QrCodeArgs) => {
    try {
      // Use provided UPI ID or default to a placeholder
      const userUpiId = upiId || "user@upi";
      const userName = "SplitMate User";
      
      // Generate UPI link
      const upiLink = generateUpiLink(userUpiId, userName, amount);
      
      // Generate QR code
      const qrCode = await generateUpiQrCode(upiLink);
      
      // Create result
      const qrResult: QrResult = {
        qrCode,
        upiLink,
        amount,
        description: description || `Payment for ₹${amount}`,
      };
      
      // Return result as JSON string for the UI component
      return JSON.stringify(qrResult);
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  },
});
```

### 3. Reminder Tool

The reminder tool sends payment reminders via WhatsApp:

```typescript
// lib/tools/reminder-tool.ts
import { tool } from "@assistant-ui/react";
import { z } from "zod";
import { 
  generateUpiLink, 
  generateWhatsAppReminderMessage,
  generateWebShareData
} from "@/lib/upi";

// Define the tool schema
const reminderSchema = z.object({
  amount: z.number().positive().describe("Amount to be paid"),
  description: z.string().min(1).describe("Description of the expense"),
  recipientName: z.string().min(1).describe("Name of the recipient"),
  recipientPhone: z.string().optional().describe("Recipient's phone number"),
  upiId: z.string().optional().describe("Recipient's UPI ID"),
});

// Define types for our data structures
interface ReminderArgs {
  amount: number;
  description: string;
  recipientName: string;
  recipientPhone?: string;
  upiId?: string;
}

interface ReminderResult {
  whatsappLink: string;
  webShareData: any;
  upiLink: string;
  amount: number;
  description: string;
  recipientName: string;
}

// Implement the tool
export const reminderTool = tool({
  description: "Send a payment reminder via WhatsApp",
  parameters: reminderSchema,
  execute: async ({ 
    amount, 
    description, 
    recipientName, 
    recipientPhone, 
    upiId 
  }: ReminderArgs) => {
    try {
      // Use provided UPI ID or default to a placeholder
      const userUpiId = upiId || "user@upi";
      const userName = "SplitMate User";
      
      // Generate UPI link
      const upiLink = generateUpiLink(userUpiId, userName, amount);
      
      // Generate WhatsApp reminder message
      const whatsappLink = generateWhatsAppReminderMessage(amount, description, upiLink);
      
      // Generate Web Share API data
      const webShareData = generateWebShareData(amount, description, upiLink);
      
      // Create result
      const reminderResult: ReminderResult = {
        whatsappLink,
        webShareData,
        upiLink,
        amount,
        description,
        recipientName,
      };
      
      // Return result as JSON string for the UI component
      return JSON.stringify(reminderResult);
    } catch (error) {
      console.error('Error sending reminder:', error);
      throw new Error('Failed to send reminder');
    }
  },
});
```

## Tool UI Components

### 1. Bill Splitting Component

Custom UI component for displaying bill splitting results:

```typescript
// components/assistant-ui/split-bill-component.tsx
import { ToolCallContentPartComponent } from "@assistant-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupeeIcon, UserIcon } from "lucide-react";

// Define types for our data structures
interface SplitResult {
  totalAmount: number;
  splits: { person: string; amount: number }[];
  description: string;
}

export const SplitBillComponent: ToolCallContentPartComponent = ({
  toolName,
  args,
  result,
}) => {
  // Parse the result
  const splitData: SplitResult = typeof result === "string" ? JSON.parse(result) : result;
  
  if (!splitData || !splitData.splits) {
    return (
      <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
        <p className="font-semibold">Bill Splitting</p>
        <p>Processing your bill split request...</p>
      </div>
    );
  }

  return (
    <Card className="mb-4 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IndianRupeeIcon className="h-5 w-5" />
          Bill Split Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-lg font-bold">₹{splitData.totalAmount.toFixed(2)}</span>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Split Among:</h4>
            {splitData.splits.map((split, index) => (
              <div key={index} className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  <span>{split.person}</span>
                </div>
                <span className="font-medium">₹{split.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

### 2. QR Code Component

Custom UI component for displaying UPI QR codes:

```typescript
// components/assistant-ui/qr-code-component.tsx
import { ToolCallContentPartComponent } from "@assistant-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCodeIcon, CopyIcon, CheckIcon } from "lucide-react";
import { useState } from "react";

// Define types for our data structures
interface QrResult {
  qrCode: string;
  upiLink: string;
  amount: number;
  description: string;
}

export const QrCodeComponent: ToolCallContentPartComponent = ({
  toolName,
  args,
  result,
}) => {
  // Parse the result
  const qrData: QrResult = typeof result === "string" ? JSON.parse(result) : result;
  const [isCopied, setIsCopied] = useState(false);
  
  if (!qrData || !qrData.qrCode) {
    return (
      <div className="mb-4 p-4 bg-blue-100 border border-blue-300 rounded-lg">
        <p className="font-semibold">Generating Payment QR Code...</p>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrData.upiLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="mb-4 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCodeIcon className="h-5 w-5" />
          Payment QR Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            {/* Display QR Code */}
            <img 
              src={qrData.qrCode} 
              alt="UPI Payment QR Code" 
              className="w-48 h-48 object-contain p-2 border rounded-lg"
            />
            
            <div className="mt-4 text-center">
              <p className="font-semibold">Amount: ₹{qrData.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-600">{qrData.description}</p>
            </div>
          
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button 
              className="flex-1 bg-green-500 hover:bg-green-600"
              onClick={() => {
                window.open(qrData.upiLink, '_blank');
              }}
            >
              Pay with UPI App
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={copyToClipboard}
            >
              {isCopied ? (
                <>
                  <CheckIcon className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <CopyIcon className="h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

### 3. Reminder Component

Custom UI component for sending payment reminders:

```typescript
// components/assistant-ui/reminder-component.tsx
import { ToolCallContentPartComponent } from "@assistant-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircleIcon, Share2Icon } from "lucide-react";

// Define types for our data structures
interface ReminderResult {
  whatsappLink: string;
  webShareData: any;
  upiLink: string;
  amount: number;
  description: string;
  recipientName: string;
}

export const ReminderComponent: ToolCallContentPartComponent = ({
  toolName,
  args,
  result,
}) => {
  // Parse the result
  const reminderData: ReminderResult = typeof result === "string" ? JSON.parse(result) : result;
  
  if (!reminderData || !reminderData.whatsappLink) {
    return (
      <div className="mb-4 p-4 bg-purple-100 border border-purple-300 rounded-lg">
        <p className="font-semibold">Preparing Reminder...</p>
      </div>
    );
  }

  return (
    <Card className="mb-4 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircleIcon className="h-5 w-5" />
          Send Payment Reminder
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-gray-600">
            Remind {reminderData.recipientName} about the ₹{reminderData.amount.toFixed(2)} they owe you for {reminderData.description}.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button 
              className="flex-1 bg-green-500 hover:bg-green-600"
              onClick={() => {
                window.open(reminderData.whatsappLink, '_blank');
              }}
            >
              <MessageCircleIcon className="h-4 w-4 mr-2" />
              Send via WhatsApp
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share(reminderData.webShareData);
                  } catch (err) {
                    console.error('Error sharing:', err);
                  }
                } else {
                  await navigator.clipboard.writeText(reminderData.upiLink);
                  alert('UPI link copied to clipboard!');
                }
              }}
            >
              <Share2Icon className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

## Thread Integration

### 1. Custom Thread Component

SplitMate uses a custom thread component that maps tools to UI components:

```typescript
// components/assistant-ui/splitmate-thread.tsx
import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ErrorPrimitive,
} from "@assistant-ui/react";
import { SplitBillComponent } from "@/components/assistant-ui/split-bill-component";
import { QrCodeComponent } from "@/components/assistant-ui/qr-code-component";
import { ReminderComponent } from "@/components/assistant-ui/reminder-component";
import { ToolFallback } from "@/components/assistant-ui/tool-fallback";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";

const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root asChild>
      <motion.div
        className="relative mx-auto grid w-full max-w-[var(--thread-max-width)] grid-cols-[auto_auto_1fr] grid-rows-[auto_1fr] px-[var(--thread-padding-x)] py-4"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role="assistant"
      >
        <div className="ring-border bg-green-500 col-start-1 row-start-1 flex size-8 shrink-0 items-center justify-center rounded-full ring-1">
          <IndianRupeeIcon size={14} className="text-white" />
        </div>

        <div className="text-foreground col-span-2 col-start-2 row-start-1 ml-4 leading-7 break-words">
          <MessagePrimitive.Content
            components={{
              Text: MarkdownText,
              tools: { 
                by_name: {
                  split_bill: SplitBillComponent,
                  show_qr: QrCodeComponent,
                  send_reminder: ReminderComponent,
                },
                Fallback: ToolFallback,
              },
            }}
          />
          <MessageError />
        </div>

        <AssistantActionBar />

        <BranchPicker className="col-start-2 row-start-2 mr-2 -ml-2" />
      </motion.div>
    </MessagePrimitive.Root>
  );
};
```

## Natural Language Processing

### 1. Prompt Engineering

SplitMate uses carefully crafted prompts to guide the AI in understanding expense-related requests:

```typescript
// lib/prompts/expense-prompts.ts
export const EXPENSE_PROMPTS = {
  system: `
    You are SplitMate, an AI assistant that helps users manage shared expenses.
    
    Key capabilities:
    1. Parse natural language expense descriptions
    2. Extract amounts, participants, and descriptions
    3. Split bills equally among participants
    4. Generate UPI payment links and QR codes
    5. Send payment reminders via WhatsApp
    
    When a user mentions an expense:
    - Identify the amount, participants, and description
    - Use the split_bill tool to calculate equal shares
    - Offer to generate a QR code for payment
    - Suggest sending reminders to participants who owe money
    
    Example interactions:
    User: "I spent ₹1200 on pizza with Rahul and Shreya"
    Assistant: "I'll help you split that ₹1200 pizza expense with Rahul and Shreya. Let me calculate the equal shares for you."
    [Calls split_bill tool with amount=1200, description="pizza", participants=["You", "Rahul", "Shreya"]]
    
    User: "Can you generate a QR code for ₹400?"
    Assistant: "I'll generate a UPI QR code for ₹400."
    [Calls show_qr tool with amount=400]
    
    User: "Remind Rahul about the ₹400 he owes me"
    Assistant: "I'll send a reminder to Rahul about the ₹400 he owes you."
    [Calls send_reminder tool with amount=400, description="shared expense", recipientName="Rahul"]
  `,
};
```

### 2. Tool Calling Patterns

The AI learns to call tools in specific patterns:

```typescript
// Example tool calling sequence
[
  // First, split the bill
  {
    tool_call_id: "call_1",
    tool_name: "split_bill",
    args: { amount: 1200, description: "pizza", participants: ["You", "Rahul", "Shreya"] }
  },
  
  // Then, generate QR codes for each share
  {
    tool_call_id: "call_2",
    tool_name: "show_qr",
    args: { amount: 400, description: "Your share of the pizza", upiId: "rahul@upi" }
  },
  
  // Finally, send reminders
  {
    tool_call_id: "call_3",
    tool_name: "send_reminder",
    args: { amount: 400, description: "pizza share", recipientName: "Rahul" }
  }
]
```

## Error Handling

### 1. Tool Execution Errors

Proper error handling for tool execution failures:

```typescript
export const splitBillTool = tool({
  // ...
  execute: async ({ amount, description, participants }) => {
    try {
      // Tool logic
      const splitAmount = amount / participants.length;
      
      return JSON.stringify({
        totalAmount: amount,
        splits: participants.map((person) => ({
          person,
          amount: parseFloat(splitAmount.toFixed(2)),
        })),
        description,
      });
    } catch (error) {
      console.error('Error splitting bill:', error);
      throw new Error('Failed to split bill');
    }
  },
});
```

### 2. Invalid Parameters

Validation of tool parameters:

```typescript
const splitBillSchema = z.object({
  amount: z.number().positive().describe("Total amount of the bill"),
  description: z.string().min(1).describe("Description of the expense"),
  participants: z.array(z.string()).min(2).describe("List of participants"),
});
```

## Testing

### 1. Unit Testing Tools

Test individual tools with mock data:

```typescript
// lib/tools/split-bill-tool.test.ts
import { splitBillTool } from './split-bill-tool';

describe('splitBillTool', () => {
  it('should split bill equally among participants', async () => {
    const result = await splitBillTool.execute({
      amount: 1200,
      description: 'Pizza night',
      participants: ['You', 'Rahul', 'Shreya'],
    });
    
    const parsedResult = JSON.parse(result);
    expect(parsedResult.totalAmount).toBe(1200);
    expect(parsedResult.splits).toHaveLength(3);
    expect(parsedResult.splits[0].amount).toBe(400);
  });
});
```

### 2. Integration Testing

Test tool integration with the AI model:

```typescript
// app/api/chat/route.test.ts
import { POST } from './route';

describe('POST /api/chat', () => {
  it('should handle tool calls correctly', async () => {
    const mockRequest = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: 'Split ₹1200 for pizza with Rahul and Shreya',
          },
        ],
      }),
    });

    const response = await POST(mockRequest);
    expect(response.status).toBe(200);
  });
});
```

## Best Practices

### 1. Descriptive Tool Names

Use clear, descriptive names for tools:

```typescript
{
  split_bill: splitBillTool,
  show_qr: qrCodeTool,
  send_reminder: reminderTool,
}
```

### 2. Comprehensive Descriptions

Provide detailed descriptions for tools and parameters:

```typescript
export const splitBillTool = tool({
  description: "Split a bill equally among participants",
  parameters: z.object({
    amount: z.number().positive().describe("Total amount of the bill in rupees"),
    description: z.string().min(1).describe("Description of the expense (e.g., 'Pizza dinner')"),
    participants: z.array(z.string()).min(2).describe("List of people involved in the expense"),
  }),
  // ...
});
```

### 3. Consistent Return Formats

Maintain consistent return formats across tools:

```typescript
// All tools return JSON strings
return JSON.stringify({
  success: true,
  data: resultData,
});
```

## Security Considerations

### 1. Input Validation

Validate all tool inputs:

```typescript
const splitBillSchema = z.object({
  amount: z.number().positive().max(1000000), // Limit maximum amount
  description: z.string().min(1).max(100), // Limit description length
  participants: z.array(z.string().min(1).max(50)).min(2).max(20), // Limit participants
});
```

### 2. Data Encoding

Encode all user data in URLs:

```typescript
const encodedName = encodeURIComponent(name);
const encodedMessage = encodeURIComponent(message);
```

## Performance Optimization

### 1. Caching

Cache frequently used data:

```typescript
// Cache UPI QR codes for repeated requests
const qrCodeCache = new Map<string, string>();

export const qrCodeTool = tool({
  // ...
  execute: async ({ amount, description, upiId }) => {
    const cacheKey = `${upiId}-${amount}`;
    
    // Check cache first
    if (qrCodeCache.has(cacheKey)) {
      return qrCodeCache.get(cacheKey)!;
    }
    
    // Generate QR code
    const qrCode = await generateUpiQrCode(/* ... */);
    
    // Cache result
    qrCodeCache.set(cacheKey, qrCode);
    
    return qrCode;
  },
});
```

### 2. Lazy Loading

Load heavy dependencies lazily:

```typescript
// Load QRCode library only when needed
export async function generateUpiQrCode(upiLink: string): Promise<string> {
  try {
    // Dynamically import QRCode library to avoid server-side issues
    const QRCode = (await import('qrcode')).default;
    const qrCodeDataUrl = await QRCode.toDataURL(upiLink);
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}
```

## Conclusion

The expense splitting implementation in SplitMate using the Vercel AI SDK provides a powerful, intuitive way for users to manage shared expenses. By combining natural language processing with custom tools and UI components, SplitMate makes bill splitting as simple as having a conversation.