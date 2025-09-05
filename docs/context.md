Got it ✅ — a **context.md** will be your **master reference** file during the hackathon, so anyone (you, teammates, Cursor AI) has the **entire vision + tech stack + flow in one place**.

Here’s a **ready `context.md`**:

---

# 📄 context.md

## 🔹 Project Name

**SplitMate** – An AI-powered expense-splitting assistant for friends, groups, and trips.

---

## 🔹 Problem Statement

Managing group expenses (trips, parties, daily shared costs) is messy.

* People forget who paid what.
* Settlements are confusing.
* UPI payments are done separately but not linked back to expense tracking.

Hackathon Goal → Build a **smart, lightweight app** that:

1. Splits expenses automatically.
2. Lets users pay via UPI links/QRs instantly.
3. Provides AI-powered summaries & reminders.
4. Works as a **PWA** (installable on phone, no heavy setup).

---

## 🔹 Solution (Our App)

A **Next.js 15 app** with:

* **Chat-first UI** (AI chatbot helps manage expenses).
* **Fallback UI** (manual forms & dashboard).
* **UPI deep link + QR integration**.
* **PWA with Share Target API** → auto-capture shared UPI info from apps like PhonePe/Paytm.
* **AI + Vector DB** → remembers users, groups, and context.
* **Premium-looking reminders** via WhatsApp (Twilio API).

---

## 🔹 Tech Stack

* **Frontend & Backend** → Next.js 15 (App Router, TypeScript, Tailwind).
* **UI** → shadcn/ui + ai-sdk.dev Elements (for AI chat interface).
* **Auth** → StackAuth (secure, quick auth).
* **Database** → Supabase (Postgres) or MongoDB (leaner, document-friendly).
* **Vector DB** → Qdrant (for semantic memory, user/entity recognition).
* **Payments** → UPI Deep Links & QR Generator.
* **PWA** → Service Worker + Share Target API.
* **AI** → OpenAI via ai-sdk.dev.
* **Optional Premium** → Twilio WhatsApp API for reminders.

---

## 🔹 Core Features

1. **Auth & Profiles**

   * Users register (StackAuth).
   * Save `name`, `email`, `phone`, `upi_id`.
   * Each profile stored in Supabase + embedded in Qdrant for semantic matching.

2. **Groups & Expenses**

   * Create groups (e.g., Goa Trip).
   * Add members (map to registered users).
   * Add expense (amount, description, paid\_by, split\_between).
   * Auto calculate balances.

3. **Settlement**

   * Show “who owes who.”
   * Generate UPI payment link & QR for instant transfer.
   * Option to send reminder via **Twilio WhatsApp API**.

4. **AI Assistant**

   * Chatbot answers: “How much do I owe Rahul?” / “Who hasn’t paid in Goa Trip?”
   * Uses Qdrant to resolve user identities (Rahul, Shreya, nicknames).
   * Memory of groups & expenses for contextual conversation.

5. **PWA + Share Target**

   * If someone shares a UPI request from PhonePe → SplitMate opens & parses details.
   * Prefills expense form → User just confirms → Expense saved.

---

## 🔹 Example Flow

1. User signs in (StackAuth).
2. Creates **Goa Trip group** with Rahul & Shreya.
3. Adds expense → “Cab ₹800 paid by me, split equally.”
4. AI updates balances → Rahul owes ₹266, Shreya owes ₹266.
5. Rahul clicks “Settle Now” → Opens UPI link → Payment done.
6. Shreya ignores → After 2 days, SplitMate sends Twilio WhatsApp reminder with QR + link.

---

## 🔹 Why Vector DB (Qdrant)?

* Name resolution (Rahul vs Rahool, Shreya vs Shriya).
* Nickname handling (Chintu = Rahul).
* Context queries: *“Who spent the most in Goa Trip?”*
* Memory persistence across sessions.

---

## 🔹 UI/UX Take

* Chat-first, minimal + fun (like WhatsApp).
* Manual fallback UI (Dashboard + Forms).
* Shadcn UI for premium design.
* Dark mode enabled.

---

## 🔹 Hackathon Build Phases (24h)

**Phase 1 (0–4h):** Setup Next.js, Supabase, StackAuth, shadcn/ui.
**Phase 2 (4–8h):** Build groups + expense models + basic UI.
**Phase 3 (8–12h):** Add UPI deep link + QR settlement flow.
**Phase 4 (12–16h):** Integrate AI chatbot (ai-sdk.dev + Qdrant).
**Phase 5 (16–20h):** Add PWA Share Target + offline support.
**Phase 6 (20–24h):** Polish UI, add demo data, integrate Twilio WhatsApp API, prep pitch.

---

## 🔹 Extra Premium Features (if time allows)

* Expense summary charts (Recharts).
* Export group report as PDF.
* Smart reminders (“Settle before Friday, else interest ₹10/day 😅”).
* Voice input → “Hey SplitMate, add dinner ₹1200 for Goa Trip.”

---

This file acts as the **complete brain of the project** → context for AI + quick onboarding for teammates.

---

⚡ Do you want me to also create a **data\_models.md** that details the exact Supabase/Mongo schema with tables/collections + relations? That’ll make coding 10x faster.
