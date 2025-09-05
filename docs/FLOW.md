# 📌 SplitMate — Full Application Flow

---

## 🔹 1. Tech Stack Overview

* **Framework:** Next.js 15 (App Router, PWA-ready).
* **UI:** [shadcn/ui](https://ui.shadcn.com) for polished components.
* **AI Elements:** [ai-sdk.dev](https://ai-sdk.dev) + [AI Elements](https://ai-sdk.dev/elements/overview) → prebuilt chat UI + AI integrations.
* **Auth:** StackAuth.
* **DB (Structured):** Supabase (auth, real-time expenses, groups).
* **Vector DB:** Quadrant DB (semantic search + memory).
* **AI Engine:** OpenAI API + embeddings.
* **Reminders:**

  * Web Share API (free)
  * Push Notifications (Firebase/OneSignal free tier)
  * WhatsApp deep link (free)
  * Twilio WhatsApp API (premium option).
* **Payments:** UPI Deep Links + QR code generator (`qrcode` npm).

---

## 🔹 2. User Onboarding

1. User opens app (PWA/web).
2. Sign in with **StackAuth** → email OTP / Google login.
3. Setup profile:

   * Name (e.g. Rahul Sharma).
   * UPI ID (e.g. rahul\@upi).
   * Optional: Phone/Email for reminders.
4. System auto-generates:

   * UPI deep link template: `upi://pay?pa=rahul@upi&pn=Rahul+Sharma&am=<amount>&cu=INR`.
   * Personal QR code.
   * Profile embedding → stored in **Quadrant DB**.

---

## 🔹 3. Adding Expenses

### Manual

* User taps **Add Expense**.
* Fill: Title, Amount, Paid By, Split Between.
* App updates balances.

### Chat Command

* In chat: `/add 1200 Dinner with Rahul & Shreya`.
* AI parses → creates expense entry in DB.

### Share Intent (PWA)

* User shares a PhonePe/GPay transaction → PWA Share Target receives it.
* Auto-fills amount + payee.

### WhatsApp/Twilio

* Expense can be added via WhatsApp chat with SplitMate bot.

---

## 🔹 4. Groups / Communities

### Manual Flow

* Create Group → Invite Members (via link/QR).
* Inside Group:

  * Expense list.
  * Balances summary.
  * “Add Expense” modal.
  * Analytics tab (charts by category, top spender).

### AI Flow

* User: *“Create Goa Trip group with Rahul & Shreya.”*
* AI → Quadrant DB → find Rahul & Shreya profiles → confirm identities.
* Group created → members added.
* Memory stored for future reference.

---

## 🔹 5. Splitting & Tracking

* App auto-calculates “Who owes whom.”
* In chat:

  * Rahul sees: *“You owe Shaswat ₹600 for Dinner 🍕.”*
  * Shreya sees: *“You owe Rahul ₹200 for Cab 🚕.”*
* Each owes/owed line comes with:

  * **Pay Now (UPI deep link)**.
  * **View QR Code**.

---

## 🔹 6. Reminders

### Options

1. **Quick Demo (Hackathon)**

   * Copy link, WhatsApp deep link, SMS/Email share.
2. **PWA Share Target**

   * `navigator.share()` → native Android/iOS share sheet.
3. **UPI Deep Link Reminder**

   * Direct “Pay Now” link with pre-filled amount.
4. **Twilio WhatsApp API** (premium option)

   * SplitMate sends branded reminder → *“Hi Rahul, you owe ₹600 for Goa Trip. Pay here: <link>.”*
5. **Push Notifications**

   * Firebase/OneSignal free tier → in-app reminders.

---

## 🔹 7. AI Chatbot & Vector Memory

### Queries Supported

* “How much do I owe Rahul this month?”
* “Summarize my Goa Trip expenses.”
* “Who owes me the most right now?”
* “Add ₹800 Cab to Goa Trip split equally.”

### How It Works

1. User query → OpenAI API.
2. Context fetched from **Quadrant DB** (embeddings of expenses, groups, members).
3. Response = structured + natural.
4. AI can suggest actions:

   * *“Rahul owes ₹600. Do you want to send him a reminder?”* → button.

---

## 🔹 8. Analytics Dashboard

* Charts (Recharts):

  * Pie: Expenses by category.
  * Line: Monthly trend.
  * Bar: Who owes you the most.
* AI insights:

  * *“Your biggest spending was on food last month (₹3200).”*
  * *“Rahul owes you the most overall (₹2500).”*

---

## 🔹 9. Security

* StackAuth → user sessions.
* Supabase row-level security → expenses visible only to group members.
* Quadrant DB tied to user ID → safe memory separation.

---

## 🔹 10. Hackathon Differentiators

✅ **Unique**: Share-to-app via PhonePe/GPay → Chat AI Expense Manager.
✅ **Premium**: UPI Deep Links, QR Codes, Twilio WhatsApp reminders.
✅ **Smart**: Vector DB memory + natural queries.
✅ **Reliable**: Manual + AI UI both supported.
✅ **Beautiful**: shadcn/ui + AI Elements → sleek polished frontend.

---

# 🚀 3-Step Demo Flow for Hackathon Judges

1. Share a PhonePe transaction → SplitMate auto-detects expense.
2. AI summarizes → *“Dinner ₹1200, split between Rahul & Shreya → Rahul owes ₹600.”*
3. Judge clicks **Send Reminder → WhatsApp** → gets payment link instantly.

---

👉 This doc covers **everything: onboarding → expense → groups → AI → reminders → analytics**.
