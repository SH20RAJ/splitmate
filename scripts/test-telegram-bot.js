#!/usr/bin/env node

/**
 * Local Telegram Bot Testing Script
 * 
 * This script helps you test the Telegram bot locally using polling mode
 * instead of webhooks. Useful for development and debugging.
 * 
 * Usage: node scripts/test-telegram-bot.js
 */

const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error('❌ TELEGRAM_BOT_TOKEN not found in .env.local');
  console.log('Please add your bot token to .env.local:');
  console.log('TELEGRAM_BOT_TOKEN=your_bot_token_here');
  process.exit(1);
}

// Create bot instance with polling
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.log('🤖 SplitMate Telegram Bot started in polling mode...');
console.log('📱 Test it by sending messages to your bot on Telegram');

// Handle polling errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code, error.message);
});

// Handle text messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';
  const userId = msg.from?.id || 0;
  
  console.log(`📩 Message from ${msg.from?.first_name} (${userId}): ${text}`);
  
  try {
    if (text.startsWith('/start')) {
      const welcomeMessage = `🎉 *Welcome to SplitMate!* 

I'm your AI expense management assistant. Here's what I can help you with:

💰 *Add expenses*: "Add ₹250 for pizza"
📊 *Split bills*: "Split ₹600 with Rahul and Aditi"  
🔍 *Search expenses*: "Show me food expenses"
📈 *Analytics*: "How much did I spend this week?"
🏆 *Top expenses*: "My top 5 expenses"

Just send me a message in natural language! 🚀

_This is a test bot running locally_`;
      
      await bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
      console.log('✅ Sent welcome message');
      return;
    }

    if (text.startsWith('/test')) {
      const testMessage = `🧪 *Test Response*

Bot is working correctly! ✅

Current time: ${new Date().toLocaleString()}
Chat ID: ${chatId}
User ID: ${userId}

Try these test commands:
• Add ₹100 for coffee
• Split ₹500 pizza with Alice and Bob
• Show my expenses`;
      
      await bot.sendMessage(chatId, testMessage, { parse_mode: 'Markdown' });
      console.log('✅ Sent test message');
      return;
    }

    // Simple expense pattern matching for testing
    if (text.toLowerCase().includes('add') && text.includes('₹')) {
      const amountMatch = text.match(/₹(\d+)/);
      const amount = amountMatch ? amountMatch[1] : '0';
      
      const response = `✅ *Test: Expense Added*

Amount: ₹${amount}
Category: Food & Dining
Date: Today

_This is a mock response for testing_`;
      
      await bot.sendMessage(chatId, response, { parse_mode: 'Markdown' });
      console.log(`✅ Added expense: ₹${amount}`);
      return;
    }

    if (text.toLowerCase().includes('split') && text.includes('₹')) {
      const amountMatch = text.match(/₹(\d+)/);
      const amount = amountMatch ? parseInt(amountMatch[1]) : 0;
      const withMatch = text.match(/with (.+)$/i);
      const people = withMatch ? withMatch[1].split(/,| and |&/).length + 1 : 2;
      const perPerson = Math.round(amount / people);
      
      const response = `💸 *Test: Bill Split Complete*

Total: ₹${amount}
Split among: ${people} people
Each person pays: ₹${perPerson}

_This is a mock response for testing_`;
      
      await bot.sendMessage(chatId, response, { parse_mode: 'Markdown' });
      console.log(`✅ Split bill: ₹${amount} among ${people} people`);
      return;
    }

    // Default response
    const defaultResponse = `🤖 I received: "${text}"

This is a test bot. Try:
• /start - Welcome message
• /test - Test bot functionality
• Add ₹250 for pizza - Test add expense
• Split ₹600 with Alice - Test split bill

For full functionality, use the deployed webhook version!`;

    await bot.sendMessage(chatId, defaultResponse);
    console.log('✅ Sent default response');
    
  } catch (error) {
    console.error('❌ Error handling message:', error);
    await bot.sendMessage(chatId, 'Sorry, something went wrong! This is a test environment.');
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping bot...');
  bot.stopPolling();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping bot...');
  bot.stopPolling();
  process.exit(0);
});
