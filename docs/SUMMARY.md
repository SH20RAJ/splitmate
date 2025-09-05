# SplitMate - AI Expense Chatbot Summary

## Project Overview

SplitMate is an innovative AI-powered expense management chatbot that transforms how people split bills, track expenses, and settle debts with friends and family. By combining natural language processing with intuitive UI components, SplitMate makes expense sharing as simple as having a conversation.

## Core Features

### 1. Natural Language Processing
- Add expenses, query analytics, and manage groups through conversational chat
- Powered by OpenAI GPT-4 and Assistant UI for seamless interactions

### 2. Smart Bill Splitting
- Automatically calculate who owes whom for equal or custom splits
- Real-time balance updates with visual indicators

### 3. UPI Integration & Reminders
- Generate UPI deep links and QR codes for one-tap payments
- Send reminders via WhatsApp with payment links
- Native sharing through Web Share API

### 4. Secure Authentication
- Powered by StackAuth for secure user authentication
- Social login support (Google, GitHub)

### 5. AI-Powered Assistant
- Chat with an AI assistant to manage expenses
- Get financial insights and recommendations

## Technical Architecture

### Frontend
- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS + shadcn/ui components
- **Chat UI**: Assistant UI for conversational interface
- **Authentication**: StackAuth integration

### Backend
- **AI Services**: OpenAI API for natural language processing
- **Database**: Supabase for data storage
- **Authentication**: StackAuth for user management
- **Payments**: UPI Deep Links + QR Generation

### API Integration
- **Vercel AI SDK**: For AI model interactions
- **Assistant UI**: For chat interface components
- **StackAuth**: For authentication services

## Key Components

### Authentication System
- Sign in/up with StackAuth components
- Protected routes for all expense-related features
- User profile management

### Dashboard
- Overview of recent expenses and groups
- Financial summaries and insights
- Quick access to key features

### Bill Splitting
- Split bills equally or with custom amounts
- Visual representation of who owes what
- Real-time balance updates

### UPI Payments
- Generate QR codes for UPI payments
- Deep links for direct app integration
- Payment reminder system

### AI Chat Assistant
- Natural language interface for expense management
- Smart suggestions and financial insights
- Tool calling for specific actions

## API Endpoints

### Main Endpoints
- `POST /api/chat` - AI chat interface
- `POST /api/splitmate/split` - Bill splitting
- `POST /api/splitmate/qr` - QR code generation
- `POST /api/splitmate/remind` - Send reminders
- `GET /api/splitmate/expenses` - Get user expenses
- `GET /api/splitmate/groups` - Get user groups

### Authentication Endpoints
- `POST /api/user/sync` - User data synchronization

## Integration Highlights

### StackAuth Integration
- Comprehensive user authentication system
- Social login support
- Protected route middleware
- Session management

### Vercel AI SDK Integration
- Natural language processing capabilities
- AI model interactions
- Streaming responses
- Tool calling functionality

### UPI Integration
- UPI deep link generation
- QR code generation
- Payment processing
- Security considerations

### Reminder Systems
- WhatsApp integration
- Web Share API
- Cross-platform support
- Fallback mechanisms

## Security Features

### Authentication Security
- Secure token storage with Next.js cookies
- CSRF protection
- Rate limiting for authentication attempts

### Data Security
- User data isolation
- Encrypted communication
- No sensitive payment data storage

### Payment Security
- UPI link encoding
- Client-side QR generation
- HTTPS requirements

## User Experience

### Intuitive Interface
- Clean, modern design with TailwindCSS
- Responsive layout for all devices
- Easy navigation with sidebar menu

### Seamless Workflow
- Natural language expense entry
- One-click payment processing
- Instant balance updates

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode

## Future Roadmap

### Short-term Goals
1. Multi-currency support
2. Recurring expense tracking
3. Budget management features
4. Expense report generation

### Long-term Vision
1. Native mobile applications
2. Receipt scanning with OCR
3. Voice command support
4. Predictive expense splitting
5. Advanced financial analytics

## Technology Stack Benefits

### Scalability
- Next.js for server-side rendering and static generation
- Supabase for scalable database solutions
- Vercel for deployment and scaling

### Maintainability
- Component-based architecture
- TypeScript for type safety
- Modular code organization

### Performance
- Optimized asset loading
- Caching strategies
- Efficient data fetching

## Conclusion

SplitMate represents a significant advancement in expense management technology by combining the power of AI with intuitive UI components. Its natural language interface makes expense sharing as simple as chatting with a friend, while its robust backend ensures accurate calculations and secure data handling.

The integration of cutting-edge technologies like Vercel AI SDK, Assistant UI, and StackAuth creates a seamless user experience that transforms how people manage shared expenses. With its comprehensive feature set and focus on security, SplitMate is positioned to become the go-to solution for anyone looking to simplify their expense sharing workflow.