# Vercel AI SDK Integration with Assistant UI

This document explains how SplitMate integrates the Vercel AI SDK with Assistant UI to create a conversational expense management experience.

## Overview

SplitMate uses the Vercel AI SDK for AI capabilities and Assistant UI for the chat interface. This combination provides a powerful foundation for natural language interactions with expense management features.

## Integration Architecture

### 1. Runtime Provider Setup

SplitMate uses `useChatRuntime` from `@assistant-ui/react-ai-sdk` to connect the Vercel AI SDK with Assistant UI.

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

The backend API route uses the Vercel AI SDK to handle chat completions.

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
  });

  return result.toUIMessageStreamResponse();
}
```

## Custom Tool Integration

### 1. Tool Definitions

SplitMate defines custom tools that can be called by the AI assistant:

```typescript
// Example tool definition
const expenseTool = tool({
  parameters: z.object({
    amount: z.number(),
    description: z.string(),
    participants: z.array(z.string()),
  }),
  execute: async ({ amount, description, participants }) => {
    // Logic to split the bill
    const splits = participants.map(person => ({
      person,
      amount: amount / participants.length
    }));
    
    return { splits };
  },
});
```

### 2. Tool UI Components

Custom UI components are created for each tool to provide rich visual feedback:

```typescript
// components/assistant-ui/split-bill-component.tsx
import { ToolCallContentPartComponent } from "@assistant-ui/react";

export const SplitBillComponent: ToolCallContentPartComponent = ({
  toolName,
  args,
  result,
}) => {
  // Render a visual representation of the bill split
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill Split Details</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Display split details */}
      </CardContent>
    </Card>
  );
};
```

## Frontend Implementation

### 1. Thread Component

The main chat interface uses Assistant UI's Thread component:

```typescript
// components/assistant-ui/splitmate-thread.tsx
import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
} from "@assistant-ui/react";

export const SplitMateThread = () => {
  return (
    <ThreadPrimitive.Root>
      <ThreadPrimitive.Viewport>
        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />
      </ThreadPrimitive.Viewport>
      <Composer />
    </ThreadPrimitive.Root>
  );
};
```

### 2. Custom Message Components

Custom message components provide specialized rendering for different message types:

```typescript
// Assistant message with tool support
const AssistantMessage = () => {
  return (
    <MessagePrimitive.Root>
      <MessagePrimitive.Content
        components={{
          Text: MarkdownText,
          tools: { 
            by_name: {
              split_bill: SplitBillComponent,
              show_qr: QrCodeComponent,
            },
            Fallback: ToolFallback,
          },
        }}
      />
    </MessagePrimitive.Root>
  );
};
```

## Advanced Features

### 1. Streaming Responses

The integration supports real-time streaming of AI responses:

```typescript
// In the API route
const result = streamText({
  model: openai("gpt-4o"),
  messages: convertToModelMessages(messages),
});

return result.toUIMessageStreamResponse();
```

### 2. Tool Calling

The AI can call custom tools to perform specific actions:

```typescript
// Define tools that the AI can use
tools: {
  split_bill: expenseTool,
  generate_qr: qrTool,
  send_reminder: reminderTool,
}
```

## Performance Optimizations

### 1. Memoization

Components are memoized to prevent unnecessary re-renders:

```typescript
import { memo } from "react";

const MemoizedComponent = memo(({ data }) => {
  // Component implementation
});
```

### 2. Lazy Loading

Heavy components are lazy-loaded when needed:

```typescript
import dynamic from "next/dynamic";

const QrCodeComponent = dynamic(
  () => import("@/components/assistant-ui/qr-code-component"),
  { ssr: false }
);
```

## Error Handling

### 1. API Error Handling

Proper error handling is implemented in API routes:

```typescript
export async function POST(req: Request) {
  try {
    // API logic
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
```

### 2. Client-side Error Handling

Frontend components handle errors gracefully:

```typescript
const ErrorMessage = ({ error }: { error: string }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
    Error: {error}
  </div>
);
```

## Best Practices

### 1. Type Safety

Use TypeScript for type safety:

```typescript
interface Expense {
  id: string;
  amount: number;
  description: string;
  participants: string[];
}
```

### 2. Environment Variables

Store API keys securely:

```bash
# .env.local
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_ASSISTANT_BASE_URL=...
```

### 3. Component Reusability

Create reusable components:

```typescript
// Generic card component
const DataCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);
```

## Conclusion

The integration of Vercel AI SDK with Assistant UI in SplitMate provides a robust foundation for conversational AI features. This combination enables natural language interactions with powerful backend capabilities, creating a seamless user experience for expense management.