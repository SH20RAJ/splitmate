# Vercel AI SDK Custom Tools in SplitMate

This document explains how SplitMate implements custom tools using the Vercel AI SDK to enhance the AI assistant's capabilities for expense management.

## Overview

SplitMate leverages the Vercel AI SDK's tool system to extend the AI assistant's functionality beyond basic text generation. Custom tools enable the assistant to perform specific actions like bill splitting, QR code generation, and sending reminders.

## Tool Architecture

### 1. Tool Definition

SplitMate defines custom tools using the `tool()` helper from `@assistant-ui/react`:

```typescript
// lib/tools/split-bill-tool.ts
import { tool } from "@assistant-ui/react";
import { z } from "zod";

export const splitBillTool = tool({
  description: "Split a bill equally among participants",
  parameters: z.object({
    amount: z.number().positive().describe("Total amount of the bill"),
    description: z.string().min(1).describe("Description of the expense"),
    participants: z.array(z.string()).min(2).describe("List of participants"),
  }),
  execute: async ({ amount, description, participants }) => {
    // Calculate split amount
    const splitAmount = amount / participants.length;
    
    // Create split result
    const splitResult = {
      totalAmount: amount,
      splits: participants.map((person) => ({
        person,
        amount: parseFloat(splitAmount.toFixed(2)),
      })),
      description,
    };
    
    return JSON.stringify(splitResult);
  },
});
```

### 2. Tool Registration

Tools are registered with the AI model in the API route:

```typescript
// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import {
  streamText,
  UIMessage,
  convertToModelMessages,
} from "ai";
import { splitBillTool, qrCodeTool, reminderTool } from "@/lib/tools";

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

## Custom Tool Implementations

### 1. Bill Splitting Tool

The `split_bill` tool calculates equal shares among participants:

```typescript
// lib/tools/split-bill-tool.ts
import { tool } from "@assistant-ui/react";
import { z } from "zod";

export const splitBillTool = tool({
  description: "Split a bill equally among participants",
  parameters: z.object({
    amount: z.number().positive().describe("Total amount of the bill in rupees"),
    description: z.string().min(1).describe("Description of the expense (e.g., 'Pizza dinner')"),
    participants: z.array(z.string()).min(2).describe("List of people involved in the expense"),
  }),
  execute: async ({ amount, description, participants }) => {
    try {
      // Validate inputs
      if (!amount || amount <= 0) {
        throw new Error("Amount must be greater than zero");
      }
      
      if (!description || description.trim() === "") {
        throw new Error("Description is required");
      }
      
      if (!participants || participants.length < 2) {
        throw new Error("At least two participants are required");
      }

      // Calculate split amount
      const splitAmount = amount / participants.length;
      
      // Create split result
      const splitResult = {
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

The `show_qr` tool generates UPI payment QR codes:

```typescript
// lib/tools/qr-code-tool.ts
import { tool } from "@assistant-ui/react";
import { z } from "zod";
import { generateUpiLink, generateUpiQrCode } from "@/lib/upi";

export const qrCodeTool = tool({
  description: "Generate a UPI QR code for payment",
  parameters: z.object({
    amount: z.number().positive().describe("Amount to be paid in rupees"),
    description: z.string().optional().describe("Description of the payment"),
    upiId: z.string().optional().describe("Recipient's UPI ID"),
  }),
  execute: async ({ amount, description, upiId }) => {
    try {
      // Validate amount
      if (!amount || amount <= 0) {
        throw new Error("Amount must be greater than zero");
      }

      // Use provided UPI ID or default to a placeholder
      const userUpiId = upiId || "user@upi";
      const userName = "SplitMate User";
      
      // Generate UPI link
      const upiLink = generateUpiLink(userUpiId, userName, amount);
      
      // Generate QR code
      const qrCode = await generateUpiQrCode(upiLink);
      
      // Create result
      const qrResult = {
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

The `send_reminder` tool sends payment reminders via WhatsApp:

```typescript
// lib/tools/reminder-tool.ts
import { tool } from "@assistant-ui/react";
import { z } from "zod";
import { 
  generateUpiLink, 
  generateWhatsAppReminderMessage,
  generateWebShareData
} from "@/lib/upi";

export const reminderTool = tool({
  description: "Send a payment reminder via WhatsApp",
  parameters: z.object({
    amount: z.number().positive().describe("Amount to be paid in rupees"),
    description: z.string().min(1).describe("Description of the expense"),
    recipientName: z.string().min(1).describe("Name of the recipient"),
    recipientPhone: z.string().optional().describe("Recipient's phone number"),
    upiId: z.string().optional().describe("Recipient's UPI ID"),
  }),
  execute: async ({ amount, description, recipientName, recipientPhone, upiId }) => {
    try {
      // Validate required fields
      if (!amount || amount <= 0) {
        throw new Error("Amount must be greater than zero");
      }
      
      if (!description || description.trim() === "") {
        throw new Error("Description is required");
      }
      
      if (!recipientName || recipientName.trim() === "") {
        throw new Error("Recipient name is required");
      }

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
      const reminderResult = {
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

### 1. Component Mapping

Custom UI components are mapped to tools in the Thread component:

```typescript
// components/assistant-ui/splitmate-thread.tsx
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
```

### 2. Split Bill Component

The `SplitBillComponent` displays bill splitting results:

```typescript
// components/assistant-ui/split-bill-component.tsx
import { ToolCallContentPartComponent } from "@assistant-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupeeIcon, UserIcon } from "lucide-react";

export const SplitBillComponent: ToolCallContentPartComponent = ({
  toolName,
  args,
  result,
}) => {
  // Parse the result
  const splitData = typeof result === "string" ? JSON.parse(result) : result;
  
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
            <span className="text-lg font-bold">₹{splitData.totalAmount}</span>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Split Among:</h4>
            {splitData.splits.map((split: any, index: number) => (
              <div key={index} className="flex justify-between items-center p-2 border-b">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  <span>{split.person}</span>
                </div>
                <span className="font-medium">₹{split.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
```

### 3. QR Code Component

The `QrCodeComponent` displays UPI QR codes:

```typescript
// components/assistant-ui/qr-code-component.tsx
import { ToolCallContentPartComponent } from "@assistant-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCodeIcon, CopyIcon, CheckIcon } from "lucide-react";
import { useState } from "react";

export const QrCodeComponent: ToolCallContentPartComponent = ({
  toolName,
  args,
  result,
}) => {
  // Parse the result
  const qrData = typeof result === "string" ? JSON.parse(result) : result;
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
              <p className="font-semibold">Amount: ₹{qrData.amount}</p>
              <p className="text-sm text-gray-600">Scan to pay</p>
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

### 4. Reminder Component

The `ReminderComponent` provides options for sending payment reminders:

```typescript
// components/assistant-ui/reminder-component.tsx
import { ToolCallContentPartComponent } from "@assistant-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircleIcon, Share2Icon } from "lucide-react";

export const ReminderComponent: ToolCallContentPartComponent = ({
  toolName,
  args,
  result,
}) => {
  // Parse the result
  const reminderData = typeof result === "string" ? JSON.parse(result) : result;
  
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
            Remind {reminderData.recipientName} about the ₹{reminderData.amount} they owe you for {reminderData.description}.
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

## Tool Calling Patterns

### 1. Sequential Tool Calls

The AI can make multiple tool calls in sequence:

```typescript
// First split the bill
{
  "tool_call_id": "call_1",
  "tool_name": "split_bill",
  "args": { 
    "amount": 1200, 
    "description": "Pizza", 
    "participants": ["You", "Rahul", "Shreya"] 
  }
}

// Then generate QR code for one person's share
{
  "tool_call_id": "call_2",
  "tool_name": "show_qr",
  "args": { 
    "amount": 400, 
    "description": "Pizza share", 
    "upiId": "user@upi" 
  }
}

// Finally send reminder to another person
{
  "tool_call_id": "call_3",
  "tool_name": "send_reminder",
  "args": { 
    "amount": 400, 
    "description": "Pizza share", 
    "recipientName": "Rahul" 
  }
}
```

### 2. Parallel Tool Calls

Multiple tools can be called in parallel:

```typescript
// Split bill and generate QR codes for all shares simultaneously
[
  {
    "tool_call_id": "call_1",
    "tool_name": "split_bill",
    "args": { 
      "amount": 1200, 
      "description": "Pizza", 
      "participants": ["You", "Rahul", "Shreya"] 
    }
  },
  {
    "tool_call_id": "call_2",
    "tool_name": "show_qr",
    "args": { 
      "amount": 400, 
      "description": "Your share", 
      "upiId": "user@upi" 
    }
  },
  {
    "tool_call_id": "call_3",
    "tool_name": "send_reminder",
    "args": { 
      "amount": 400, 
      "description": "Pizza share", 
      "recipientName": "Rahul" 
    }
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
export const qrCodeTool = tool({
  parameters: z.object({
    amount: z.number().positive().describe("Amount must be positive"),
    description: z.string().optional().describe("Description of the payment"),
    upiId: z.string().optional().describe("Recipient's UPI ID"),
  }),
  // ...
  execute: async ({ amount, description, upiId }) => {
    // Validate amount
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    
    // Tool logic
    // ...
  },
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
    expect(parsedResult.splits[0]).toEqual({
      person: 'You',
      amount: 400,
    });
  });

  it('should handle zero amount', async () => {
    await expect(
      splitBillTool.execute({
        amount: 0,
        description: 'Invalid expense',
        participants: ['You', 'Rahul'],
      })
    ).rejects.toThrow('Amount must be greater than zero');
  });

  it('should handle single participant', async () => {
    const result = await splitBillTool.execute({
      amount: 500,
      description: 'Solo expense',
      participants: ['You'],
    });
    
    const parsedResult = JSON.parse(result);
    expect(parsedResult.totalAmount).toBe(500);
    expect(parsedResult.splits).toHaveLength(1);
    expect(parsedResult.splits[0]).toEqual({
      person: 'You',
      amount: 500,
    });
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

### 1. Memoization

Memoize expensive calculations:

```typescript
import { useMemo } from "react";

const splits = useMemo(() => calculateSplits(amount, participants), [amount, participants]);
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

## Accessibility Features

### 1. Semantic HTML

Use semantic HTML for accessibility:

```typescript
<Card>
  <CardHeader>
    <CardTitle>Accessible Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Accessible content</p>
  </CardContent>
</Card>
```

### 2. ARIA Labels

Provide proper ARIA labels:

```typescript
<Button aria-label="Generate QR Code">
  Generate QR Code
</Button>
```

## Conclusion

The Vercel AI SDK custom tools integration in SplitMate enables the AI assistant to perform complex actions like bill splitting, QR code generation, and sending reminders. By defining clear tool schemas and implementing custom UI components, SplitMate provides a rich, interactive experience that enhances the AI assistant's capabilities while maintaining type safety and security.