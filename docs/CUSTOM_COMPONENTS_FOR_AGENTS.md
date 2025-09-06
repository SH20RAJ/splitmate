# Custom Components for Agents in SplitMate

This document explains how SplitMate creates custom React components for AI agents to provide rich, interactive experiences for expense management.

## Overview

SplitMate uses custom React components to enhance the AI assistant's capabilities for expense management. These components provide visual feedback and interactive elements when the AI performs specific actions like bill splitting, QR code generation, and sending reminders.

## Component Architecture

### 1. Tool-to-Component Mapping

SplitMate maps AI tool calls to custom React components using Assistant UI's tool component system:

```typescript
// In the Thread component
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

### 2. Custom Component Structure

Each custom component follows a consistent structure:

```typescript
// components/assistant-ui/split-bill-component.tsx
import { ToolCallContentPartComponent } from "@assistant-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SplitBillComponent: ToolCallContentPartComponent = ({
  toolName,
  args,
  result,
}) => {
  // Parse the arguments and result
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

## Bill Splitting Component

### 1. Purpose

The `SplitBillComponent` displays bill splitting results in a visually appealing card format.

### 2. Implementation

```typescript
// components/assistant-ui/split-bill-component.tsx
import { ToolCallContentPartComponent } from "@assistant-ui/react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { IndianRupeeIcon, UserIcon } from "lucide-react";

export const SplitBillComponent: ToolCallContentPartComponent = ({
  toolName,
  args,
  result,
}) => {
  // Parse the arguments and result
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
            <span className="text-lg font-bold">₹{splitData.totalAmount.toFixed(2)}</span>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Split Among:</h4>
            {splitData.splits.map((split: any, index: number) => (
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

## QR Code Component

### 1. Purpose

The `QrCodeComponent` displays UPI QR codes for easy payment processing.

### 2. Implementation

```typescript
// components/assistant-ui/qr-code-component.tsx
import { ToolCallContentPartComponent } from "@assistant-ui/react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { QrCodeIcon, CopyIcon, CheckIcon } from "lucide-react";
import { useState } from "react";

export const QrCodeComponent: ToolCallContentPartComponent = ({
  toolName,
  args,
  result,
}) => {
  // Parse the arguments and result
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

## Reminder Component

### 1. Purpose

The `ReminderComponent` provides options for sending payment reminders via WhatsApp or Web Share API.

### 2. Implementation

```typescript
// components/assistant-ui/reminder-component.tsx
import { ToolCallContentPartComponent } from "@assistant-ui/react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { MessageCircleIcon, Share2Icon } from "lucide-react";

export const ReminderComponent: ToolCallContentPartComponent = ({
  toolName,
  args,
  result,
}) => {
  // Parse the arguments and result
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

## Component Integration

### 1. Thread Component

Custom components are registered in the Thread component:

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
import type { FC } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  CopyIcon,
  CheckIcon,
  PencilIcon,
  RefreshCwIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
 Square,
  IndianRupeeIcon,
} from "lucide-react";

import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MarkdownText } from "./markdown-text";
import { ToolFallback } from "./tool-fallback";

// Custom components for SplitMate
import { SplitBillComponent } from "@/components/assistant-ui/split-bill-component";
import { QrCodeComponent } from "@/components/assistant-ui/qr-code-component";
import { ReminderComponent } from "@/components/assistant-ui/reminder-component";

export const SplitMateThread: FC = () => {
  return (
    <ThreadPrimitive.Root
      className="bg-background flex h-full flex-col min-h-screen"
      style={{
        ["--thread-max-width" as string]: "48rem",
        ["--thread-padding-x" as string]: "1rem",
      }}
    >
      <ThreadPrimitive.Viewport className="relative flex min-w-0 flex-1 flex-col gap-6 overflow-y-scroll">
        <ThreadWelcome />

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            EditComposer,
            AssistantMessage,
          }}
        />

        <ThreadPrimitive.If empty={false}>
          <motion.div className="min-h-6 min-w-6 shrink-0" />
        </ThreadPrimitive.If>
      </ThreadPrimitive.Viewport>

      <Composer />
    </ThreadPrimitive.Root>
  );
};

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        className="dark:bg-background dark:hover:bg-accent absolute -top-12 z-10 self-center rounded-full p-4 disabled:invisible"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const ThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      <div className="mx-auto flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col px-[var(--thread-padding-x)]">
        <div className="flex w-full flex-grow flex-col items-center justify-center">
          <div className="flex size-full flex-col justify-center px-8 md:mt-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-semibold"
            >
              Welcome to SplitMate!
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground/65 text-2xl"
            >
              Your AI-powered expense splitting assistant
            </motion.div>
          </div>
        </div>
      </div>
    </ThreadPrimitive.Empty>
  );
};

const ThreadWelcomeSuggestions: FC = () => {
  return (
    <div className="grid w-full gap-2 sm:grid-cols-2">
      {[
        {
          title: "Add an expense",
          label: "I spent ₹500 on dinner",
          action: "I spent ₹500 on dinner with Rahul and Shreya",
        },
        {
          title: "Split a bill",
          label: "Split ₹1200 for pizza",
          action: "Split ₹1200 for pizza with Rahul and Shreya",
        },
        {
          title: "Check balances",
          label: "Who owes me money?",
          action: "Who owes me money?",
        },
        {
          title: "Send reminder",
          label: "Remind Rahul about payment",
          action: "Remind Rahul about the ₹400 he owes me for pizza",
        },
      ].map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className="[&:nth-child(n+3)]:hidden sm:[&:nth-child(n+3)]:block"
        >
          <ThreadPrimitive.Suggestion
            prompt={suggestedAction.action}
            method="replace"
            autoSend
            asChild
          >
            <Button
              variant="ghost"
              className="dark:hover:bg-accent/60 h-auto w-full flex-1 flex-wrap items-start justify-start gap-1 rounded-xl border px-4 py-3.5 text-left text-sm sm:flex-col"
              aria-label={suggestedAction.action}
            >
              <span className="font-medium">{suggestedAction.title}</span>
              <p className="text-muted-foreground">{suggestedAction.label}</p>
            </Button>
          </ThreadPrimitive.Suggestion>
        </motion.div>
      ))}
    </div>
  );
};

const Composer: FC = () => {
  return (
    <div className="bg-background relative mx-auto flex w-full max-w-[var(--thread-max-width)] flex-col gap-4 px-[var(--thread-padding-x)] pb-4 md:pb-6">
      <ThreadScrollToBottom />
      <ThreadPrimitive.Empty>
        <ThreadWelcomeSuggestions />
      </ThreadPrimitive.Empty>
      <ComposerPrimitive.Root className="focus-within::ring-offset-2 relative flex w-full flex-col rounded-2xl focus-within:ring-2 focus-within:ring-green-50">
        <ComposerPrimitive.Input
          placeholder="Tell me about your expenses..."
          className={
            "bg-muted border-border dark:border-muted-foreground/15 focus:outline-green-500 placeholder:text-muted-foreground max-h-[calc(50dvh)] min-h-16 w-full resize-none rounded-t-2xl border-x border-t px-4 pt-2 pb-3 text-base outline-none"
          }
          rows={1}
          autoFocus
          aria-label="Expense message input"
        />
        <ComposerAction />
      </ComposerPrimitive.Root>
    </div>
  );
};

const ComposerAction: FC = () => {
  return (
    <div className="bg-muted border-border dark:border-muted-foreground/15 relative flex items-center justify-between rounded-b-2xl border-x border-b p-2">
      <TooltipIconButton
        tooltip="Attach receipt"
        variant="ghost"
        className="hover:bg-foreground/15 dark:hover:bg-background/50 scale-115 p-3.5"
        onClick={() => {
          console.log("Attachment clicked - not implemented");
        }}
      >
        <PlusIcon />
      </TooltipIconButton>

      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <Button
            type="submit"
            variant="default"
            className="dark:border-muted-foreground/90 border-muted-foreground/60 hover:bg-green-600 size-8 rounded-full border bg-green-500"
            aria-label="Send message"
          >
            <ArrowUpIcon className="size-5" />
          </Button>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>

      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <Button
            type="button"
            variant="default"
            className="dark:border-muted-foreground/90 border-muted-foreground/60 hover:bg-green-600 size-8 rounded-full border bg-green-500"
            aria-label="Stop generating"
          >
            <Square className="size-3.5 fill-white dark:size-4 dark:fill-black" />
          </Button>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </div>
  );
};

const MessageError: FC = () => {
  return (
    <MessagePrimitive.Error>
      <ErrorPrimitive.Root className="border-destructive bg-destructive/10 dark:bg-destructive/5 text-destructive mt-2 rounded-md border p-3 text-sm dark:text-red-200">
        <ErrorPrimitive.Message className="line-clamp-2" />
      </ErrorPrimitive.Root>
    </MessagePrimitive.Error>
  );
};

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

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      autohideFloat="single-branch"
      className="text-muted-foreground data-floating:bg-background col-start-3 row-start-2 mt-3 ml-3 flex gap-1 data-floating:absolute data-floating:mt-2 data-floating:rounded-md data-floating:border data-floating:p-1 data-floating:shadow-sm"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip="Copy">
          <MessagePrimitive.If copied>
            <CheckIcon />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip="Refresh">
          <RefreshCwIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  );
};

const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root asChild>
      <motion.div
        className="mx-auto grid w-full max-w-[var(--thread-max-width)] auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-1 px-[var(--thread-padding-x)] py-4 [&:where(>*)]:col-start-2"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role="user"
      >
        <UserActionBar />

        <div className="bg-muted text-foreground col-start-2 rounded-3xl px-5 py-2.5 break-words">
          <MessagePrimitive.Content components={{ Text: MarkdownText }} />
        </div>

        <BranchPicker className="col-span-full col-start-1 row-start-3 -mr-1 justify-end" />
      </motion.div>
    </MessagePrimitive.Root>
  );
};

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="col-start-1 mt-2.5 mr-3 flex flex-col items-end"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton tooltip="Edit">
          <PencilIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};

const EditComposer: FC = () => {
  return (
    <div className="mx-auto flex w-full max-w-[var(--thread-max-width)] flex-col gap-4 px-[var(--thread-padding-x)]">
      <ComposerPrimitive.Root className="bg-muted ml-auto flex w-full max-w-7/8 flex-col rounded-xl">
        <ComposerPrimitive.Input
          className="text-foreground flex min-h-[60px] w-full resize-none bg-transparent p-4 outline-none"
          autoFocus
        />

        <div className="mx-3 mb-3 flex items-center justify-center gap-2 self-end">
          <ComposerPrimitive.Cancel asChild>
            <Button variant="ghost" size="sm" aria-label="Cancel edit">
              Cancel
            </Button>
          </ComposerPrimitive.Cancel>
          <ComposerPrimitive.Send asChild>
            <Button size="sm" aria-label="Update message">
              Update
            </Button>
          </ComposerPrimitive.Send>
        </div>
      </ComposerPrimitive.Root>
    </div>
  );
};

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn(
        "text-muted-foreground inline-flex items-center text-xs",
        className,
      )}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip="Previous">
          <ChevronLeftIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className="font-medium">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip="Next">
          <ChevronRightIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};
```

## Styling Customizations

### 1. Consistent Design Language

All components follow a consistent design language:

```css
/* globals.css */
:root {
  --sidebar-primary: 172 78% 30%; /* Teal */
  --sidebar-primary-foreground: 0 0% 100%;
}
```

### 2. Responsive Design

Components are designed to be responsive:

```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {/* Responsive grid layout */}
</div>
```

### 3. Dark Mode Support

Components support dark mode:

```typescript
<div className="dark:bg-background dark:hover:bg-accent/60">
  {/* Dark mode classes */}
</div>
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

const HeavyComponent = dynamic(
  () => import('@/components/assistant-ui/heavy-component'),
  { ssr: false }
);
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

## Testing

### 1. Component Testing

Test individual components with mock data:

```typescript
// components/assistant-ui/split-bill-component.test.tsx
import { render, screen } from '@testing-library/react';
import { SplitBillComponent } from './split-bill-component';

describe('SplitBillComponent', () => {
  it('should render bill split details', () => {
    const mockResult = JSON.stringify({
      totalAmount: 1200,
      splits: [
        { person: 'You', amount: 400 },
        { person: 'Rahul', amount: 400 },
        { person: 'Shreya', amount: 400 },
      ],
      description: 'Pizza night',
    });

    render(
      <SplitBillComponent
        toolName="split_bill"
        args={{}}
        result={mockResult}
      />
    );

    expect(screen.getByText('Bill Split Details')).toBeInTheDocument();
    expect(screen.getByText('₹1200.00')).toBeInTheDocument();
  });
});
```

### 2. Integration Testing

Test component integration with the AI model:

```typescript
// app/chat/page.test.tsx
import { render, screen } from '@testing-library/react';
import ChatPage from './page';

describe('ChatPage', () => {
  it('should render SplitMateThread component', () => {
    render(<ChatPage />);
    expect(screen.getByText('Welcome to SplitMate!')).toBeInTheDocument();
  });
});
```

## Best Practices

### 1. Descriptive Component Names

Use clear, descriptive names for components:

```typescript
{
  SplitBillComponent,
  QrCodeComponent,
  ReminderComponent,
}
```

### 2. Consistent Props Interface

Define consistent props interfaces:

```typescript
interface ComponentProps {
  // Props definition
}

const Component: React.FC<ComponentProps> = ({ ... }) => {
  // Component implementation
};
```

### 3. Error Boundary Implementation

Wrap components in error boundaries:

```typescript
class ComponentErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with this component.</div>;
    }

    return this.props.children;
  }
}
```

## Security Considerations

### 1. Input Validation

Validate all component inputs:

```typescript
const amountNum = parseFloat(amount);
if (isNaN(amountNum) || amountNum <= 0) {
  throw new Error('Invalid amount');
}
```

### 2. Data Encoding

Encode all user data in URLs:

```typescript
const encodedMessage = encodeURIComponent(message);
```

## Conclusion

The custom components for agents in SplitMate provide a rich, interactive experience that enhances the AI assistant's capabilities. By mapping specific tool calls to visually appealing components, SplitMate makes expense management more intuitive and user-friendly.