# 🤖 SplitMate - AI-Powered Expense Splitter

> **Smart AI-powered expense management that makes splitting bills as simple as chatting with a friend**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-splitmate--dusky.vercel.app-blue?style=for-the-badge)](https://splitmate-dusky.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green?style=for-the-badge&logo=openai)](https://openai.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Demo Flow](#-demo-flow)
- [Architecture](#-architecture)
- [User Journey](#-user-journey)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**The Problem**: Managing expenses with friends is tedious. Users navigate multiple screens, forget who owes whom, and sending payment reminders feels awkward.

**The Solution**: SplitMate transforms expense management into a conversational experience. Simply chat with our AI assistant to add expenses, split bills, and settle payments—all through natural language interactions.

### 🏆 Hackathon MVP Features

- **💬 Chat Interface**: Add expenses conversationally (*"I spent ₹1200 on dinner with Rahul and Meera"*)
- **🤖 AI Analytics**: Natural language queries (*"How much did I spend on food last month?"*)
- **⚡ Real-time Updates**: Instant expense data synchronization
- **🎨 Engaging UX**: Error-tolerant, human-like interactions

---

## ✨ Key Features

### 🤖 **AI-Powered Conversational Interface**
- **Natural Language Processing**: Add expenses, query analytics, and manage groups by chatting in plain English
- **Smart Context Memory**: AI remembers your expenses, groups, and preferences using vector embeddings
- **Intelligent Suggestions**: Get personalized insights and financial recommendations

### 💰 **Smart Bill Splitting**
- **Automatic Calculations**: Instantly calculate who owes whom for equal or custom splits
- **Group Management**: Create trip/event groups with multiple participants
- **Real-time Balance Updates**: Live synchronization across all devices

### 📱 **UPI Integration & Payments**
- **UPI Deep Links**: One-tap payments through native UPI apps (PhonePe, Google Pay, Paytm)
- **QR Code Generation**: Scannable QR codes for instant payment collection
- **Payment Tracking**: Automatic settlement detection and balance updates

### 🔔 **Smart Reminder System**
- **WhatsApp Integration**: Send payment reminders via WhatsApp deep links
- **Web Share API**: Native sharing through mobile share sheets
- **Push Notifications**: In-app reminders with Firebase/OneSignal integration
- **Custom Messages**: Pre-filled payment requests with UPI links

### � **Analytics Dashboard**
- **Visual Charts**: Pie charts for category-wise spending, trend lines, bar graphs
- **AI Insights**: Smart spending pattern analysis and recommendations
- **Group Analytics**: Per-group expense breakdowns and member contributions

### 🔐 **Enterprise-Grade Security**
- **StackAuth Integration**: Secure authentication with social login support
- **Row-Level Security**: Database-level access controls with Supabase RLS
- **Vector Memory Isolation**: User-specific AI memory separation

### 📲 **PWA Ready**
- **Share Target API**: Receive shared transactions from UPI apps
- **Offline Support**: Core functionality works without internet
- **Mobile-First Design**: Responsive design optimized for mobile devices

---

## 🎬 Demo Flow

### **3-Step Hackathon Demo for Judges**

1. **📲 Share Transaction**: Share a PhonePe/GPay transaction → SplitMate auto-detects expense
2. **🤖 AI Processing**: AI summarizes → *"Dinner ₹1200, split between Rahul & Shreya → Rahul owes ₹600"*
3. **📱 Instant Reminder**: Click **Send Reminder → WhatsApp** → recipient gets payment link instantly

### **Real-World Usage Examples**

```
💬 User: "I paid 1500 for cab to airport, split with John and Sarah"
🤖 AI: "Got it! Added cab expense ₹1500. John owes ₹500, Sarah owes ₹500. 
      Want me to send them payment reminders?"

💬 User: "How much do I owe Rahul this month?"
🤖 AI: "You owe Rahul ₹800 total: ₹500 for Goa Trip dinner and ₹300 for movie tickets."

💬 User: "Create weekend trip group with Priya and Amit"
🤖 AI: "Created 'Weekend Trip' group! Added Priya and Amit as members. 
      Ready to track your trip expenses!"
```

---

## 🏗️ Architecture

```mermaid
graph TB
    A[User] --> B[Next.js Frontend]
    B --> C[AI Chat Interface]
    C --> D[OpenAI GPT-4]
    B --> E[StackAuth]
    B --> F[API Routes]
    F --> G[Supabase DB]
    F --> H[Vector Memory]
    F --> I[UPI Integration]
    I --> J[QR Generation]
    I --> K[WhatsApp Links]
    F --> L[Web Share API]
```

### **Component Architecture**

- **Frontend**: Next.js 15 (App Router) + TailwindCSS + shadcn/ui
- **AI Layer**: OpenAI API + Assistant UI + Vector Memory (Quadrant DB)
- **Authentication**: StackAuth with social login support
- **Database**: Supabase (structured data) + Row-level Security
- **Payments**: UPI Deep Links + QR Code Generation
- **Reminders**: WhatsApp Deep Links + Web Share API + Push Notifications

---

## 👤 User Journey

### **1. Onboarding Flow**
1. **Sign Up**: User signs up with StackAuth (email/Google/social)
2. **Profile Setup**: Add name, UPI ID, phone for reminders
3. **Auto-Generation**: System creates UPI templates and profile embeddings

### **2. Adding Expenses**

#### **Method A: Natural Language Chat**
```
User: "Add 800 lunch with team members Alex, Ben, Carol"
AI: Splits ₹800 equally → Alex owes ₹200, Ben owes ₹200, Carol owes ₹200
```

#### **Method B: Share from UPI Apps (PWA Feature)**
- Share PhonePe/GPay transaction → PWA receives it → Auto-fills amount + payee

#### **Method C: Manual Entry**
- Traditional form-based expense entry with participant selection

#### **Method D: WhatsApp Integration**
- Add expenses via WhatsApp bot commands

### **3. Group Management**

#### **AI-Powered Group Creation**
```
User: "Create Goa Trip group with Rahul & Shreya"
AI: → Searches vector memory → Confirms identities → Creates group → Stores memory
```

#### **Group Features**
- Expense tracking per group
- Member balance calculations  
- Group analytics and insights
- Shared expense history

### **4. Bill Splitting & Settlement**

#### **Automatic Calculations**
- Real-time "Who owes whom" calculations
- Visual balance indicators
- Optimized debt simplification

#### **Payment Collection**
- **UPI Deep Links**: `upi://pay?pa=user@upi&pn=Name&am=500&cu=INR`
- **QR Codes**: Scannable payment codes
- **WhatsApp Reminders**: Pre-filled payment requests

### **5. Reminder System**

#### **Multiple Reminder Channels**
1. **WhatsApp Deep Links**: `https://wa.me/?text=You%20owe%20₹500...`
2. **Web Share API**: Native mobile sharing
3. **Push Notifications**: In-app reminders
4. **SMS/Email**: Traditional reminder methods

---

## 🛠️ Tech Stack

### **Frontend & UI**
- **Framework**: Next.js 15 (App Router, PWA-ready)
- **Styling**: TailwindCSS + shadcn/ui components
- **AI Interface**: Assistant UI + AI SDK Elements

### **Backend & AI**
- **Runtime**: Node.js with Edge Runtime support
- **AI Engine**: OpenAI GPT-4 + Embeddings
- **Vector DB**: Quadrant DB (semantic search + memory)
- **Authentication**: StackAuth

### **Database & Storage**
- **Primary DB**: Supabase (PostgreSQL + Real-time)
- **Vector Memory**: Quadrant DB for AI context
- **File Storage**: Supabase Storage

### **Payment Integration**
- **UPI**: Deep Links + QR Code Generation (`qrcode` npm)
- **Payment Processing**: UPI ecosystem integration

### **Communication**
- **Reminders**: Web Share API (free) + WhatsApp Deep Links
- **Notifications**: Firebase/OneSignal (free tier)
- **Premium**: Twilio WhatsApp API

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ or Bun 1.0+
- OpenAI API key
- Supabase account
- StackAuth account

### **Installation**

```bash
# Clone the repository
git clone https://github.com/SH20RAJ/splitmate.git
cd splitmate

# Install dependencies (using Bun for faster installation)
bun install

# Environment setup
cp .env.example .env.local
```

### **Environment Variables**

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-key

# StackAuth Configuration
STACK_PROJECT_ID=your-project-id
STACK_PUBLISHABLE_CLIENT_KEY=pck-your-key
STACK_SECRET_SERVER_KEY=ssk-your-key

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Database URL (for Drizzle ORM)
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
```

### **Development**

```bash
# Start development server
bun run dev

# Run database migrations
bun run db:generate
bun run db:migrate

# Open Drizzle Studio (database GUI)
bun run db:studio
```

### **Building & Deployment**

```bash
# Build for production
bun run build

# Start production server
bun run start

# Deploy to Vercel
vercel --prod
```

---

## 📡 API Documentation

### **Core API Routes**

#### **Authentication & User Management**
- `POST /api/auth/[...stackauth]` - StackAuth handling
- `POST /api/user/sync` - User data synchronization

#### **Expense Management**
- `GET /api/expenses` - Fetch user expenses
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

#### **Group Management**
- `GET /api/groups` - Fetch user groups
- `POST /api/groups` - Create new group
- `PUT /api/groups/:id` - Update group
- `DELETE /api/groups/:id` - Delete group

#### **AI Chat Interface**
- `POST /api/chat` - AI conversation handling
- Stream-enabled with tool calling support

#### **SplitMate Specific Features**
- `POST /api/splitmate` - Main SplitMate API
  - `action: 'split_bill'` - Split expense calculation
  - `action: 'generate_qr'` - QR code generation

#### **UPI Integration**
- `POST /api/upi` - UPI link generation
- `POST /api/upi/qr` - QR code generation

#### **Reminder System**
- `POST /api/reminders` - Send reminders
- `POST /api/splitmate/remind` - WhatsApp reminder generation

### **API Response Examples**

#### **Split Bill Response**
```json
{
  "totalAmount": 1200,
  "splits": [
    { "person": "Rahul", "amount": 400 },
    { "person": "Meera", "amount": 400 },
    { "person": "You", "amount": 400 }
  ],
  "description": "Dinner at restaurant"
}
```

#### **QR Code Generation Response**
```json
{
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
  "upiLink": "upi://pay?pa=user@upi&pn=User&am=500&cu=INR",
  "amount": 500,
  "description": "Payment for dinner"
}
```

---

## 🚀 Deployment

### **Vercel Deployment (Recommended)**

1. **Connect Repository**
   ```bash
   # Deploy to Vercel
   vercel --prod
   ```

2. **Environment Variables**
   - Add all required environment variables in Vercel dashboard

3. **Build Configuration**
   - Uses Bun package manager for faster builds
   - Configured via `vercel.json`:
   ```json
   {
     "installCommand": "bun install",
     "buildCommand": "bun run build"
   }
   ```

### **Database Setup**

1. **Supabase Configuration**
   - Create new Supabase project
   - Run database migrations
   - Setup Row Level Security policies

2. **Database Schema**
   ```bash
   # Generate and apply migrations
   bun run db:generate
   bun run db:migrate
   ```

### **Production Considerations**

- **Performance**: Bun runtime for 3x faster package installation
- **Security**: Row-level security with Supabase RLS
- **Monitoring**: Vercel Analytics + Supabase monitoring
- **Scaling**: Edge runtime support for global distribution

---

## 🤝 Contributing

We welcome contributions to SplitMate! Here's how you can help:

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Install dependencies: `bun install`
4. Make your changes
5. Run tests: `bun test`
6. Submit a pull request

### **Contribution Areas**
- 🐛 Bug fixes and improvements
- ✨ New AI conversation patterns
- 🎨 UI/UX enhancements
- 📱 Mobile app development
- 🌐 Internationalization
- 📊 Analytics and insights

### **Coding Standards**
- TypeScript for type safety
- ESLint + Prettier for code formatting
- Conventional Commits for commit messages
- Component-based architecture
- Test-driven development

---

## 🎯 Hackathon Differentiators

✅ **Unique Share-to-App Integration**: PhonePe/GPay → Chat AI Expense Manager  
✅ **Premium UPI Features**: Deep Links, QR Codes, WhatsApp reminders  
✅ **Smart Vector Memory**: AI remembers context and relationships  
✅ **Dual Interface**: Both manual UI and AI chat support  
✅ **Beautiful Design**: shadcn/ui + AI Elements for polished UX  

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=SH20RAJ/splitmate&type=Date)](https://star-history.com/#SH20RAJ/splitmate&Date)

---

<div align="center">

**Made with ❤️ for seamless expense management**

[📱 Try Live Demo](https://splitmate-dusky.vercel.app/) • [📖 Documentation](docs/) • [🐛 Report Bug](../../issues) • [✨ Request Feature](../../issues)

</div>