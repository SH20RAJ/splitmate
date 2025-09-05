# SplitMate Features Documentation

## Overview

SplitMate is an AI-powered expense management chatbot that simplifies the process of splitting bills, tracking expenses, and settling debts with friends and family through natural language interactions.

## Core Features

### 1. Natural Language Processing

SplitMate allows users to add expenses, query analytics, and manage groups by chatting in plain English. The AI assistant understands context and can handle complex requests.

#### Examples:
```
User: "I spent ₹500 on dinner with Rahul and Shreya"
Assistant: "Got it! Added ₹500 under Food on Sep 4th. Would you like me to split this equally?"

User: "Show me my expenses from last week"
Assistant: "Here are your expenses from last week: [list of expenses]"
```

### 2. Smart Bill Splitting

Automatically calculate who owes whom for equal or custom splits with real-time balance updates.

#### How it works:
1. User adds an expense with participants
2. System calculates equal shares or custom splits
3. Balances are updated in real-time
4. Visual indicators show who owes what

#### API Endpoint:
```
POST /api/splitmate/split
{
  "amount": 1200,
  "description": "Pizza night",
  "participants": ["You", "Rahul", "Shreya"]
}
```

### 3. UPI Integration & Reminders

Generate UPI deep links and QR codes for one-tap payments and send reminders via multiple channels.

#### UPI Deep Links:
Format: `upi://pay?pa={upi_id}&pn={name}&am={amount}&cu=INR`

#### QR Code Generation:
```javascript
// Generate QR code for UPI payment
const upiLink = generateUpiLink("user@upi", "SplitMate User", 500);
const qrCode = await generateUpiQrCode(upiLink);
```

#### Reminder Systems:
1. **WhatsApp**: Deep link with pre-filled message
2. **Web Share API**: Native sharing on mobile devices

### 4. Group Management

Create and manage groups for different circles - roommates, family, colleagues, or friends.

#### Group Features:
- Add/remove members
- View group expenses
- Settle group balances
- Export expense reports

### 5. AI Expense Assistant

Chat with an AI assistant to add expenses, check balances, and get financial insights.

#### Capabilities:
- Natural language expense entry
- Balance inquiries
- Spending pattern analysis
- Financial recommendations

## Technical Implementation

### Authentication

SplitMate uses StackAuth for secure user authentication with support for social logins.

#### Protected Routes:
- `/dashboard` - User dashboard
- `/groups` - Group management
- `/split-bill` - Bill splitting interface
- `/generate-qr` - UPI QR code generation

### API Architecture

#### Main Endpoints:
- `POST /api/splitmate/split` - Split bills
- `POST /api/splitmate/qr` - Generate QR codes
- `POST /api/splitmate/remind` - Send reminders
- `GET /api/splitmate/expenses` - Get user expenses
- `GET /api/splitmate/groups` - Get user groups

### Frontend Components

#### Key Components:
1. **BillSplitter** - UI for splitting bills
2. **QrGenerator** - Generate UPI QR codes
3. **ExpensesList** - Display user expenses
4. **GroupsList** - Display user groups
5. **SplitMateDashboard** - Main dashboard view

#### Custom Hooks:
- `useSplitMate()` - Client-side hook for API interactions

### Security

- All API routes are protected with authentication middleware
- User data is isolated and secure
- UPI links are generated with proper encoding
- QR codes are generated client-side for privacy

## Future Enhancements

### Planned Features:
1. **Multi-currency Support** - Handle expenses in different currencies
2. **Recurring Expenses** - Set up recurring bills (rent, subscriptions)
3. **Budget Tracking** - Set monthly budgets and get alerts
4. **Export Reports** - Generate PDF reports of expenses
5. **Mobile App** - Native mobile application

### Advanced AI Features:
1. **Receipt Scanning** - OCR to extract expense details from photos
2. **Voice Commands** - Add expenses via voice
3. **Predictive Splitting** - Suggest splits based on historical data
4. **Financial Insights** - AI-powered spending analysis and recommendations

## Conclusion

SplitMate revolutionizes expense sharing by combining the power of AI with intuitive UI components. Its natural language interface makes expense management as simple as chatting with a friend, while its robust backend ensures accurate calculations and secure data handling.