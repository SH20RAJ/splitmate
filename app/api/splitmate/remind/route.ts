import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { 
  generateWhatsAppReminderMessage, 
  generateWebShareData,
  generateUpiLink
} from '@/lib/upi';

interface ReminderRequest {
  amount: number;
  description: string;
  recipientName: string;
  recipientPhone?: string;
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
    const body: ReminderRequest = await req.json();
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
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(reminderResult);
  } catch (error) {
    console.error('Error sending reminder:', error);
    return NextResponse.json({ error: 'Failed to send reminder' }, { status: 500 });
  }
}