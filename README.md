# Splitmate 💸  
> Simplifying group expenses, one split at a time.

![Splitmate Banner](https://splitmate.pages.dev/og-image.png) <!-- Replace with your actual OG/banner -->

Splitmate is an **open-source expense splitting app** designed to make it effortless for friends, families, and teams to manage shared expenses. Think **Splitwise** but built for **modern web + Indian-first users** with UPI, AI assistance, and clean UI.

🌐 Live: [splitmate.pages.dev](https://splitmate.pages.dev/)  
📦 Repo: [github.com/SH20RAJ/splitmate](https://github.com/SH20RAJ/splitmate/)

---

## ✨ Features (MVP)
- ➕ Add expenses easily with amount, payer, and members.  
- 👥 Create groups (Trips, Friends, Roommates).  
- ⚖️ Automatic balance calculation → who owes whom.  
- ✅ Simple settlement tracking (mark as paid/unpaid).  
- 📊 Dashboard view of total owed/lent.  
- 📱 Responsive, clean UI powered by Shadcn/UI.  
- 🤖 AI chat assistant for natural language expense input.
- 🔗 UPI payment link generation for quick settlements
- 📊 Insights & analytics for smarter spending.
- 📧 Email notifications & reminders (via Resend).
- 🧑‍💼  authentication (StackAuth ready).
- PWA support for web share api & installability.
- 🗃️ Supabase backend (Postgres).
- 🛠️ Easy to set up locally with Bun/Node.js.
- OpenAI integration for AI-powered features.


---

## 🚀 Planned Features
- 📷 Receipt upload & AI-powered auto-extraction.  
- 💰 UPI integration for instant settlements.  
- 🔔 Smart reminders & email notifications.  
- 📈 Analytics & insights (who spends the most, categories).  
- 🌍 Multi-language support.  
- 🧑‍🤝‍🧑 Social features (reactions, comments).  

---

## 🛠️ Tech Stack
A modern, hackathon-ready stack:

- **Frontend:** [Next.js 15](https://nextjs.org/) (App Router)  
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)  
- **Database & Auth:** [Supabase](https://supabase.com/) (Postgres + Auth)  
- **Authentication Layer:** [StackAuth](https://stack-auth.com/) for flexible user login  
- **AI Assistance:** [OpenAI](https://platform.openai.com/) for smart expense categorization & insights  
- **Emails & Notifications:** [Resend](https://resend.com/) for transactional emails  
- **Hosting:** [Vercel](https://vercel.com/) / [Cloudflare Pages](https://pages.cloudflare.com/)  
- **Optional:**  
  - [Clerk](https://clerk.com/) / [NextAuth.js](https://next-auth.js.org/) alternative auth.  
  - [Stripe](https://stripe.com/) for premium features (Pro plan).  

---

## 📸 Screenshots (WIP)
<!-- Add screenshots/gifs of app demo once ready -->
![Dashboard Screenshot](public/screenshot1.png)  
![Group Expenses Screenshot](public/screenshot2.png)  

---

## 📦 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/SH20RAJ/splitmate.git
cd splitmate
````

### 2. Install dependencies

```bash
pnpm install   # or npm install / yarn install
```

### 3. Set up environment variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

OPENAI_API_KEY=your_openai_key
STACKAUTH_API_KEY=your_stackauth_key
RESEND_API_KEY=your_resend_key
```

### 4. Run the app

```bash
pnpm dev
```

App will be available at [http://localhost:3000](http://localhost:3000).

---

## 🤝 Contributing

We welcome contributions!

* Fork the repo
* Create a feature branch
* Submit a PR 🚀

Open issues and feature requests in [GitHub Issues](https://github.com/SH20RAJ/splitmate/issues).

---

## 📜 License

[MIT](LICENSE) © 2025 [Shaswat Raj](https://shaswat.live)

---

## 🌟 Acknowledgements

* Inspired by Splitwise but reimagined for modern web & UPI-first users.
* Built with ❤️ at hackathons by the [Splitmate](https://github.com/SH20RAJ/splitmate) community.