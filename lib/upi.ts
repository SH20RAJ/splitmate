// Define type for Web Share API data
interface WebShareData {
  title: string;
  text: string;
  url: string;
}

// Function to generate UPI deep link
export function generateUpiLink(upiId: string, name: string, amount: number, currency: string = 'INR'): string {
  const encodedName = encodeURIComponent(name);
  return `upi://pay?pa=${upiId}&pn=${encodedName}&am=${amount}&cu=${currency}`;
}

// Function to generate QR code data URL for UPI link
export async function generateUpiQrCode(upiLink: string): Promise<string> {
  try {
    // Dynamically import QRCode library to avoid server-side issues
    const QRCode = (await import('qrcode')).default;
    const qrCodeDataUrl = await QRCode.toDataURL(upiLink);
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

// Function to generate WhatsApp reminder message
export function generateWhatsAppReminderMessage(amount: number, expense: string, upiLink: string): string {
  const message = `Hey! You owe me ₹${amount} for ${expense}. Pay here: ${upiLink}`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/?text=${encodedMessage}`;
}

// Function to generate Web Share API data
export function generateWebShareData(amount: number, expense: string, upiLink: string): WebShareData {
  return {
    title: 'SplitMate Payment Request',
    text: `You owe ₹${amount} for ${expense}. Click to pay:`,
    url: upiLink,
  };
}