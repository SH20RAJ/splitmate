# Reminder Integration in SplitMate

This document explains how SplitMate integrates WhatsApp and Web Share API for sending payment reminders.

## Overview

SplitMate provides multiple channels for sending payment reminders to users, including WhatsApp messaging and native Web Share API integration. This allows users to choose their preferred method for reminding others about pending payments.

## WhatsApp Integration

### 1. WhatsApp Deep Links

SplitMate generates WhatsApp deep links with pre-filled messages containing payment details:

```
https://wa.me/?text={encoded_message}
```

### 2. Message Template

The reminder message follows this template:

```
Hey! You owe me ₹{amount} for {description}. Pay here: {upi_link}
```

### 3. Implementation

The WhatsApp reminder generation is implemented in `lib/upi.ts`:

```typescript
// lib/upi.ts
export function generateWhatsAppReminderMessage(
  amount: number, 
  description: string, 
  upiLink: string
): string {
  const message = `Hey! You owe me ₹${amount} for ${description}. Pay here: ${upiLink}`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/?text=${encodedMessage}`;
}
```

### 4. API Endpoint

The WhatsApp reminder generation is exposed through an API endpoint:

```typescript
// app/api/splitmate/remind/route.ts
export async function POST(req: NextRequest) {
  const { amount, description, recipientName, upiId } = await req.json();
  
  // Generate UPI link
  const upiLink = generateUpiLink(userUpiId, userName, amount);
  
  // Generate WhatsApp reminder
  const whatsappLink = generateWhatsAppReminderMessage(amount, description, upiLink);
  
  return NextResponse.json({ whatsappLink });
}
```

## Web Share API Integration

### 1. Web Share API

SplitMate uses the Web Share API for native sharing on mobile devices:

```typescript
// Client-side implementation
async function sharePaymentRequest(amount: number, description: string, upiLink: string) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'SplitMate Payment Request',
        text: `You owe ₹${amount} for ${description}. Click to pay:`,
        url: upiLink,
      });
    } catch (err) {
      console.error('Error sharing:', err);
    }
  } else {
    // Fallback to copying the link
    await navigator.clipboard.writeText(upiLink);
    alert('UPI link copied to clipboard!');
  }
}
```

### 2. Implementation

The Web Share API integration is implemented in `lib/upi.ts`:

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

## Client-Side Integration

### 1. Reminder Component

SplitMate provides a reminder component for the UI:

```typescript
// components/splitmate/remind-user.tsx
import { useSplitMate } from '@/hooks/use-splitmate';

export function RemindUser() {
  const { sendReminder, isLoading } = useSplitMate();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleRemind = async () => {
    const result = await sendReminder({
      amount: parseFloat(amount),
      description,
      recipientName: 'Friend',
    });

    if (result) {
      // Open WhatsApp link or trigger Web Share
      if (result.whatsappLink) {
        window.open(result.whatsappLink, '_blank');
      }
    }
  };

  return (
    <div>
      <input 
        type="number" 
        placeholder="Amount"
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Description"
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button onClick={handleRemind} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Reminder'}
      </button>
    </div>
  );
}
```

## Reminder Workflow

### 1. User Flow

1. User selects a pending payment to remind about
2. SplitMate generates a UPI deep link for the payment
3. User chooses to send reminder via WhatsApp or Web Share
4. Pre-filled message is sent with payment link
5. Recipient clicks link to pay via UPI

### 2. Example Message

```
Hey! You owe me ₹500 for Pizza night. Pay here: upi://pay?pa=user@upi&pn=SplitMate%20User&am=500&cu=INR
```

## Cross-Platform Support

### 1. Mobile Devices

On mobile devices, SplitMate prioritizes native sharing:

```typescript
if (navigator.share) {
  // Use Web Share API
  await navigator.share(shareData);
} else {
  // Fallback to WhatsApp or copy link
}
```

### 2. Desktop Browsers

On desktop browsers, SplitMate provides alternatives:

```typescript
// Copy link to clipboard
await navigator.clipboard.writeText(upiLink);
alert('Payment link copied to clipboard!');
```

## Security Considerations

### 1. Data Encoding

All user data in reminder messages is properly URL-encoded:

```typescript
const encodedMessage = encodeURIComponent(message);
```

### 2. Link Validation

Payment links are validated before sending:

```typescript
if (!isValidUpiLink(upiLink)) {
  throw new Error('Invalid UPI link');
}
```

## Error Handling

### 1. WhatsApp Unavailability

Handle cases where WhatsApp is not installed:

```typescript
try {
  window.open(whatsappLink, '_blank');
} catch (error) {
  console.error('Failed to open WhatsApp:', error);
  // Fallback to copy link
}
```

### 2. Web Share API Failures

Handle Web Share API failures gracefully:

```typescript
try {
  await navigator.share(shareData);
} catch (error) {
  console.error('Web Share failed:', error);
  // Fallback to copy link
}
```

## Testing

### 1. WhatsApp Testing

For testing WhatsApp integration:
- Use WhatsApp Web for desktop testing
- Test with real WhatsApp accounts
- Verify message formatting

### 2. Web Share Testing

Test Web Share API on:
- Mobile Chrome/Firefox/Safari
- Desktop browsers (should fallback)
- Various device orientations

## Best Practices

### 1. User Experience

Provide clear instructions for users:

```typescript
<p>Choose how you'd like to remind your friend about this payment:</p>
<div className="flex gap-2">
  <button onClick={shareViaWhatsApp}>WhatsApp</button>
  <button onClick={shareViaWebShare}>Share</button>
</div>
```

### 2. Fallback Options

Always provide fallback options for unsupported features:

```typescript
if (!navigator.share) {
  // Provide copy-to-clipboard functionality
  navigator.clipboard.writeText(paymentLink);
}
```

## Compliance

### 1. WhatsApp Policies

SplitMate complies with WhatsApp's terms of service:
- No spamming or bulk messaging
- User-initiated reminders only
- Clear opt-out mechanisms

### 2. Data Privacy

No personal data is shared with third parties:
- Payment links are generated client-side
- Reminder messages contain only necessary information
- Users control what information they share

## Future Enhancements

### 1. SMS Integration

Planned support for SMS reminders:
- Integration with SMS APIs
- Support for international phone numbers

### 2. Email Reminders

Implementation of email-based reminders:
- HTML email templates
- Payment tracking links

### 3. Scheduled Reminders

Feature for scheduling automatic reminders:
- Recurring payment reminders
- Custom reminder schedules

## Conclusion

The reminder integration in SplitMate provides users with flexible options for sending payment reminders. By leveraging both WhatsApp and Web Share API, SplitMate ensures optimal user experience across different devices and platforms while maintaining compliance with relevant policies and data privacy standards.