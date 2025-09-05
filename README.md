# 💬 SplitMate – AI-Powered Expense Chatbot

A conversational chatbot that makes expense management and bill splitting effortless through natural language interactions.

**Built for HackQuest Pantheon 2025 (SplitKaro Special Track)**

---

## 🎯 The Problem

Managing expenses can feel tedious as users must navigate multiple screens to add and view details. What if expense management could be as simple as chatting with a friend?

## ✨ The Solution: SplitMate

SplitMate is an AI-powered expense management chatbot that transforms how you track and split costs. Instead of manual data entry, just talk to our AI.

> **You:** "I spent ₹500 on a cab yesterday"  
> **SplitMate:** "Got it! Added ₹500 under Transport on Sep 4th"

> **You:** "Split ₹1200 for pizza with Rahul and Shreya"  
> **SplitMate:** "Done! Each person owes ₹400. Send reminder?"

---

## 🚀 Key Features & Implementation Guide

### 💬 **1. Natural Language Processing**

- **What it is:** Add expenses, query analytics, and manage groups by chatting in plain English.
- **How to implement it:**
    1.  **UI Layer:** Use `ai-sdk.dev`'s pre-built chat components for a ready-made interface.
    2.  **AI Engine:** Connect to the OpenAI API for language understanding.
    3.  **Context & Memory:** Use a Qdrant Vector DB to store embeddings of users, expenses, and groups. This allows the AI to remember relationships (e.g., who "Rahul" is).
    4.  **Backend:** Create an API route (e.g., `/api/chat`) that takes the user's message, fetches context from Qdrant, and calls the OpenAI API.

### 💰 **2. Smart Bill Splitting**

- **What it is:** Automatically calculate who owes whom for equal or custom splits.
- **How to implement it:**
    1.  **Data Model:** In your Supabase database, create tables for `expenses`, `groups`, and `group_members`.
    2.  **Splitting Logic:** When an expense is added, create a function to calculate each member's share and update their balance in a `balances` table.
    3.  **Real-time Updates:** Use Supabase's real-time capabilities to instantly reflect balance changes for all group members.

### 📱 **3. UPI Integration & Reminders**

- **What it is:** Generate UPI deep links and QR codes for one-tap payments and send reminders via multiple channels.
- **How to implement it:**
    1.  **UPI Deep Links:** Generate links using the format: `upi://pay?pa={upi_id}&pn={name}&am={amount}&cu=INR`.
    2.  **QR Codes:** Use a library like `qrcode` to generate QR codes from the UPI deep link string.
    3.  **Reminders (Hackathon-Ready):**
        *   **WhatsApp:** Use a deep link: `https://wa.me/?text=Hey! You owe me ₹{amount} for {expense}. Pay here: {payment_link}`.
        *   **Web Share API:** Use `navigator.share()` to open the native share sheet on mobile devices for a seamless experience.

### 🔄 **4. Share-to-Chat (PWA)**

- **What it is:** Share UPI transaction screenshots or text directly from apps like PhonePe/GPay into SplitMate for automatic parsing.
- **How to implement it:**
    1.  **PWA Setup:** Configure your Next.js app to be a Progressive Web App (PWA).
    2.  **Web Share Target API:** In your `manifest.json`, define a `share_target` that accepts shared files/text and directs them to a specific URL in your app (e.g., `/share-handler`).
    3.  **Parsing Logic:** On the `/share-handler` page, parse the received text to extract the amount and payee, then pre-fill the "Add Expense" form.

---

## 🛠 Tech Stack

- **Frontend:** Next.js 15 + TailwindCSS + shadcn/ui
- **AI:** OpenAI API + ai-sdk.dev + Qdrant Vector DB
- **Auth:** StackAuth
- **Database:** Supabase
- **PWA:** Service Worker + Web Share Target API
- **Payments:** UPI Deep Links + QR Generation

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- OpenAI API key
- Supabase account

### Installation
1.  **Clone the repository**
    ```bash
    git clone https://github.com/sh20raj/splitmate.git
    cd splitmate
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Environment Setup**
    ```bash
    cp .env.example .env.local
    ```
    Add your API keys to `.env.local`.

4.  **Run the development server**
    ```bash
    npm run dev
    ```
---

## 🤝 Contributing

Built with ❤️ for HackQuest Pantheon 2025

**Team:** Shaswat Raj & Contributors

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
