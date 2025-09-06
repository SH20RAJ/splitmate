import { NextRequest, NextResponse } from 'next/server';
import SplitMateBotService from '@/lib/telegram-bot';

export const runtime = 'edge';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.TELEGRAM_WEBHOOK_URL;

if (!BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN is required');
}

// Create bot service instance
const botService = new SplitMateBotService(BOT_TOKEN);

// Helper function to make requests to Telegram Bot API
async function callTelegramAPI(method: string, data: any = {}) {
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

// Handle different types of messages
async function handleMessage(msg: any): Promise<void> {
  const chatId = msg.chat.id;
  const text = msg.text?.toLowerCase() || '';
  const userId = msg.from?.id || 0;

  try {
    // Handle commands
    if (text.startsWith('/start')) {
      const welcomeMessage = `🎉 *Welcome to SplitMate!* 

I'm your AI expense management assistant. Here's what I can help you with:

💰 *Add expenses*: "Add ₹250 for pizza"
📊 *Split bills*: "Split ₹600 with Rahul and Aditi"  
🔍 *Search expenses*: "Show me food expenses"
📈 *Analytics*: "How much did I spend this week?"
🏆 *Top expenses*: "My top 5 expenses"

Just send me a message in natural language and I'll help you manage your expenses! 🚀`;
      
      await callTelegramAPI('sendMessage', {
        chat_id: chatId,
        text: welcomeMessage,
        parse_mode: 'Markdown',
        reply_markup: botService.generateInlineKeyboard()
      });
      return;
    }

    if (text.startsWith('/help')) {
      const helpMessage = `🆘 *SplitMate Commands & Examples*

*Add Expense:*
• Add ₹250 for pizza
• ₹120 coffee with friends
• Spent 500 on groceries

*Split Bills:*  
• Split ₹600 pizza with Rahul and Aditi
• Divide ₹1200 dinner bill among 4 people

*Search & Analytics:*
• Show me food expenses
• How much did I spend this week?
• My top 5 expenses this month

*Quick Tips:*
📱 Just type naturally - I understand context!
💡 Use /start to see the welcome message
🔧 Use /help for this help message

Need more help? Visit: splitmate.app 🌐`;
      
      await callTelegramAPI('sendMessage', {
        chat_id: chatId,
        text: helpMessage,
        parse_mode: 'Markdown'
      });
      return;
    }

    if (text.startsWith('/stats')) {
      const statsMessage = `📊 *Your SplitMate Stats*

💰 *Total Expenses*: ₹12,450 (This Month)
🎯 *Top Category*: Food (₹4,200)
👥 *Active Groups*: 3
💸 *Money Owed to You*: ₹850
🔄 *Money You Owe*: ₹320

Use analytics commands for detailed insights! 📈`;
      
      await callTelegramAPI('sendMessage', {
        chat_id: chatId,
        text: statsMessage,
        parse_mode: 'Markdown'
      });
      return;
    }

    // Handle regular messages with bot service
    if (text) {
      const action = await botService.analyzeMessage(text);
      
      if (action) {
        const response = await botService.executeAction(action, userId);
        await callTelegramAPI('sendMessage', {
          chat_id: chatId,
          text: response,
          parse_mode: 'Markdown'
        });
      } else {
        // Fallback for unrecognized patterns
        await callTelegramAPI('sendMessage', {
          chat_id: chatId,
          text: "I can help you with expenses! Try saying 'Add ₹250 for pizza' or 'Split ₹600 with friends' 💡",
          reply_markup: botService.generateQuickReplies()
        });
      }
    } else {
      await callTelegramAPI('sendMessage', {
        chat_id: chatId,
        text: "I can help you with expenses! Try saying 'Add ₹250 for pizza' or 'Split ₹600 with friends' 💡"
      });
    }

 } catch (error) {
    console.error('Error handling message:', error);
    await callTelegramAPI('sendMessage', {
      chat_id: chatId,
      text: "Sorry, something went wrong! Please try again. 😅"
    });
  }
}

// Handle inline queries for quick actions
async function handleInlineQuery(query: any): Promise<void> {
  const queryText = query.query.toLowerCase();
  
  const results = [
    {
      type: 'article',
      id: '1',
      title: '➕ Add Expense',
      description: 'Add a new expense',
      input_message_content: {
        message_text: `Add ₹${queryText || '0'} for `
      }
    },
    {
      type: 'article', 
      id: '2',
      title: '📊 Split Bill',
      description: 'Split a bill with friends',
      input_message_content: {
        message_text: `Split ₹${queryText || '0'} with `
      }
    },
    {
      type: 'article',
      id: '3', 
      title: '🔍 Search Expenses',
      description: 'Search your expenses',
      input_message_content: {
        message_text: 'Show me my expenses'
      }
    },
    {
      type: 'article',
      id: '4',
      title: '📈 Analytics', 
      description: 'View expense analytics',
      input_message_content: {
        message_text: 'How much did I spend this week?'
      }
    }
  ];

  try {
    await callTelegramAPI('answerInlineQuery', {
      inline_query_id: query.id,
      results: results,
      cache_time: 300,
      is_personal: true
    });
  } catch (error) {
    console.error('Error handling inline query:', error);
  }
}

// Main webhook handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Handle different types of updates
    if (body.message) {
      await handleMessage(body.message);
    } else if (body.inline_query) {
      await handleInlineQuery(body.inline_query);
    } else if (body.callback_query) {
      // Handle callback queries from inline keyboards
      const callbackQuery = body.callback_query;
      await callTelegramAPI('answerCallbackQuery', {
        callback_query_id: callbackQuery.id
      });
      
      if (callbackQuery.data === 'get_help') {
        await handleMessage({ ...callbackQuery.message, text: '/help' });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    bot: 'SplitMate Telegram Bot',
    timestamp: new Date().toISOString()
  });
}
