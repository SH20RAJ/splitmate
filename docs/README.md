# 💬 SplitMate – Expense Chatbot (HackQuest 2025)

A conversational chatbot that makes expense management effortless.  
Built for **HackQuest Pantheon 2025 (SplitKaro Special Track)**.  

---

PS = Build a conversational chatbot to add, manage, and analyze expenses in natural language, making finance management effortless.

---

https://www.notion.so/Hackquest-263f46ab1581805082cdea91df37e8ea?source=copy_link



## ✨ Overview
SplitMate is a **natural language expense manager** that helps users:
- Add expenses with a simple message
- Track and categorize spending
- Split bills fairly with friends
- Get insights and summaries in real time
- **[NEW] Share-to-Chat Integration** → Expenses from UPI apps (PhonePe, GPay, Paytm) can be directly shared into our chatbot interface via **Web Share Target API**.

Example:  
> **You:** "I spent ₹500 on cab yesterday"  
> **Bot:** "Got it! Added ₹500 under Transport > Cab on Sep 3."  

---

## 🚀 Features
- **Expense Logging:** Add expenses via text or voice in natural language.  
- **Smart Categorization:** Auto-detect categories (Food, Travel, Bills, Shopping).  
- **Bill Splitting:** Split bills with friends using SplitKaro-style logic.  
- **Expense Analytics:** Daily, weekly, and monthly insights.  
- **Reminders:** Friendly nudges when it’s time to settle up.  
- **Multi-language Support:** English + Hinglish for Indian users.  
- **Gamification:** Earn streaks and badges for consistent tracking.  
- **[NEW] Share-to-Chat (UPI Integration):**  
  - Using **Next.js PWA + Web Share Target API**, users can share text/receipts from UPI apps.  
  - Example: *“Paid ₹200 to Rahul via PhonePe”* → opens directly in SplitMate’s chatbot to auto-log the expense.  

---

## 🛠 Tech Stack
- **Frontend / Interface:** Next.js 15 (App Router) + TailwindCSS  
- **Chat Engine:** LangChain + OpenAI GPT (NLP)  
- **Backend:** Next.js API Routes (Node.js)  
- **Database:** MongoDB (expense & user data)  
- **Integrations:**  
  - SplitKaro-inspired expense logic  
  - UPI sharing via Web Share Target API (Android Chrome)  

---

## 🧑‍💻 Installation
```bash
# Clone repo
git clone https://github.com/your-username/splitmate.git

# Install dependencies
cd splitmate
npm install

# Add environment variables
cp .env.example .env

# Run development server
npm run dev
````

---

## 🎯 Usage

1. Start the chatbot interface (web or PWA).
2. Add an expense:

   * `I spent ₹500 on cab yesterday`
   * `Split ₹1200 Domino’s bill with Aditi and Rahul`
3. Query your expenses:

   * `Show me my top 3 spends this month`
   * `How much did I spend on food last week?`
4. \[NEW] Share from UPI apps (Android Chrome only):

   * On PhonePe → Tap *Share* → Select SplitMate → Expense auto-appears in chat.

---

## 🔮 Future Scope

* Native **Android/iOS Share Extensions** via Expo for deeper integration.
* SMS/Bank parsing for auto-expense logging.
* AI-powered budgeting advice.
* Voice assistant support.
* Real SplitKaro API integration.

---

## 🧩 Problem → Solution Mapping

| Problem                           | How SplitMate Solves It                                                               |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| Adding expenses is tedious        | Natural language chatbot entry (“Spent ₹250 on pizza”)                                |
| Hard to track categories          | AI auto-categorizes into Food, Travel, Bills, etc.                                    |
| Group bill splitting is confusing | SplitMate splits fairly with SplitKaro-style logic                                    |
| Forgetting to settle              | Smart reminders + streak gamification                                                 |
| Lack of visibility into spending  | Analytics with charts, summaries, top categories                                      |
| Sharing UPI payments manually     | **Web Share Target API** lets users share PhonePe/GPay receipts directly into chatbot |
| Multilingual needs (India)        | English + Hinglish NLP support                                                        |

---

## 🤝 Team

Built with ❤️ by **\Shade** for **HackQuest Pantheon 2025**.

 