import { NextRequest, NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.TELEGRAM_WEBHOOK_URL || 'https://splitmate.vercel.app/api/telegram/webhook';

export async function POST(_req: NextRequest) {
  if (!BOT_TOKEN) {
    return NextResponse.json(
      { error: 'TELEGRAM_BOT_TOKEN not configured' },
      { status: 500 }
    );
  }

  try {
    const bot = new TelegramBot(BOT_TOKEN);
    
    // Set webhook
    const result = await bot.setWebHook(WEBHOOK_URL, {
      allowed_updates: ['message', 'inline_query', 'callback_query']
    });

    if (result) {
      return NextResponse.json({
        success: true,
        message: 'Webhook configured successfully',
        webhook_url: WEBHOOK_URL
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to set webhook' },
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
    const bot = new TelegramBot(BOT_TOKEN);
    
    // Get bot info
    const botInfo = await bot.getMe();
    
    // Get webhook info
    const webhookInfo = await bot.getWebHookInfo();
    
    return NextResponse.json({
      bot: {
        id: botInfo.id,
        username: botInfo.username,
        first_name: botInfo.first_name
      },
      webhook: {
        url: webhookInfo.url,
        has_custom_certificate: webhookInfo.has_custom_certificate,
        pending_update_count: webhookInfo.pending_update_count,
        last_error_date: webhookInfo.last_error_date,
        last_error_message: webhookInfo.last_error_message,
        max_connections: webhookInfo.max_connections,
        allowed_updates: webhookInfo.allowed_updates
      }
    });
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
    const bot = new TelegramBot(BOT_TOKEN);
    
    // Remove webhook (switch to polling mode)
    const result = await bot.deleteWebHook();
    
    if (result) {
      return NextResponse.json({
        success: true,
        message: 'Webhook removed successfully'
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to remove webhook' },
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
