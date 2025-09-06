# SplitMate Telegram Bot 🤖💰

An intelligent Telegram bot that helps you manage expenses, split bills, and track spending through natural conversation.

## 🚀 Features

- **💰 Add Expenses**: "Add ₹250 for pizza"
- **📊 Split Bills**: "Split ₹600 with Rahul and Aditi"
- **🔍 Search Expenses**: "Show me food expenses"
- **📈 Analytics**: "How much did I spend this week?"
- **🏆 Top Expenses**: "My top 5 expenses"
- **🤖 AI-Powered**: Natural language understanding
- **⚡ Quick Actions**: Inline queries and interactive keyboards

## 📱 Usage

### Basic Commands

- `/start` - Welcome message and bot introduction
- `/help` - Detailed help and examples
- `/stats` - Your expense statistics overview

### Natural Language Examples

**Adding Expenses:**
```
Add ₹250 for pizza
Spent 500 on groceries
₹120 coffee with friends
Paid ₹800 for electricity bill
```

**Splitting Bills:**
```
Split ₹600 pizza with Rahul and Aditi
Divide ₹1200 dinner bill among 4 people
Share ₹450 Uber ride with Sarah
```

**Analytics & Search:**
```
Show me food expenses
How much did I spend this week?
My top 5 expenses this month
Total spending on transport
```

## 🛠️ Setup & Development

### Prerequisites

1. **Telegram Bot Token**
   - Create a bot with [@BotFather](https://t.me/BotFather)
   - Save the bot token

2. **Environment Variables**
   ```bash
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_WEBHOOK_URL=https://yourdomain.com/api/telegram/webhook
   OPENAI_API_KEY=your_openai_key_here
   ```

### Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Test Bot Locally (Polling Mode)**
   ```bash
   npm run telegram:test
   ```

3. **Setup Webhook (Production Mode)**
   ```bash
   npm run telegram:setup
   ```

### API Endpoints

- `POST /api/telegram/webhook` - Main webhook handler
- `GET /api/telegram/setup` - Bot status and webhook info
- `POST /api/telegram/setup` - Configure webhook
- `DELETE /api/telegram/setup` - Remove webhook

## 🏗️ Architecture

### Components

1. **Webhook Handler** (`/api/telegram/webhook/route.ts`)
   - Processes incoming Telegram updates
   - Handles messages, inline queries, callback queries
   - Routes to appropriate handlers

2. **Bot Service** (`/lib/telegram-bot.ts`)
   - Natural language processing
   - Intent recognition
   - Action execution
   - Response formatting

3. **Tools Integration** (`/lib/tools.ts`)
   - Expense management functions
   - Analytics processing
   - Data manipulation
   - Mock implementations

### Message Flow

```
Telegram Message → Webhook → Intent Analysis → Tool Execution → Response
```

## 🔧 Configuration

### Bot Settings (via @BotFather)

```
/setdescription
SplitMate Bot - Your AI expense management assistant. Add expenses, split bills, and track spending with natural language.

/setabouttext
SplitMate helps you manage expenses effortlessly through Telegram. Just type naturally like "Add ₹250 for pizza" or "Split ₹600 with friends" and let AI handle the rest!

/setcommands
start - Start using SplitMate bot
help - Get help and examples  
stats - View your expense statistics
```

### Webhook vs Polling

**Production (Webhook):**
- Scalable and efficient
- Real-time message processing
- Required for production deployment

**Development (Polling):**
- Easy local testing
- No webhook configuration needed
- Use `npm run telegram:test`

## 🚀 Deployment

### Vercel/Netlify

1. Set environment variables in dashboard
2. Deploy your Next.js app
3. Configure webhook: `POST /api/telegram/setup`

### Railway/Heroku

1. Add environment variables
2. Deploy application
3. Set webhook URL to your domain

## 📊 Analytics & Monitoring

### Bot Analytics

- Message volume tracking
- User engagement metrics
- Feature usage statistics
- Error rate monitoring

### Integration with SplitMate App

- Synced expense data
- Cross-platform consistency
- Real-time updates
- Unified user experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Update documentation
5. Submit a pull request

## 📄 License

This project is part of SplitMate and follows the same license terms.

---

**Need help?** Contact us or visit the [documentation](../docs/telegram-bot-setup.md) for detailed setup instructions.
