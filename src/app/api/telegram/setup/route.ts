import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.TELEGRAM_WEBHOOK_URL || 'https://splitmate.vercel.app/api/telegram/webhook';

// Helper function to make requests to Telegram Bot API
async function callTelegramAPI(method: string, data: any = {}) {
  if (!BOT_TOKEN) {
    throw new Error('TELEGRAM_BOT_TOKEN is required');
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Telegram API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  return result;
}

export async function POST(_req: NextRequest) {
  if (!BOT_TOKEN) {
    return NextResponse.json(
      { error: 'TELEGRAM_BOT_TOKEN not configured' },
      { status: 500 }
    );
  }

  try {
    // Set webhook
    const result = await callTelegramAPI('setWebhook', {
      url: WEBHOOK_URL,
      allowed_updates: ['message', 'inline_query', 'callback_query']
    });

    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: 'Webhook configured successfully',
        webhook_url: WEBHOOK_URL
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to set webhook', details: result.description },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Webhook setup error:', error);
    return NextResponse.json(
      { error: 'Failed to configure webhook', details: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!BOT_TOKEN) {
    return NextResponse.json(
      { error: 'TELEGRAM_BOT_TOKEN not configured' },
      { status: 500 }
    );
  }

  try {
    // Get bot info
    const botInfo = await callTelegramAPI('getMe');
    
    // Get webhook info
    const webhookInfo = await callTelegramAPI('getWebhookInfo');
    
    if (botInfo.ok && webhookInfo.ok) {
      return NextResponse.json({
        bot: {
          id: botInfo.result.id,
          username: botInfo.result.username,
          first_name: botInfo.result.first_name
        },
        webhook: {
          url: webhookInfo.result.url,
          has_custom_certificate: webhookInfo.result.has_custom_certificate,
          pending_update_count: webhookInfo.result.pending_update_count,
          last_error_date: webhookInfo.result.last_error_date,
          last_error_message: webhookInfo.result.last_error_message,
          max_connections: webhookInfo.result.max_connections,
          allowed_updates: webhookInfo.result.allowed_updates
        }
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to get bot information', details: botInfo.description || webhookInfo.description },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Bot info error:', error);
    return NextResponse.json(
      { error: 'Failed to get bot information', details: error },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  if (!BOT_TOKEN) {
    return NextResponse.json(
      { error: 'TELEGRAM_BOT_TOKEN not configured' },
      { status: 500 }
    );
  }

  try {
    // Remove webhook (switch to polling mode)
    const result = await callTelegramAPI('deleteWebhook');
    
    if (result.ok) {
      return NextResponse.json({
        success: true,
        message: 'Webhook removed successfully'
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to remove webhook', details: result.description },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Webhook removal error:', error);
    return NextResponse.json(
      { error: 'Failed to remove webhook', details: error },
      { status: 500 }
    );
  }
}
