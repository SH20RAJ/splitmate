# SplitMate Frontend Demo 💸

A comprehensive AI-powered expense splitting application built with Next.js, featuring:

## ✨ Features Implemented

### 🎨 **Modern UI Design**
- Beautiful dashboard with expense overview
- Balance tracking (who owes whom)
- Recent expenses list with categories
- Group management interface
- Responsive mobile-first design

### 🤖 **AI Chat Assistant** 
- Conversational expense management
- Natural language processing for bills
- Smart expense splitting calculations
- UPI payment link generation
- WhatsApp reminder creation

### 🧑‍💼 **User Experience**
- Mock authentication system (StackAuth ready)
- Dual-view interface (Dashboard ↔ Chat)
- Quick action buttons
- Professional header with notifications

### 💰 **Expense Management**
- Individual balance tracking
- Group expense organization  
- Recent transaction history
- Category-based expense sorting
- Visual spending indicators

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun 1.0+
- OpenAI API key (optional, for AI chat)

### Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd splitmate

# Install dependencies
bun install

# Set up environment variables (optional)
cp .env.example .env.local
# Add your OpenAI API key to enable AI chat

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎯 Demo Flow

1. **Dashboard View**: 
   - See your balance overview
   - View individual balances with friends
   - Browse your expense groups
   - Check recent transactions

2. **AI Chat View**:
   - Toggle to chat interface via header button
   - Use quick action buttons for common tasks
   - Chat naturally about expenses (requires OpenAI API)

3. **Authentication**: 
   - Currently shows mock user data
   - Real StackAuth integration ready for production

## 🏗️ Architecture

```
src/
├── app/
│   ├── page.tsx              # Main application 
│   ├── assistant.tsx         # AI chat interface
│   ├── api/chat/route.ts     # AI chat API endpoint
│   └── layout.tsx            # Root layout
├── components/
│   ├── dashboard.tsx         # Expense dashboard
│   ├── header.tsx            # Application header
│   ├── assistant-ui/         # Chat UI components
│   └── ui/                   # Reusable UI components
└── lib/
    └── utils.ts              # Utility functions
```

## 🔧 Key Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS, shadcn/ui, Radix UI
- **AI**: OpenAI GPT-4, Assistant UI React
- **Authentication**: StackAuth (configured)
- **Animations**: Motion (Framer Motion)

## 📱 Views Available

### Dashboard View
- Net balance overview with visual indicators
- Quick action buttons (Add Expense, Create Group, etc.)
- Individual balance list with contact options
- Group cards with member counts and totals
- Recent expense history with categories

### AI Chat View  
- Conversational expense management
- Quick action suggestions
- Natural language expense entry
- Smart calculation assistance
- Payment reminder generation

## 🚀 Next Steps

To extend this into a full application:

1. **Backend Integration**:
   - Set up Supabase database
   - Implement real expense CRUD operations
   - Add user authentication with StackAuth

2. **Enhanced Features**:
   - Receipt upload & AI extraction
   - UPI payment integration
   - WhatsApp API for reminders
   - Real-time synchronization

3. **Mobile App**:
   - React Native version
   - Push notifications
   - Offline support

## 🎨 Design System

The application follows a consistent design system:
- **Colors**: Blue/Purple gradient brand, semantic colors for balances
- **Typography**: Clean, readable fonts with proper hierarchy  
- **Icons**: Lucide React icon set
- **Components**: Reusable shadcn/ui components
- **Layout**: Responsive grid system

## 💬 Chat Examples

Try these commands in the AI chat (requires OpenAI API):

- "I spent ₹1200 on dinner with Rahul and Priya"
- "How much does Amit owe me?"
- "Create a group for our Goa trip with 5 friends"
- "Generate a payment request for ₹500"
- "Send a WhatsApp reminder to collect money"

---

**Built with ❤️ for seamless expense management**
