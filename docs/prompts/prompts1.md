Nice — let’s make this **actionable and hackathon-ready**. Below you’ll get:

1. The **UI/UX split into 5 frontend parts** (purpose, layout, components, interactions, states, data needs, accessibility notes).
2. **5 copy-paste AI prompts** (one per major build step) that you can drop into a code-generation LLM (or use with Copilot/Gen) to create the app step-by-step.

I’ll assume **Next.js 15 (App Router) + TailwindCSS** for the frontend (you told me you’ll build in Next.js). Let’s go.

# Part 1 — Chat-First Home (Main screen)

**Purpose:** Primary interaction surface — conversations, expense cards, quick actions.

**Layout**

* Single-column, mobile-first card (max-w-sm, center). Header with app name + menu (left), profile/QR (right).
* Chat area: vertical scroll, messages stack bottom-up.
* Composer (fixed to bottom): input, mic, quick action buttons.
* Floating FAB (+) for quick add / split / receipt scan.

**Key components**

* `ChatWindow` — scroll container of messages.
* `MessageBubble` — user vs bot styles.
* `ExpenseCard` — small card inside chat showing recorded expense.
* `ActionChips` — quick actions under input (Add Expense, Split Bill, Summary).
* `TypingIndicator` — animated dots.
* `EmptyState` — first-open illustration + CTA “Add your first expense”.

**Interactions**

* Type natural language → on send, show “processing” typing → show parsed expense card with CTA buttons (Edit / Confirm / Split / Cancel).
* Tap expense card → open `ExpenseDetailDrawer`.
* Quick actions fill the composer with example templates.
* Swipe left on a message (mobile) → show “edit / delete / favorite”.

**States**

* Loading: skeleton bubbles.
* Success: green toast “Expense added”.
* Error: inline message + retry.
* Offline: warn at top bar and queue entries.

**Data needed**

* messages: `{id, role, text, createdAt, parsedExpense?}`
* expense: `{id, amount, category, date, payee, groupId, split}`

**Accessibility**

* Proper aria-labels for input and buttons.
* Contrast ratio, keyboard focus visible.
* Announce new messages via `aria-live="polite"`.

**Tailwind hints**

* Container: `max-w-sm mx-auto h-screen flex flex-col`
* Chat bubble user: `self-end bg-primary-600 text-white rounded-2xl p-3`
* Bot bubble: `self-start bg-gray-100 text-gray-900 p-3 rounded-2xl`

---

# Part 2 — Composer, Smart Parse Preview & Quick Add

**Purpose:** Where user types/shares receipt and gets instant parsing feedback + confirm.

**Layout**

* Composer with: text input (expandable), mic icon, attach/share icon, emoji, quick templates menu.

**Components**

* `NLPPreview` — shows parsed amount/date/category extracted in live preview as chips.
* `VoiceRecorder` — records short voice, transcribes via Web Speech or serverless function.
* `AttachHandler` — for images/screenshots (receipt OCR) and shared text.

**Interactions**

* Live parsing: as user types, call `/api/parse` (debounced 400ms) and show preview (amount/date/category).
* Attach image → show thumbnail + OCR progress → show suggested parsed expense preview.
* “Confirm” button turns preview into actual expense entry and displays an `ExpenseCard` in chat.

**States**

* Parsing: spinner inside NLPPreview.
* OCR fail: “Couldn’t read receipt — type amount manually”.
* Draft autosave: show “Draft saved” if offline.

**Edge cases**

* Ambiguous amounts (₹50–500) → show suggested options to pick.
* Multiple amounts in receipt → ask clarifying question.

---

# Part 3 — Split Bill Flow & Group Management

**Purpose:** Let users create groups, add participants, and run splitting logic (equal, itemized, weight/percentage).

**Screens / Overlays**

* `CreateGroupModal` — name, members (contacts/phone/email), avatar.
* `SplitEditor` — itemized list, checkboxes per person, per-item assignment, tax/tip distribution.
* `ConfirmSplitCard` — final shares + “Send reminders” toggles.

**Components**

* `MemberChip` — name + avatar + owed amount.
* `ItemRow` — item name, price, select participants, quantity.
* `SplitPreset` — Equal / Itemized / Share % / Custom.

**Interactions**

* From chat: “Split ₹1200 Domino’s bill with Rahul and Aditi” → show SplitEditor prefilled (equal) → user can switch to itemized.
* Allow “request payment” (mock) or “send reminder” that triggers a notification (mocked).

**Data**

* group `{id, name, members:[{id,name,contact}], currency}`
* split `{items:[{name,price,assignedTo:[]}], total, perMember}`

**UX microcopy**

* “Each person owes ₹400 — send a reminder?” with CTA “Send via WhatsApp / Copy link”.

---

# Part 4 — Reports & Analytics (Dashboard)

**Purpose:** Visualize spending habits and let users drill down to trends.

**Layout**

* Top filter bar: timeframe (week/month/custom), group/user toggle, export.
* Grid of cards: Total spend, Top categories (pie), Weekly trend (bar/line), Recurring expenses (list), Spend per person (if group).
* Transaction list (searchable) below with filters.

**Components**

* `ChartCard` — title + small chart + number.
* `TransactionRow` — amount, category icon, date, note.
* `FilterPills` — category, tags.

**Interactions**

* Tap a slice in pie → filter transaction list to that category.
* Export CSV button → downloads visible dataset.
* Tap recurring expense → show edit recurrence.

**Charts**

* Use Recharts / Chart.js; give each chart its own component.
* Provide small sparkline in header card.

---

# Part 5 — Profile, Settings & Integrations

**Purpose:** Manage accounts, PWA & share integration, language, notifications, backups.

**Sections**

* Profile & security: login, connected accounts (Google, Apple).
* Integrations: SplitKaro (placeholder), UPI/Bank mock, SMS access (explain limitations).
* Share Settings: enable Web Share Target (PWA install instructions), set default split method.
* Localization: choose language English / Hinglish (toggle), date format.
* Data: export/import JSON, delete account.

**Share-to-Chat flow (UI)**

* `ShareOnboardingModal` — instructs how to share from PhonePe → “Select SplitMate in share menu”.
* `SharedMessageHandler` — UI that displays the incoming shared text/image in composer with parsed preview and Confirm button.

**PWA & Install**

* Prompt “Add to home screen” with install banner and short how-to for Chrome Android.

**Accessibility & Privacy**

* Explicit permission screens for SMS reading (if ever used) and for storage.
* Privacy note: “We don’t store SMS/UPI tokens” (if you mock; be transparent in pitch).

---

# Design System (tokens + guidelines)

**Colors**

* Primary: `#0EA5A4` (teal/green)
* Accent: `#7C3AED` (purple)
* Neutral bg: `#F8FAFC`
* Danger: `#EF4444`

**Typography**

* Headline: Inter / Poppins 600
* Body: Inter 400
* Sizes: h1 24px, body 16px, small 13px

**Spacing & Shapes**

* Border radius: `2xl` (16px) for cards, `xl` for buttons.
* Use soft shadows: `shadow-lg`.

**Icons & Emojis**

* Category icons + emojis (Food 🍕 Travel 🚕 Bills 💡).
* Use Lucide / Heroicons.

**Microinteractions**

* Message send → slide up + pulse.
* Card confirm → brief confetti (small).
* Charts: animate load with area/height grow.

---

# Accessibility, Localization & Performance

* Keyboard friendly: Tab order composer → send → quick actions.
* ARIA roles for live region, modal dialogs.
* Language detection: allow toggling to Hinglish by mapping common Hinglish patterns to categories.
* Performance: lazy-load charts and images, use skeletons.

---

# 5 AI Prompts — Build the Frontend Step-by-Step

Each prompt is ready to paste into a code-generation LLM (specify model and tokens you prefer). They assume Next.js 15 + TailwindCSS. Replace `your-team` and `your-api-keys` as needed.

---

## Prompt 1 — Scaffold + design system + layout + PWA

```
You are a frontend generator. Create a Next.js 15 app scaffold (App Router) configured with TailwindCSS and TypeScript. Add a design system file with color tokens, fonts, spacing, and global styles.

Deliverables:
1. package.json with dependencies: next@latest, react, react-dom, tailwindcss, postcss, autoprefixer, next-pwa (or workbox), clsx, lucide-react.
2. Create `app/layout.tsx` with top-level layout and mobile-centred container `max-w-sm mx-auto`.
3. Add `components/DesignSystem.tsx` exporting tokens and utility classes.
4. Add `public/manifest.json`, `_next/static/` service worker config for Web Share Target support (skeleton) and `app/manifest` link in layout. Provide `next.config.js` PWA snippet.
5. Commit instructions and `npm run dev` steps.

Acceptance criteria:
- App boots with `npm run dev` and shows a centered placeholder "SplitMate — Loading UI".
- Tailwind styles applied.
- Provide short README steps for installing.
```

---

## Prompt 2 — Chat UI + Composer + NLP Preview (stubbed)

```
You are a frontend engineer. In the scaffolded app, implement the core Chat UI.

Deliverables:
1. `components/ChatWindow.tsx`: scrollable message list with sample messages (3 messages: bot welcome, sample user command, sample expense card).
2. `components/MessageBubble.tsx`: user and bot styles; accessible `aria-live` for bot messages.
3. `components/Composer.tsx`: input box, mic button (integrate Web Speech API stub), attach button (opens file picker), quick action chips.
4. `components/NLPPreview.tsx`: when user types or attaches, call `/api/parse` (create a stub API route that returns `{amount, date, category, parsedText}` for demo).
5. Wire composer to ChatWindow: on send, show typing indicator, then show parsed expense card with Edit/Confirm buttons.

Mock data:
- Input: "I spent ₹250 on pizza yesterday"
- API response: `{amount:250, date:"2025-09-03", category:"Food", parsedText:"₹250 pizza"}`

Acceptance:
- Typing shows live parsed chips.
- On confirm, an `ExpenseCard` appears in the chat.
- Provide copyable code files and how to run in dev.
```

---

## Prompt 3 — Split Editor + Group Management UI

```
You are a UI developer. Build group and split flow UI components without backend logic (front-end only).

Deliverables:
1. `components/CreateGroupModal.tsx` to enter group name and add members (use local mock contacts).
2. `components/SplitEditor.tsx` supporting:
   - Equal split preset
   - Itemized input rows (name, price, participants as checkboxes)
   - Auto-calc per-member amount and display MemberChips with owed amount
3. Integration: from `ExpenseCard`, clicking "Split" opens `SplitEditor` prefilled with amount and suggested members.
4. Add validation: total of items must match total amount; show friendly error copy.
5. Provide test mock: Split ₹1200 among Rahul & Aditi → expected per-member ₹400.

Acceptance:
- UI handles equal & itemized modes.
- Shows per-member breakdown in real-time.
- Export split object to console (`console.log`) when user clicks "Confirm Split".
```

---

## Prompt 4 — Reports & Charts UI

```
You are a frontend engineer specialized in charts. Create a Reports page.

Deliverables:
1. `app/reports/page.tsx` showing:
   - Top Cards: Total spend (this month), Top category (pie), Weekly trend (bar).
   - Transaction list component with filters.
2. Use Recharts or Chart.js (include dependency) and populate charts with mock dataset of 30 transactions (varied categories).
3. Interactive behavior: clicking a pie slice filters transaction list; timeframe selector (7d/30d/This Month).
4. Export CSV button that converts visible transactions into downloadable CSV.

Acceptance:
- Charts render and animate.
- Pie slice click filters rows.
- Export CSV downloads a correct file when clicked.
```

---

## Prompt 5 — Share-to-Chat UI + PWA install + i18n stubs

```
You are a progressive web app engineer. Implement Web Share Target support skeleton and UI for handling shared text/images.

Deliverables:
1. Add `public/manifest.json` and `public/share-target.html` (or service worker route) and explain how Web Share Target is registered (code comments).
2. Create `pages/share/handler.tsx` (or `app/share/route`) that reads incoming share payload (text/image url) and redirects to chat with prefilled composer content and parsed preview by calling `/api/parse`.
3. Add `components/ShareOnboardingModal.tsx` explaining how to enable sharing from PhonePe/GPay and provide a QR to PWA install.
4. Add i18n stub: `lib/i18n.ts` with `en` + `hi` (Hinglish mapping), and a toggle in settings that re-renders UI language.
5. Add brief `README.SHARE.md` with instructions to test share on Chrome Android (how to register as share target).

Acceptance:
- When calling `/share?text=Paid%20₹500%20to%20Rahul`, app opens chat with parsed preview.
- PWA manifest present and “Install” button works in supporting browsers.
- Provide a short guide on how to test on Android Chrome.
```

---

# Final checklist & tips for your team

* Start with **Prompt 1** to get the skeleton; then run Prompt 2, 3, 4, 5 in order.
* Keep the backend parsing logic behind `/api/parse` simple for hackathon (regex + heuristics), then swap later to OpenAI/LLM for advanced parsing.
* For the share-to-chat demo on judges’ devices: provide a QR that opens the PWA with a query param (simulate a share) — this avoids needing to configure share targets live.
* Record a 30–60s demo video that shows: share→composer→confirm→split→analytics →makes judges remember the flow.

---

If you want, I can:

* Generate the **exact folder/file tree** to paste into the AI (with filenames and minimal file contents),
* Or create the **first PR** files (layout + chat placeholder) in code (I can output code snippets next).

Which do you prefer next — the **folder skeleton** or the **layout + Composer code** generated now?
