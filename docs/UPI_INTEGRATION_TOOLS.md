# UPI Integration Tools in SplitMate

This document explains how SplitMate implements UPI integration tools for generating payment links and QR codes.

## Overview

SplitMate provides UPI integration tools that enable users to generate payment links and QR codes for seamless expense settlements. These tools leverage the UPI ecosystem to create a frictionless payment experience.

## UPI Link Generation

### 1. Purpose

The UPI link generation tool creates deep links that can be opened directly in UPI apps.

### 2. Implementation

```typescript
// lib/upi.ts
export function generateUpiLink(
  upiId: string, 
  name: string, 
  amount: number, 
  currency: string = 'INR'
): string {
  // Encode user data to prevent injection attacks
  const encodedName = encodeURIComponent(name);
  const encodedUpiId = encodeURIComponent(upiId);
  
  // Generate UPI deep link
  return `upi://pay?pa=${encodedUpiId}&pn=${encodedName}&am=${amount}&cu=${currency}`;
}
```

### 3. Usage

```typescript
// Generate UPI link for payment
const upiLink = generateUpiLink('user@upi', 'SplitMate User', 500);
// Result: upi://pay?pa=user@upi&pn=SplitMate%20User&am=500&cu=INR
```

## QR Code Generation

### 1. Purpose

The QR code generation tool creates scannable QR codes from UPI links.

### 2. Implementation

```typescript
// lib/upi.ts
import QRCode from 'qrcode';

export async function generateUpiQrCode(upiLink: string): Promise<string> {
  try {
    // Generate QR code data URL
    const qrCodeDataUrl = await QRCode.toDataURL(upiLink);
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}
```

### 3. Usage

```typescript
// Generate QR code for UPI payment
const upiLink = generateUpiLink('user@upi', 'SplitMate User', 500);
const qrCode = await generateUpiQrCode(upiLink);
// Result: data:image/png;base64,...
```

## WhatsApp Reminder Generation

### 1. Purpose

The WhatsApp reminder tool generates pre-filled messages for sending payment reminders.

### 2. Implementation

```typescript
// lib/upi.ts
export function generateWhatsAppReminderMessage(
  amount: number, 
  description: string, 
  upiLink: string
): string {
  // Create reminder message
  const message = `Hey! You owe me ₹${amount} for ${description}. Pay here: ${upiLink}`;
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Generate WhatsApp deep link
  return `https://wa.me/?text=${encodedMessage}`;
}
```

### 3. Usage

```typescript
// Generate WhatsApp reminder
const upiLink = generateUpiLink('user@upi', 'SplitMate User', 500);
const whatsappLink = generateWhatsAppReminderMessage(500, 'Pizza night', upiLink);
// Result: https://wa.me/?text=Hey!%20You%20owe%20me%20%E2%82%B9500%20for%20Pizza%20night.%20Pay%20here:%20upi://pay?pa=user@upi&pn=SplitMate%20User&am=500&cu=INR
```

## Web Share API Integration

### 1. Purpose

The Web Share API tool enables native sharing on mobile devices.

### 2. Implementation

```typescript
// lib/upi.ts
export function generateWebShareData(
  amount: number, 
  description: string, 
  upiLink: string
): { title: string; text: string; url: string } {
  return {
    title: 'SplitMate Payment Request',
    text: `You owe ₹${amount} for ${description}. Click to pay:`,
    url: upiLink,
  };
}
```

### 3. Usage

```typescript
// Generate Web Share API data
const upiLink = generateUpiLink('user@upi', 'SplitMate User', 500);
const webShareData = generateWebShareData(500, 'Pizza night', upiLink);

// Use with Web Share API
if (navigator.share) {
  await navigator.share(webShareData);
}
```

## Tool Integration with Assistant UI

### 1. UPI Tool Registration

UPI tools are registered with the Assistant UI runtime:

```typescript
// app/splitmate-runtime-provider.tsx
import { 
  AssistantRuntimeProvider,
} from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { 
  generateUpiLink, 
  generateUpiQrCode,
  generateWhatsAppReminderMessage,
  generateWebShareData
} from "@/lib/upi";

export function SplitMateRuntimeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Use the chat runtime with our custom API endpoint
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

### 2. Custom Tool Components

Custom components are created for each UPI tool:

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

Custom component for sending payment reminders:

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

## API Integration

### 1. UPI API Route

The UPI tools are exposed through API routes:

```typescript
// app/api/splitmate/upi/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { generateUpiLink, generateUpiQrCode } from '@/lib/upi';

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const body = await req.json();
    const { amount, description, upiId } = body;

    // Validate required fields
    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    // Use provided UPI ID or default to a placeholder
    const userUpiId = upiId || "user@upi";
    const userName = user.displayName || "SplitMate User";
    
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

    return NextResponse.json(qrResult);
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}
```

### 2. Reminder API Route

The reminder tool is exposed through an API route:

```typescript
// app/api/splitmate/remind/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { 
  generateUpiLink, 
  generateWhatsAppReminderMessage,
  generateWebShareData
} from '@/lib/upi';

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const body = await req.json();
    const { amount, description, recipientName, recipientPhone, upiId } = body;

    // Validate required fields
    if (!amount || !description || !recipientName) {
      return NextResponse.json({ error: 'Amount, description, and recipient name are required' }, { status: 400 });
    }

    // Use provided UPI ID or default to a placeholder
    const userUpiId = upiId || "user@upi";
    const userName = user.displayName || "SplitMate User";
    
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

    return NextResponse.json(reminderResult);
  } catch (error) {
    console.error('Error sending reminder:', error);
    return NextResponse.json({ error: 'Failed to send reminder' }, { status: 500 });
  }
}
```

## Client-Side Hook Integration

### 1. UPI Hook

A client-side hook encapsulates UPI tool functionality:

```typescript
// hooks/use-upi.ts
import { useState, useCallback } from 'react';

interface UpiData {
  amount: number;
  description?: string;
  upiId?: string;
}

interface ReminderData {
  amount: number;
  description: string;
  recipientName: string;
  recipientPhone?: string;
  upiId?: string;
}

interface UpiResult {
  qrCode: string;
  upiLink: string;
  amount: number;
  description: string;
}

interface ReminderResult {
  whatsappLink: string;
  webShareData: any;
  upiLink: string;
  amount: number;
  description: string;
  recipientName: string;
}

export function useUpi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate UPI QR code
  const generateQrCode = useCallback(async (data: UpiData): Promise<UpiResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/splitmate/upi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }
      
      const result: UpiResult = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send reminder
  const sendReminder = useCallback(async (data: ReminderData): Promise<ReminderResult | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/splitmate/remind', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send reminder');
      }
      
      const result: ReminderResult = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    generateQrCode,
    sendReminder,
  };
}
```

### 2. Hook Usage

Using the UPI hook in components:

```typescript
// components/splitmate/qr-generator.tsx
import { useUpi } from '@/hooks/use-upi';

export function QrGenerator() {
  const { generateQrCode, isLoading, error } = useUpi();
  const [amount, setAmount] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!amount) return;

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    const result = await generateQrCode({
      amount: amountNum,
      description: 'Payment request',
    });

    if (result) {
      setQrCode(result.qrCode);
    }
  };

  return (
    <div>
      {error && <div className="error">{error}</div>}
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate QR Code'}
      </button>
      {qrCode && <img src={qrCode} alt="UPI QR Code" />}
    </div>
  );
}
```

## Security Considerations

### 1. Data Encoding

All user data is properly encoded to prevent injection attacks:

```typescript
const encodedName = encodeURIComponent(name);
const encodedUpiId = encodeURIComponent(upiId);
```

### 2. Input Validation

Inputs are validated before processing:

```typescript
if (!amount || isNaN(amount) || amount <= 0) {
  throw new Error('Invalid amount');
}
```

### 3. HTTPS Requirements

UPI links should only be used over HTTPS connections:

```typescript
if (window.location.protocol !== 'https:') {
  console.warn('UPI links should be used over HTTPS');
}
```

## Error Handling

### 1. QR Code Generation Errors

Proper error handling for QR code generation:

```typescript
try {
  const qrCode = await generateUpiQrCode(upiLink);
  return qrCode;
} catch (error) {
  console.error('Error generating QR code:', error);
  throw new Error('Failed to generate QR code');
}
```

### 2. Network Errors

Handling network errors in API calls:

```typescript
try {
  const response = await fetch('/api/splitmate/upi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const result = await response.json();
  return result;
} catch (error) {
  console.error('Network error:', error);
  throw new Error('Network error occurred');
}
```

## Testing

### 1. Unit Testing UPI Functions

Test UPI functions with mock data:

```typescript
// lib/upi.test.ts
import { 
  generateUpiLink, 
  generateUpiQrCode,
  generateWhatsAppReminderMessage,
  generateWebShareData
} from './upi';

describe('UPI Functions', () => {
  it('should generate UPI link correctly', () => {
    const upiLink = generateUpiLink('user@upi', 'SplitMate User', 500);
    expect(upiLink).toBe('upi://pay?pa=user@upi&pn=SplitMate%20User&am=500&cu=INR');
  });

  it('should generate WhatsApp reminder message', () => {
    const upiLink = 'upi://pay?pa=user@upi&pn=SplitMate%20User&am=500&cu=INR';
    const whatsappLink = generateWhatsAppReminderMessage(500, 'Pizza night', upiLink);
    expect(whatsappLink).toContain('https://wa.me/?text=');
  });

  it('should generate Web Share data', () => {
    const upiLink = 'upi://pay?pa=user@upi&pn=SplitMate%20User&am=500&cu=INR';
    const webShareData = generateWebShareData(500, 'Pizza night', upiLink);
    expect(webShareData.title).toBe('SplitMate Payment Request');
    expect(webShareData.url).toBe(upiLink);
  });
});
```

### 2. Integration Testing API Routes

Test API routes with mock requests:

```typescript
// app/api/splitmate/upi/route.test.ts
import { POST } from './route';

describe('POST /api/splitmate/upi', () => {
  it('should generate QR code for valid request', async () => {
    const mockRequest = new Request('http://localhost/api/splitmate/upi', {
      method: 'POST',
      body: JSON.stringify({
        amount: 500,
        description: 'Payment request',
      }),
    });

    const response = await POST(mockRequest);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(data.qrCode).toBeDefined();
    expect(data.upiLink).toBeDefined();
  });

  it('should return error for invalid amount', async () => {
    const mockRequest = new Request('http://localhost/api/splitmate/upi', {
      method: 'POST',
      body: JSON.stringify({
        amount: -100, // Invalid amount
        description: 'Payment request',
      }),
    });

    const response = await POST(mockRequest);
    expect(response.status).toBe(400);
    
    const data = await response.json();
    expect(data.error).toBe('Amount is required');
  });
});
```

## Best Practices

### 1. Consistent Naming

Use consistent naming for UPI functions:

```typescript
{
  generateUpiLink,
  generateUpiQrCode,
  generateWhatsAppReminderMessage,
  generateWebShareData,
}
```

### 2. Type Safety

Use TypeScript for type safety:

```typescript
interface UpiData {
  amount: number;
  description?: string;
  upiId?: string;
}

function generateUpiLink(upiId: string, name: string, amount: number): string {
  // Implementation
}
```

### 3. Error Boundaries

Implement error boundaries for UPI components:

```typescript
class UpiErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with UPI integration.</div>;
    }

    return this.props.children;
  }
}
```

## Performance Optimization

### 1. Lazy Loading

Lazy load heavy dependencies:

```typescript
// Dynamically import QRCode library to avoid server-side issues
const QRCode = (await import('qrcode')).default;
```

### 2. Memoization

Memoize expensive calculations:

```typescript
import { useMemo } from "react";

const upiLink = useMemo(() => generateUpiLink(upiId, name, amount), [upiId, name, amount]);
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

The UPI integration tools in SplitMate provide a comprehensive solution for generating payment links, QR codes, and sending reminders. By leveraging standard UPI protocols and modern web APIs, these tools enable seamless expense settlements while maintaining security and user privacy.