Perfect idea 🔥 — having a **prompts.md** file for Cursor (or any AI coding copilot) will save a ton of time in the hackathon.

Here’s a **ready-to-use `prompts.md`** that contains **step-by-step prompts** for Cursor to build your app:

---

# 📄 prompts.md

## 1. **Project Setup**

```md
Create a Next.js 15 app (App Router, TypeScript, Tailwind).  
Add shadcn/ui, ai-sdk.dev, and Supabase.  
Setup StackAuth for authentication.  
Configure Supabase with tables: Users, Groups, Expenses.  
Models:  
- User { id, name, email, phone, upi_id }  
- Group { id, name, members[] }  
- Expense { id, group_id, amount, description, paid_by, split_between[], created_at }  
Deploy on Vercel.  
```

---

## 2. **UI Components**

```md
Build UI with shadcn/ui + Tailwind.  
Pages:  
1. **Auth** (login/signup with StackAuth)  
2. **Dashboard** → shows user’s groups  
3. **Group Page** → list of expenses + balances  
4. **Add Expense Modal** → form (amount, description, payer, members)  
5. **Settle Page** → show balance summary + UPI deep link + QR generator  

Use ai-sdk.dev Elements for chat components.  
Make UI clean, premium, and hackathon-ready.  
```

---

## 3. **Expense Logic**

```md
Implement equal split calculation.  
When an expense is added:  
- Update balances for each group member.  
- Store transaction in DB.  
Show per-user balance (who owes who).  
Generate UPI deep link for settlement:  
upi://pay?pa=<upi_id>&pn=<name>&am=<amount>&cu=INR  
Also generate a QR code.  
```

---

## 4. **PWA + Share Target**

```md
Enable PWA support (installable app).  
Add Web Share Target API:  
When a user shares a UPI request from PhonePe/Paytm → open SplitMate and prefill expense form.  
Make sure offline support works with service worker.  
```

---

## 5. **AI Assistant (Chatbot)**

```md
Use ai-sdk.dev + OpenAI.  
Vector DB = Qdrant.  
Store group context (names, expenses, balances).  
AI should answer:  
- “Who owes who?”  
- “How much do I need to pay Shreya?”  
- “Summarize balances in Group X.”  

Provide fallback UI:  
- Buttons → “Settle with X”, “Add Expense”, “Show Summary”.  
```

---

## 6. **WhatsApp Premium Option**

```md
Integrate Twilio WhatsApp API (optional).  
Allow sending settlement reminders via WhatsApp from SplitMate.  
Message format:  
“Hi <name>, you owe ₹<amount>. Pay via this UPI link: <link>”  
```

---

## 7. **Final Polishing**

```md
- Add demo data seeding (Shreya, Rahul, etc.).  
- Add dark mode.  
- Add group summary UI.  
- Make sure everything works end-to-end.  
- Prepare 3 demo flows: Add Expense → Share UPI → Ask AI.  
```

---

⚡ With this `prompts.md`, you just **copy-paste prompts into Cursor** phase by phase. Cursor will generate code, and you refine.

---

Do you also want me to create a **short “cursor-commands.md”** (like one-liner mini prompts for fixing/debugging quickly during hackathon)? That’ll save you when time is low.
