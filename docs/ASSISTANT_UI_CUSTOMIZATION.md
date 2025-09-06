# Assistant UI Customization in SplitMate

This document explains how SplitMate customizes the Assistant UI to create a unique expense management chat experience.

## Overview

SplitMate uses Assistant UI as the foundation for its chat interface, but extensively customizes it to match the brand identity and provide specialized functionality for expense management.

## Customization Approach

### 1. Branding Removal

SplitMate removes all Assistant UI branding and replaces it with its own:

```typescript
// Before (Assistant UI default)
<Link href="https://www.assistant-ui.com/docs/getting-started" target="_blank">
  AC
</Link>

// After (SplitMate custom)
<Link href="/">
  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
    <IndianRupeeIcon size={14} className="text-white" />
  </div>
  <div className="flex flex-col gap-0.5 leading-none">
    <span className="font-semibold">SplitMate</span>
  </div>
</Link>
```

### 2. Color Scheme

SplitMate uses a custom color scheme with teal as the primary color:

```css
/* globals.css */
:root {
  --sidebar-primary: 172 78% 30%; /* Teal */
  --sidebar-primary-foreground: 0 0% 100%;
}
```

## Custom Components

### 1. Thread Component

SplitMate customizes the Thread component to match its design:

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
import { IndianRupeeIcon, UserIcon } from "lucide-react";

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
```

### 2. Message Components

Custom message components with SplitMate branding:

```typescript
// Assistant message with SplitMate branding
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

### 3. User Message Component

Custom user message component:

```typescript
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
```

## Custom Tool UI Components

### 1. Bill Splitting Component

Custom UI for bill splitting results:

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

### 2. QR Code Component

Custom UI for displaying UPI QR codes:

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

### 3. Reminder Component

Custom UI for sending payment reminders:

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

## Custom Composer

### 1. Input Field

Customized composer input field:

```typescript
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
```

### 2. Action Buttons

Customized composer action buttons:

```typescript
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
```

## Custom Welcome Screen

### 1. Welcome Message

Custom welcome message for SplitMate:

```typescript
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
```

### 2. Welcome Suggestions

Custom welcome suggestions for SplitMate:

```typescript
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
```

## Integration with Layout

### 1. App Layout

Integration with the main app layout:

```typescript
// app/layout.tsx
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Inter } from "next/font/google";
import "./globals.css";
import { SplitMateRuntimeProvider } from "@/app/splitmate-runtime-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <SplitMateRuntimeProvider>
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {children}
              </div>
            </SplitMateRuntimeProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
```

### 2. Page Integration

Integration with individual pages:

```typescript
// app/page.tsx
import { SplitMateThread } from "@/components/assistant-ui/splitmate-thread";
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function Home() {
  // Get the current user
  const user = await stackServerApp.getUser({ or: "redirect" });
  
  // Redirect to sign in if user is not authenticated
  if (!user) {
    redirect('/sign-in');
  }

  return <SplitMateThread />;
}
```

## Styling Customizations

### 1. CSS Variables

Custom CSS variables for consistent styling:

```css
/* globals.css */
:root {
  --thread-max-width: 48rem;
  --thread-padding-x: 1rem;
  --sidebar-primary: 172 78% 30%; /* Teal */
  --sidebar-primary-foreground: 0 0% 100%;
}
```

### 2. Component Styling

Custom styling for components:

```typescript
// Custom button styling
<Button
  className="dark:border-muted-foreground/90 border-muted-foreground/60 hover:bg-green-600 size-8 rounded-full border bg-green-500"
  aria-label="Send message"
>
  <ArrowUpIcon className="size-5" />
</Button>
```

## Animation Enhancements

### 1. Motion Components

Using Framer Motion for smooth animations:

```typescript
import { motion } from "framer-motion";

<motion.div
  initial={{ y: 5, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ opacity: 0, y: 10 }}
  transition={{ delay: 0.5 }}
  className="text-2xl font-semibold"
>
  Welcome to SplitMate!
</motion.div>
```

### 2. Animated Transitions

Smooth transitions between states:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  transition={{ delay: 0.05 * index }}
  className="[&:nth-child(n+3)]:hidden sm:[&:nth-child(n+3)]:block"
>
  {/* Content */}
</motion.div>
```

## Responsive Design

### 1. Mobile-First Approach

Responsive design for all screen sizes:

```typescript
<div className="flex flex-col sm:flex-row gap-2 pt-4">
  <Button className="flex-1">Primary Action</Button>
  <Button variant="outline">Secondary Action</Button>
</div>
```

### 2. Adaptive Layout

Layout that adapts to different screen sizes:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Cards that adapt to screen size */}
</div>
```

## Accessibility Features

### 1. Semantic HTML

Proper semantic HTML for accessibility:

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

Proper ARIA labels for interactive elements:

```typescript
<Button
  aria-label="Send message"
  className="size-8 rounded-full"
>
  <ArrowUpIcon className="size-5" />
</Button>
```

## Performance Optimizations

### 1. Memoization

Memoizing components for performance:

```typescript
import { memo } from "react";

const MemoizedComponent = memo(({ data }) => {
  // Component implementation
});
```

### 2. Lazy Loading

Lazy loading heavy components:

```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(
  () => import('@/components/heavy-component'),
  { ssr: false }
);
```

## Testing

### 1. Component Testing

Testing custom components:

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
    expect(screen.getByText('₹1200')).toBeInTheDocument();
  });
});
```

### 2. Integration Testing

Testing component integration:

```typescript
// app/page.test.tsx
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('should render SplitMateThread component', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to SplitMate!')).toBeInTheDocument();
  });
});
```

## Best Practices

### 1. Descriptive Component Names

Use clear, descriptive names for components:

```typescript
{
  SplitMateThread,
  SplitBillComponent,
  QrCodeComponent,
  ReminderComponent,
}
```

### 2. Consistent Styling

Maintain consistent styling across components:

```css
/* globals.css */
:root {
  --sidebar-primary: 172 78% 30%; /* Teal */
  --sidebar-primary-foreground: 0 0% 100%;
}
```

### 3. Proper Error Handling

Implement proper error handling:

```typescript
if (error) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
      <p>Error: {error}</p>
    </div>
  );
}
```

## Security Considerations

### 1. Input Validation

Validate all user inputs:

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

The Assistant UI customization in SplitMate creates a unique, branded experience that aligns with the application's purpose of expense management. Through careful customization of components, colors, and functionality, SplitMate provides users with an intuitive interface for splitting bills, generating QR codes, and sending payment reminders while maintaining the powerful capabilities of the underlying Assistant UI framework.