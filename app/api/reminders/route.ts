import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { 
  generateWhatsAppReminderMessage, 
  generateWebShareData,
  generateUpiLink
} from '@/lib/upi';

// POST /api/reminders/send - Generate reminder links
export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get request body
    const body = await req.json();
    const { amount, expense, upiId, recipientName } = body;

    // Validate required fields
    if (!amount || !expense || !upiId || !recipientName) {
      return NextResponse.json({ error: 'Amount, expense, UPI ID, and recipient name are required' }, { status: 400 });
    }

    // Generate UPI link
    const upiLink = generateUpiLink(upiId, user.displayName || 'User', amount);

    // Generate WhatsApp reminder message
    const whatsappLink = generateWhatsAppReminderMessage(amount, expense, upiLink);

    // Generate Web Share API data
    const webShareData = generateWebShareData(amount, expense, upiLink);

    return NextResponse.json({
      whatsappLink,
      webShareData,
      upiLink,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}