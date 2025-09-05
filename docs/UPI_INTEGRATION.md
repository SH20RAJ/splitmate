# UPI Integration in SplitMate

This document explains how SplitMate integrates UPI (Unified Payments Interface) for seamless payment processing.

## Overview

SplitMate leverages UPI deep links and QR codes to enable one-tap payments between users. This integration allows users to quickly settle debts without sharing sensitive banking information.

## UPI Deep Link Generation

### 1. Deep Link Format

SplitMate generates UPI deep links using the standard UPI URI scheme:

```
upi://pay?pa={upi_id}&pn={name}&am={amount}&cu=INR
```

Where:
- `pa` = Payee Address (UPI ID)
- `pn` = Payee Name
- `am` = Amount
- `cu` = Currency (INR for Indian Rupees)

### 2. Implementation

The UPI link generation is implemented in `lib/upi.ts`:

```typescript
// lib/upi.ts
export function generateUpiLink(
  upiId: string, 
  name: string, 
  amount: number, 
  currency: string = 'INR'
): string {
  const encodedName = encodeURIComponent(name);
  return `upi://pay?pa=${upiId}&pn=${encodedName}&am=${amount}&cu=${currency}`;
}
```

## QR Code Generation

### 1. QR Code Library

SplitMate uses the `qrcode` library to generate QR codes from UPI deep links:

```typescript
// lib/upi.ts
import QRCode from 'qrcode';

export async function generateUpiQrCode(upiLink: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(upiLink);
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}
```

### 2. API Endpoint

The QR code generation is exposed through an API endpoint:

```typescript
// app/api/splitmate/qr/route.ts
export async function POST(req: NextRequest) {
  const { amount, description, upiId } = await req.json();
  
  // Generate UPI link
  const upiLink = generateUpiLink(userUpiId, userName, amount);
  
  // Generate QR code
  const qrCode = await generateUpiQrCode(upiLink);
  
  return NextResponse.json({ qrCode, upiLink, amount });
}
```

## Client-Side Integration

### 1. QR Generator Component

SplitMate provides a QR generator component for the UI:

```typescript
// components/splitmate/qr-generator.tsx
import { useSplitMate } from '@/hooks/use-splitmate';

export function QrGenerator() {
  const { generateQrCode, isLoading, error } = useSplitMate();
  const [amount, setAmount] = useState('');
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleGenerate = async () => {
    const result = await generateQrCode({
      amount: parseFloat(amount),
    });

    if (result) {
      setQrCode(result.qrCode);
    }
  };

  return (
    <div>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate QR Code'}
      </button>
      
      {qrCode && <img src={qrCode} alt="UPI Payment QR Code" />}
    </div>
  );
}
```

## Payment Workflow

### 1. User Flow

1. User enters an amount to pay
2. SplitMate generates a UPI deep link
3. QR code is generated from the UPI link
4. User scans the QR code with their UPI app
5. Payment is processed through the UPI network

### 2. Deep Link Example

```
upi://pay?pa=user@upi&pn=SplitMate%20User&am=500&cu=INR
```

When scanned, this link opens the user's default UPI app with the payment details pre-filled.

## Security Considerations

### 1. Data Encoding

All user data in UPI links is properly URL-encoded to prevent injection attacks:

```typescript
const encodedName = encodeURIComponent(name);
```

### 2. Client-Side Generation

QR codes are generated client-side to minimize server exposure to sensitive payment data.

### 3. HTTPS Requirements

UPI deep links should only be used over HTTPS connections to ensure secure transmission.

## Error Handling

### 1. Invalid Amounts

SplitMate validates payment amounts before generating UPI links:

```typescript
if (!amount || isNaN(amount) || amount <= 0) {
  throw new Error('Invalid amount');
}
```

### 2. QR Code Generation Failures

Proper error handling for QR code generation failures:

```typescript
try {
  const qrCode = await generateUpiQrCode(upiLink);
  return qrCode;
} catch (error) {
  console.error('Failed to generate QR code:', error);
  throw new Error('Unable to generate payment QR code');
}
```

## Testing

### 1. UPI Test IDs

For testing purposes, developers can use test UPI IDs:

- `test@upi` - Generic test ID
- `success@upi` - Always succeeds
- `failure@upi` - Always fails

### 2. Sandbox Environments

Popular UPI apps provide sandbox environments for testing:
- PhonePe: Developer sandbox
- Google Pay: Test mode
- Paytm: Staging environment

## Best Practices

### 1. Amount Validation

Always validate payment amounts:

```typescript
const amountNum = parseFloat(amount);
if (isNaN(amountNum) || amountNum <= 0) {
  throw new Error('Invalid amount');
}
```

### 2. User Experience

Provide clear instructions for users:

```typescript
<p>Scan this QR code with any UPI app to pay ₹{amount}</p>
```

### 3. Fallback Options

Provide alternative payment methods:

```typescript
<button onClick={() => window.open(upiLink, '_blank')}>
  Pay with UPI App
</button>
```

## Compliance

### 1. NPCI Guidelines

SplitMate follows NPCI (National Payments Corporation of India) guidelines for UPI integration.

### 2. Data Privacy

No sensitive payment data is stored on SplitMate servers. All payment processing happens through the UPI network.

## Future Enhancements

### 1. UPI Intent Support

Planned support for UPI Intent URLs for deeper app integration:

```
upi://intent/pay?pa={upi_id}&pn={name}&am={amount}&cu=INR
```

### 2. Dynamic QR Codes

Support for dynamic QR codes that can be updated with payment status.

### 3. Payment Status Tracking

Integration with UPI payment status APIs for real-time payment confirmation.

## Conclusion

The UPI integration in SplitMate provides a secure, user-friendly payment experience that aligns with Indian digital payment standards. By leveraging standard UPI protocols and QR code technology, SplitMate enables seamless debt settlement between users.