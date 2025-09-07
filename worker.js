/**
 * SplitMate Telegram Bot - Cloudflare Worker
 * AI-powered expense splitting through conversational interface
 */

// Hardcoded Telegram Bot Token (replace with your actual bot token)
const TELEGRAM_BOT_TOKEN = "botfefefe:fefef";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// OpenAI API Configuration (you'll need to set this in Cloudflare Worker environment variables)
const OPENAI_API_KEY = "sk-proj-fefefef"; // Set this in CF Worker environment variables

// Main Worker Event Listener
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Main request handler
 */
async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Handle Telegram webhook
  if (url.pathname === '/webhook' && request.method === 'POST') {
    return handleTelegramWebhook(request)
  }
  
  // Handle webhook setup
  if (url.pathname === '/setup-webhook' && request.method === 'GET') {
    return setupWebhook(request)
  }
  
  // Health check
  if (url.pathname === '/health') {
    return new Response(JSON.stringify({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      service: 'SplitMate Telegram Bot'
    }), {
      headers: { 'Content-Type': 'application/json' }
    })
  }
  
  return new Response('SplitMate Telegram Bot is running! 🤖', { 
    status: 200,
    headers: { 'Content-Type': 'text/plain' }
  })
}

/**
 * Handle incoming Telegram webhook updates
 */
async function handleTelegramWebhook(request) {
  try {
    const update = await request.json()
    console.log('Received update:', JSON.stringify(update, null, 2))
    
    // Handle different types of updates
    if (update.message) {
      await handleMessage(update.message)
    } else if (update.callback_query) {
      await handleCallbackQuery(update.callback_query)
    }
    
    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Error', { status: 500 })
  }
}

/**
 * Handle incoming messages
 */
async function handleMessage(message) {
  const chatId = message.chat.id
  const text = message.text || ''
  const userId = message.from.id
  const userName = message.from.first_name || 'User'
  
  console.log(`Message from ${userName} (${userId}): ${text}`)
  
  // Handle commands
  if (text.startsWith('/start')) {
    await sendWelcomeMessage(chatId, userName)
    return
  }
  
  if (text.startsWith('/help')) {
    await sendHelpMessage(chatId)
    return
  }
  
  if (text.startsWith('/new') || text.startsWith('/split')) {
    await sendExpenseForm(chatId)
    return
  }
  
  if (text.startsWith('/analytics') || text.startsWith('/stats')) {
    await sendAnalytics(chatId, userId)
    return
  }
  
  // Handle natural language expense input
  if (text.toLowerCase().includes('paid') || text.toLowerCase().includes('spent') || text.toLowerCase().includes('₹') || text.toLowerCase().includes('rs')) {
    await processExpenseInput(chatId, userId, text, userName)
    return
  }
  
  // Default AI response for other queries
  await handleAIQuery(chatId, text, userName)
}

/**
 * Send welcome message with quick actions
 */
async function sendWelcomeMessage(chatId, userName) {
  const welcomeText = `🎉 Welcome to SplitMate AI, ${userName}!

I'm your intelligent expense splitting companion. I can help you:

💰 Split bills with friends using natural language
📊 Track your spending patterns  
🤖 Answer questions about expenses
📈 Generate spending analytics

Just tell me about your expense like:
"I paid ₹1200 for dinner with Rahul and Priya yesterday"

Or use these quick commands:`

  const keyboard = {
    inline_keyboard: [
      [
        { text: '💸 Split New Expense', callback_data: 'new_expense' },
        { text: '📊 View Analytics', callback_data: 'analytics' }
      ],
      [
        { text: '📋 Recent Expenses', callback_data: 'recent' },
        { text: '❓ Help', callback_data: 'help' }
      ],
      [
        { text: '🌐 Open Web App', url: 'https://splitmate.vercel.app' }
      ]
    ]
  }
  
  await sendMessage(chatId, welcomeText, keyboard)
}

/**
 * Send help message
 */
async function sendHelpMessage(chatId) {
  const helpText = `🤖 **SplitMate AI Help**

**Natural Language Examples:**
• "I paid ₹500 for lunch with Alex and Sam"
• "Spent 1200 on groceries, split with roommates"
• "Movie tickets ₹800, me, John, and Sarah"

**Commands:**
• /start - Get started with SplitMate
• /new - Create new expense split
• /analytics - View your spending stats
• /help - Show this help message

**Smart Features:**
✅ Automatic participant detection
✅ Smart categorization (food, transport, etc.)
✅ Payment link generation
✅ WhatsApp sharing
✅ Spending analytics

Just chat naturally about your expenses! 💬`

  await sendMessage(chatId, helpText)
}

/**
 * Process natural language expense input using AI
 */
async function processExpenseInput(chatId, userId, text, userName) {
  try {
    // Send typing indicator
    await sendChatAction(chatId, 'typing')
    
    // Parse expense using AI
    const expenseData = await parseExpenseWithAI(text, userName)
    
    if (!expenseData) {
      await sendMessage(chatId, "I couldn't understand that expense. Could you try rephrasing? For example: 'I paid ₹500 for lunch with Alex'")
      return
    }
    
    // Create expense split card
    const splitMessage = formatExpenseSplit(expenseData)
    const keyboard = createExpenseKeyboard(expenseData)
    
    await sendMessage(chatId, splitMessage, keyboard)
    
  } catch (error) {
    console.error('Error processing expense:', error)
    await sendMessage(chatId, "Sorry, I had trouble processing that expense. Please try again! 🙏")
  }
}

/**
 * Parse expense using OpenAI
 */
async function parseExpenseWithAI(text, userName) {
  const prompt = `Parse this expense message and extract the following information as JSON:

Message: "${text}"
User: ${userName}

Extract:
- amount: number (just the number, no currency)
- description: string (what was purchased)
- participants: array of strings (names mentioned + the user)
- category: string (Food & Dining, Transportation, Entertainment, Shopping, Bills & Utilities, etc.)
- date: string (today if not mentioned, format: YYYY-MM-DD)

Example response:
{
  "amount": 1200,
  "description": "Dinner at restaurant",
  "participants": ["${userName}", "Rahul", "Priya"],
  "category": "Food & Dining",
  "date": "2025-09-07"
}

Only respond with valid JSON.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expense parsing AI. Always respond with valid JSON only.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 200
      })
    })
    
    const data = await response.json()
    const content = data.choices[0]?.message?.content?.trim()
    
    return JSON.parse(content)
  } catch (error) {
    console.error('AI parsing error:', error)
    return null
  }
}

/**
 * Format expense split into readable message
 */
function formatExpenseSplit(expenseData) {
  const { amount, description, participants, category, date } = expenseData
  const perPerson = (amount / participants.length).toFixed(2)
  
  let message = `💸 **Expense Split Created**\n\n`
  message += `📝 **Description:** ${description}\n`
  message += `💰 **Total Amount:** ₹${amount}\n`
  message += `📅 **Date:** ${date}\n`
  message += `🏷️ **Category:** ${category}\n`
  message += `👥 **Participants:** ${participants.length}\n\n`
  
  message += `**💵 Split Breakdown:**\n`
  participants.forEach(name => {
    message += `• ${name}: ₹${perPerson}\n`
  })
  
  message += `\n🔗 Ready to share payment links!`
  
  return message
}

/**
 * Create keyboard for expense actions
 */
function createExpenseKeyboard(_expenseData) {
  return {
    inline_keyboard: [
      [
        { text: '💳 Generate Payment Links', callback_data: `payment_${Date.now()}` },
        { text: '📱 Share via WhatsApp', callback_data: `whatsapp_${Date.now()}` }
      ],
      [
        { text: '✏️ Edit Split', callback_data: `edit_${Date.now()}` },
        { text: '📊 Add to Analytics', callback_data: `save_${Date.now()}` }
      ]
    ]
  }
}

/**
 * Handle callback queries (button presses)
 */
async function handleCallbackQuery(callbackQuery) {
  const chatId = callbackQuery.message.chat.id
  const data = callbackQuery.data
  const messageId = callbackQuery.message.message_id
  
  // Answer callback query to remove loading state
  await answerCallbackQuery(callbackQuery.id)
  
  if (data === 'new_expense') {
    await sendExpenseForm(chatId)
  } else if (data === 'analytics') {
    await sendAnalytics(chatId, callbackQuery.from.id)
  } else if (data === 'recent') {
    await sendRecentExpenses(chatId, callbackQuery.from.id)
  } else if (data === 'help') {
    await sendHelpMessage(chatId)
  } else if (data.startsWith('payment_')) {
    await generatePaymentLinks(chatId, messageId)
  } else if (data.startsWith('whatsapp_')) {
    await shareViaWhatsApp(chatId, messageId)
  } else if (data.startsWith('save_')) {
    await saveExpense(chatId, messageId)
  }
}

/**
 * Generate and send payment links
 */
async function generatePaymentLinks(chatId, messageId) {
  const linksMessage = `🔗 **Payment Links Generated:**

**UPI Links:**
• PhonePe: \`phonepe://pay?pa=yourname@paytm&pn=SplitMate&am=300\`
• Google Pay: \`tez://upi/pay?pa=yourname@paytm&pn=SplitMate&am=300\`
• Paytm: \`paytmmp://pay?pa=yourname@paytm&pn=SplitMate&am=300\`

**Share these links with participants!**`

  const keyboard = {
    inline_keyboard: [
      [{ text: '📋 Copy All Links', callback_data: 'copy_links' }],
      [{ text: '↩️ Back to Expense', callback_data: 'back_to_expense' }]
    ]
  }
  
  await editMessage(chatId, messageId, linksMessage, keyboard)
}

/**
 * Send analytics data
 */
async function sendAnalytics(chatId, _userId) {
  await sendChatAction(chatId, 'typing')
  
  // Mock analytics data (in real implementation, fetch from database)
  const analyticsMessage = `📊 **Your Expense Analytics**

**This Month:**
💰 Total Spent: ₹8,450
🍽️ Food & Dining: ₹3,200 (38%)
🚗 Transportation: ₹1,800 (21%)  
🎬 Entertainment: ₹1,450 (17%)
🛒 Shopping: ₹2,000 (24%)

**Trends:**
📈 15% increase from last month
🎯 Average per expense: ₹425
👥 Most frequent co-payers: Rahul, Priya

**Quick Stats:**
• Total Expenses: 24
• Groups Active: 3  
• Friends Involved: 8
• Pending Settlements: ₹450`

  const keyboard = {
    inline_keyboard: [
      [
        { text: '📈 Detailed Report', callback_data: 'detailed_report' },
        { text: '💸 Pending Payments', callback_data: 'pending' }
      ],
      [
        { text: '🌐 Open Web Dashboard', url: 'https://splitmate.vercel.app/analytics' }
      ]
    ]
  }
  
  await sendMessage(chatId, analyticsMessage, keyboard)
}

/**
 * Handle AI queries for general questions
 */
async function handleAIQuery(chatId, text, _userName) {
  await sendChatAction(chatId, 'typing')
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are SplitMate AI, a helpful expense splitting assistant. You help users split bills, track expenses, and manage group finances. Keep responses concise and helpful. If users ask about expenses, guide them to use natural language like "I paid ₹500 for lunch with friends".`
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    })
    
    const data = await response.json()
    const reply = data.choices[0]?.message?.content || "I'm having trouble understanding. Try asking about splitting expenses or use /help for commands!"
    
    await sendMessage(chatId, reply)
    
  } catch (error) {
    console.error('AI query error:', error)
    await sendMessage(chatId, "I'm having some technical difficulties. Please try again! 🤖")
  }
}

/**
 * Setup webhook for Telegram bot
 */
async function setupWebhook(request) {
  const url = new URL(request.url)
  const webhookUrl = `${url.origin}/webhook`
  
  const response = await fetch(`${TELEGRAM_API_URL}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url: webhookUrl,
      allowed_updates: ['message', 'callback_query']
    })
  })
  
  const result = await response.json()
  return new Response(JSON.stringify(result, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * Send message to Telegram chat
 */
async function sendMessage(chatId, text, replyMarkup = null) {
  const payload = {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown',
    disable_web_page_preview: true
  }
  
  if (replyMarkup) {
    payload.reply_markup = replyMarkup
  }
  
  const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  
  return response.json()
}

/**
 * Edit existing message
 */
async function editMessage(chatId, messageId, text, replyMarkup = null) {
  const payload = {
    chat_id: chatId,
    message_id: messageId,
    text: text,
    parse_mode: 'Markdown',
    disable_web_page_preview: true
  }
  
  if (replyMarkup) {
    payload.reply_markup = replyMarkup
  }
  
  const response = await fetch(`${TELEGRAM_API_URL}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  
  return response.json()
}

/**
 * Send chat action (typing, upload_photo, etc.)
 */
async function sendChatAction(chatId, action) {
  const response = await fetch(`${TELEGRAM_API_URL}/sendChatAction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      action: action
    })
  })
  
  return response.json()
}

/**
 * Answer callback query
 */
async function answerCallbackQuery(callbackQueryId, text = null) {
  const payload = {
    callback_query_id: callbackQueryId
  }
  
  if (text) {
    payload.text = text
    payload.show_alert = true
  }
  
  const response = await fetch(`${TELEGRAM_API_URL}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  
  return response.json()
}

// Helper functions for mock data (replace with real database calls)
async function sendExpenseForm(chatId) {
  const message = `📝 **Create New Expense**

Just tell me about your expense in natural language! For example:

• "I paid ₹800 for dinner with Alex and Sarah"
• "Spent 1200 on groceries, split with roommates"  
• "Movie tickets cost ₹500, shared with John"

Or use the quick form:`

  const keyboard = {
    inline_keyboard: [
      [
        { text: '🍽️ Food & Dining', callback_data: 'quick_food' },
        { text: '🚗 Transportation', callback_data: 'quick_transport' }
      ],
      [
        { text: '🎬 Entertainment', callback_data: 'quick_entertainment' },
        { text: '🛒 Shopping', callback_data: 'quick_shopping' }
      ]
    ]
  }
  
  await sendMessage(chatId, message, keyboard)
}

async function sendRecentExpenses(chatId, _userId) {
  const message = `📋 **Recent Expenses**

**Today:**
• ₹450 - Lunch at cafe (with Rahul, Priya)
• ₹120 - Auto fare (with Sarah)

**Yesterday:**  
• ₹800 - Movie tickets (with Alex, John)
• ₹300 - Coffee (with team)

**This Week:**
• ₹2,200 - Grocery shopping (with roommates)
• ₹1,500 - Dinner party (with friends)

💰 **Total this week:** ₹5,370`

  const keyboard = {
    inline_keyboard: [
      [
        { text: '📊 Full History', url: 'https://splitmate.vercel.app/expenses' },
        { text: '💸 Settle Up', callback_data: 'settle_up' }
      ]
    ]
  }
  
  await sendMessage(chatId, message, keyboard)
}

async function shareViaWhatsApp(chatId, messageId) {
  const message = `📱 **WhatsApp Share Message:**

*SplitMate Expense Split* 💸

Hey! I've split our recent expense using SplitMate AI:

💰 Amount: ₹1,200  
📝 Description: Dinner at restaurant
👥 Split between 3 people
💵 Your share: ₹400

💳 Pay via UPI: \`yourname@paytm\`

*Powered by SplitMate* 🤖`

  const keyboard = {
    inline_keyboard: [
      [
        { text: '📱 Open WhatsApp', url: 'https://wa.me/?text=' + encodeURIComponent(message) }
      ],
      [
        { text: '📋 Copy Message', callback_data: 'copy_message' },
        { text: '↩️ Back', callback_data: 'back_to_expense' }
      ]
    ]
  }
  
  await editMessage(chatId, messageId, message, keyboard)
}

async function saveExpense(chatId, _messageId) {
  await sendMessage(chatId, "✅ Expense saved to your analytics! You can view detailed insights anytime.")
}
