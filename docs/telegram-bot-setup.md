# Telegram Bot Environment Variables

Add these environment variables to your `.env.local` file:

## Required Variables

```bash
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_WEBHOOK_URL=https://yourdomain.com/api/telegram/webhook

# OpenAI API Key (for AI functionality)
OPENAI_API_KEY=your_openai_api_key_here
```

## Getting Telegram Bot Token

1. **Create a Bot with BotFather:**
   - Open Telegram and search for `@BotFather`
   - Send `/newbot` command
   - Choose a name for your bot (e.g., "SplitMate Assistant")
   - Choose a username for your bot (must end with 'bot', e.g., "splitmate_assistant_bot")
   - Copy the bot token provided by BotFather

2. **Configure Bot Settings:**
   - Send `/setdescription` to BotFather to add a description
   - Send `/setabouttext` to add about text
   - Send `/setuserpic` to add a profile picture
   - Send `/setcommands` and add these commands:
     ```
     start - Start using SplitMate bot
     help - Get help and examples
     stats - View your expense statistics
     ```

3. **Enable Inline Mode (Optional):**
   - Send `/setinline` to BotFather
   - Enter a placeholder text like "Add expense, split bill..."

## Webhook Setup

After deploying your app:

1. **Set Webhook URL:**
   ```bash
   # Replace with your actual domain
   TELEGRAM_WEBHOOK_URL=https://your-app.vercel.app/api/telegram/webhook
   ```

2. **Configure Webhook:**
   - Deploy your app first
   - Make a POST request to `/api/telegram/setup` to configure the webhook
   - Or visit `/api/telegram/setup` in your browser to check bot status

## Local Development

For local development with ngrok:

1. **Install ngrok:**
   ```bash
   npm install -g ngrok
   ```

2. **Start your Next.js app:**
   ```bash
   npm run dev
   ```

3. **Expose localhost with ngrok:**
   ```bash
   ngrok http 3000
   ```

4. **Update webhook URL:**
   ```bash
   TELEGRAM_WEBHOOK_URL=https://your-ngrok-url.ngrok.io/api/telegram/webhook
   ```

## Bot Features

The SplitMate Telegram bot supports:

- ✅ **Add Expenses**: "Add ₹250 for pizza"
- ✅ **Split Bills**: "Split ₹600 with Rahul and Aditi" 
- ✅ **Search Expenses**: "Show me food expenses"
- ✅ **Analytics**: "How much did I spend this week?"
- ✅ **Top Expenses**: "My top 5 expenses"
- ✅ **Natural Language Processing**: Understands casual language
- ✅ **Inline Queries**: Quick actions without opening chat
- ✅ **Interactive Keyboards**: Quick reply buttons

## API Endpoints

- `POST /api/telegram/webhook` - Webhook for Telegram updates
- `GET /api/telegram/setup` - Check bot and webhook status
- `POST /api/telegram/setup` - Configure webhook
- `DELETE /api/telegram/setup` - Remove webhook

## Troubleshooting

1. **Bot not responding:**
   - Check if `TELEGRAM_BOT_TOKEN` is correct
   - Verify webhook URL is accessible (try GET request)
   - Check bot logs in your deployment platform

2. **Webhook errors:**
   - Ensure your app is deployed and accessible
   - Verify HTTPS is working (Telegram requires HTTPS)
   - Check webhook info at `/api/telegram/setup`

3. **AI responses not working:**
   - Verify `OPENAI_API_KEY` is set and valid
   - Check OpenAI API usage limits
   - Review error logs for specific issues
