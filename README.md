# 💬 SplitMate – AI-Powered Expense Chatbot

A conversational chatbot that makes expense management and bill splitting effortless through natural language interactions.

**Built for HackQuest Pantheon 2025 (SplitKaro Special Track)**

---

## ✨ What is SplitMate?

SplitMate transforms how you manage group expenses. Instead of tedious manual entry, simply chat with our AI:

> **You:** "I spent ₹500 on cab yesterday"  
> **SplitMate:** "Got it! Added ₹500 under Transport on Sep 4th"

> **You:** "Split ₹1200 pizza with Rahul and Shreya"  
> **SplitMate:** "Done! Each person owes ₹400. Send reminder?"

---

## 🚀 Key Features

### 💬 **Natural Language Processing**
- Add expenses by chatting: *"Paid ₹800 for dinner with friends"*
- Smart categorization with emojis (Food 🍕, Travel 🚕, Bills 💡)
- AI remembers context and relationships

### 💰 **Smart Bill Splitting**
- Equal splits or custom amounts
- Auto-calculates who owes whom
- Tracks settlements in real-time

### 📱 **UPI Integration**
- Generate UPI deep links for instant payments
- QR codes for easy scanning
- One-tap settlement from chat

### 🔄 **Share-to-Chat**
- Share UPI transactions from PhonePe/GPay directly into SplitMate
- Auto-parse payment details
- PWA support for seamless integration

### 🤖 **AI Assistant**
- Ask: *"How much do I owe Rahul this month?"*
- Get insights: *"Your food expenses are up 30% this week"*
- Smart reminders and notifications

### 📊 **Analytics Dashboard**
- Visual spending trends and charts
- Category-wise breakdowns
- Group expense summaries

---

## 🛠 Tech Stack

- **Frontend:** Next.js 15 + TailwindCSS + shadcn/ui
- **AI:** OpenAI API + ai-sdk.dev + Qdrant Vector DB
- **Auth:** StackAuth
- **Database:** Supabase
- **PWA:** Service Worker + Web Share Target API
- **Payments:** UPI Deep Links + QR Generation
- **Reminders:** Twilio WhatsApp API

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API key
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/splitmate.git
cd splitmate
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

Add your API keys to `.env.local`:
```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
QDRANT_URL=your-qdrant-url
QDRANT_API_KEY=your-qdrant-key
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📱 Demo Flow

1. **Share from UPI App** → PhonePe transaction shared to SplitMate
2. **AI Parsing** → "Dinner ₹1200 detected, split with whom?"
3. **Smart Split** → "Rahul owes ₹400, Shreya owes ₹400"
4. **Send Reminder** → WhatsApp message with UPI payment link
5. **Track Settlement** → Real-time balance updates

---

## 🎯 Problem → Solution

| Problem | SplitMate Solution |
|---------|-------------------|
| Manual expense entry is tedious | Natural language chat interface |
| Forgetting who owes what | AI-powered balance tracking |
| Awkward payment reminders | Automated WhatsApp/UPI reminders |
| Complex bill splitting | Smart equal/custom split calculations |
| No spending insights | AI analytics and trends |
| UPI sharing is manual | Direct share from payment apps |

---

## 🔮 Roadmap

- [ ] **Phase 1:** Core expense management + UPI integration
- [ ] **Phase 2:** PWA + Share Target API
- [ ] **Phase 3:** AI chatbot + vector memory
- [ ] **Phase 4:** WhatsApp reminders + analytics
- [ ] **Phase 5:** Multi-language support (Hinglish)
- [ ] **Future:** Voice input, OCR receipts, budgeting AI

---

## 🤝 Contributing

Built with ❤️ for HackQuest Pantheon 2025

**Team:** Shaswat Raj & Contributors

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

**SplitMate - Pay Smart, Stay Friends** 🤝💰
