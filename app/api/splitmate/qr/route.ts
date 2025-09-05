import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { generateUpiLink, generateUpiQrCode } from '@/lib/upi';

interface QrRequest {
  amount: number;
  description?: string;
  upiId?: string;
}

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const body: QrRequest = await req.json();
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
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(qrResult);
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}