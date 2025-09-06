# SplitMate - AI Expense Chatbot

A conversational chatbot that makes expense management and bill splitting effortless through natural language interactions.
use drizzle orm with supabase

> https://splitmate-dusky.vercel.app/


## Features

### 💬 Natural Language Processing
- Add expenses, query analytics, and manage groups by chatting in plain English
- Powered by OpenAI GPT-4 and Assistant UI

### 💰 Smart Bill Splitting
- Automatically calculate who owes whom for equal or custom splits
- Real-time balance updates with visual indicators

### 📱 UPI Integration & Reminders
- Generate UPI deep links and QR codes for one-tap payments
- Send reminders via WhatsApp with payment links

### 🔐 Secure Authentication
- Powered by StackAuth for secure user authentication
- Social login support (Google, GitHub)

### 🤖 AI-Powered Assistant
- Chat with an AI assistant to manage your expenses
- Get financial insights and recommendations

## Tech Stack

- **Frontend**: Next.js 15 + TailwindCSS + shadcn/ui
- **AI**: OpenAI API + Assistant UI
- **Auth**: StackAuth
- **Database**: Supabase
- **Payments**: UPI Deep Links + QR Generation

## Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API key
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/splitmate.git
cd splitmate
```

2. Install dependencies
```bash
npm install
```

3. Environment Setup
```bash
cp .env.example .env.local
```
Add your API keys to `.env.local`.

4. Run the development server
```bash
npm run dev
```

## Documentation

For detailed information about SplitMate's features and integrations, please see the [documentation folder](docs/README.md):

- [SplitMate Features](docs/SPLITMATE_FEATURES.md) - Overview of all SplitMate features
- [Vercel AI SDK Integration](docs/VERCEL_AI_SDK_INTEGRATION.md) - How SplitMate integrates Vercel AI SDK with Assistant UI
- [StackAuth Integration](docs/STACKAUTH_INTEGRATION.md) - Authentication system implementation
- [UPI Integration](docs/UPI_INTEGRATION.md) - UPI payment processing
- [Reminder Integration](docs/REMINDER_INTEGRATION.md) - WhatsApp and Web Share API integration
- [Summary](docs/SUMMARY.md) - Comprehensive overview of the entire system
- [Deployment](docs/DEPLOYMENT.md) - How to deploy SplitMate to Vercel
- [Contributing](docs/CONTRIBUTING.md) - Guidelines for contributing to SplitMate

## Key Components

### Authentication
- Sign in/up with StackAuth
- Protected routes for all expense-related features

### Dashboard
- Overview of recent expenses and groups
- Financial summaries and insights

### Bill Splitting
- Split bills equally or with custom amounts
- Visual representation of who owes what

### UPI Payments
- Generate QR codes for UPI payments
- Deep links for direct app integration

### AI Chat Assistant
- Natural language interface for expense management
- Smart suggestions and financial insights

## API Endpoints

- `/api/chat` - AI chat interface
- `/api/expenses` - Expense management
- `/api/groups` - Group management
- `/api/user/sync` - User data synchronization
- `/api/upi` - UPI link and QR code generation
- `/api/reminders` - Reminder sending (WhatsApp, Web Share API)

## Contributing

We welcome contributions to SplitMate! Please read our [contributing guidelines](docs/CONTRIBUTING.md) before submitting pull requests.

## License

MIT License - see [LICENSE](LICENSE) for details.
