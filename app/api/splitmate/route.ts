import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { generateUpiLink, generateUpiQrCode } from '@/lib/upi';

// POST /api/splitmate - Handle SplitMate specific features
export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const body = await req.json();
    const { action, data } = body;

    // Handle different actions
    switch (action) {
      case 'split_bill':
        return await handleSplitBill(data, user);
      
      case 'generate_qr':
        return await handleGenerateQr(data, user);
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error in SplitMate API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Handle bill splitting
async function handleSplitBill(data: any, user: any) {
  try {
    const { amount, description, participants } = data;
    
    // Validate required fields
    if (!amount || !description || !participants || !Array.isArray(participants)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Calculate split amount
    const splitAmount = amount / participants.length;
    
    // Create split result
    const splitResult = {
      totalAmount: amount,
      splits: participants.map((person: string) => ({
        person,
        amount: splitAmount
      })),
      description
    };
    
    return NextResponse.json(splitResult);
  } catch (error) {
    console.error('Error splitting bill:', error);
    return NextResponse.json({ error: 'Failed to split bill' }, { status: 500 });
  }
}

// Handle QR code generation
async function handleGenerateQr(data: any, user: any) {
  try {
    const { amount, description } = data;
    
    // Validate required fields
    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }
    
    // Generate UPI link
    // In a real app, you would use the user's actual UPI ID
    const upiId = "user@upi"; // Placeholder
    const name = user.displayName || "SplitMate User";
    const upiLink = generateUpiLink(upiId, name, amount);
    
    // Generate QR code
    const qrCode = await generateUpiQrCode(upiLink);
    
    // Create result
    const qrResult = {
      qrCode,
      upiLink,
      amount,
      description: description || `Payment for ${amount}`
    };
    
    return NextResponse.json(qrResult);
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json({ error: 'Failed to generate QR code' }, { status: 500 });
  }
}