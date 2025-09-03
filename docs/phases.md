Got it ✅ For a **24-hour hackathon**, we need to scope the build into **phases**, each with clear deliverables and a fallback plan (so we always have something working to demo). Here’s a **phase-wise breakdown** for building your app (SplitMate or whatever name you finalize):

---

# 🚀 Hackathon Build Plan (24 Hours)

### **Phase 1: Setup & Foundations (0 – 3 hrs)**

* **Project Setup**

  * Next.js + TypeScript project setup
  * Integrate **shadcn/ui** for ready-to-use, premium UI
  * Connect Supabase (DB + Auth) or MongoDB + StackAuth for authentication
  * GitHub repo + CI/CD (Netlify/Vercel for quick deploys)

* **Core Data Model**

  * Users (with UPI ID, name, phone/email, auth)
  * Groups (multiple users, expenses linked)
  * Expenses (amount, description, paid\_by, split\_between)

✅ *Milestone:* User can sign up, create a group, and add an expense.

---

### **Phase 2: Expense Management (3 – 7 hrs)**

* **UI Screens**

  * Dashboard (groups overview)
  * Group Page (list of expenses + balances)
  * Add Expense Modal (form with auto-split calculation)

* **Logic**

  * Automatic split calculation (equal split for MVP)
  * Show balances per person
  * Generate **UPI deep links** for settling balances

✅ *Milestone:* Working expense tracker with real-time balances.

---

### **Phase 3: Sharing & Premium-feel Integrations (7 – 12 hrs)**

* **PWA Support**

  * Installable app
  * **PWA Share Target API** → allow receiving shared UPI requests (e.g., share from PhonePe → SplitMate)

* **Sharing Options**

  * Share via UPI link
  * Share via QR (generate with free QR library)
  * Optional: **Twilio WhatsApp API** for premium message sending

✅ *Milestone:* Users can share expenses/settlements easily from inside and outside the app.

---

### **Phase 4: AI Assistant (12 – 18 hrs)**

* **Chatbot UI**

  * Integrate **ai-sdk.dev** + **OpenAI**
  * Use **Vector DB (Qdrant)** to store user/group context (names like Shreya, Rahul, group expenses, etc.)

* **AI Capabilities**

  * Understand queries like:

    * *“Who owes who?”*
    * *“How much do I need to pay Shreya?”*
    * *“Summarize group balances.”*

* **Fallback UI**

  * Add manual buttons (like “Settle with Shreya”) for quick demo if chatbot fails

✅ *Milestone:* AI-powered and manual ways to settle balances.

---

### **Phase 5: Polishing & Demo Prep (18 – 24 hrs)**

* **Polish UI**

  * Add branding, colors, icons
  * Demo data seeding (so judges see ready-made groups & expenses)

* **Premium-feel Features** (optional if time permits)

  * Dark mode toggle
  * Simple notifications/reminders
  * Leaderboard/summary screen

* **Demo Prep**

  * Prepare **3 use cases** to show:

    1. Add & split expense
    2. Share UPI link & settle
    3. Ask AI assistant for group summary

✅ *Milestone:* Ready-to-demo polished MVP.

---

# 🔑 Notes

* Always keep **manual fallback** for AI features.
* Prioritize **end-to-end flow** over perfection (judges love working demos).
* Aim for **polished, premium feel** → use shadcn/ui + AI SDK Elements.
* Keep **extra features modular** → show them if time allows.

---

⚡ My suggestion: For DB, **Supabase** is better than Mongo in hackathon context because it gives Auth + Realtime + Storage out of the box, saving hours.

---

Do you want me to **map the exact team roles** (who does frontend, backend, integrations, demo prep) for the 24 hrs too? That way we can allocate efficiently.
