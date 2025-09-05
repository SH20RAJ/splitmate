import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { generateUpiLink, generateUpiQrCode } from '@/lib/upi';

// POST /api/upi/generate - Generate UPI link and QR code
export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const body = await req.json();
    const { upiId, name, amount, currency } = body;

    // Validate required fields
    if (!upiId || !name || !amount) {
      return NextResponse.json({ error: 'UPI ID, name, and amount are required' }, { status: 400 });
    }

    // Generate UPI link
    const upiLink = generateUpiLink(upiId, name, amount, currency);

    // Generate QR code
    const qrCodeDataUrl = await generateUpiQrCode(upiLink);

    return NextResponse.json({
      upiLink,
      qrCode: qrCodeDataUrl,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}