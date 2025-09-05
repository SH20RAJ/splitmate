# SplitMate Documentation

Welcome to the SplitMate documentation. This folder contains detailed information about the various integrations and features of SplitMate.

## Table of Contents

1. [SplitMate Features](SPLITMATE_FEATURES.md) - Overview of all SplitMate features
2. [Vercel AI SDK Integration](VERCEL_AI_SDK_INTEGRATION.md) - How SplitMate integrates Vercel AI SDK with Assistant UI
3. [StackAuth Integration](STACKAUTH_INTEGRATION.md) - Authentication system implementation
4. [UPI Integration](UPI_INTEGRATION.md) - UPI payment processing
5. [Reminder Integration](REMINDER_INTEGRATION.md) - WhatsApp and Web Share API integration
6. [Summary](SUMMARY.md) - Comprehensive overview of the entire system
7. [Deployment](DEPLOYMENT.md) - How to deploy SplitMate to Vercel
8. [Contributing](CONTRIBUTING.md) - Guidelines for contributing to SplitMate
9. [Project Structure](PROJECT_STRUCTURE.md) - Directory organization and file structure
10. [Coding Standards](CODING_STANDARDS.md) - Code quality and style guidelines
11. [Development Setup](DEVELOPMENT_SETUP.md) - Setting up your development environment
12. [Testing](TESTING.md) - How to run and write tests for SplitMate

## Overview

SplitMate is an AI-powered expense management chatbot that makes splitting bills, tracking expenses, and settling debts effortless through natural language interactions.

### Key Features

- **Natural Language Processing**: Add expenses and manage groups by chatting in plain English
- **Smart Bill Splitting**: Automatically calculate who owes whom for equal or custom splits
- **UPI Integration**: Generate UPI deep links and QR codes for one-tap payments
- **Reminders**: Send payment reminders via WhatsApp and Web Share API
- **Secure Authentication**: Powered by StackAuth for secure user management

## Architecture

SplitMate follows a modern web application architecture with:

1. **Frontend**: Next.js 15 + TailwindCSS + shadcn/ui
2. **AI Layer**: OpenAI API + Assistant UI
3. **Authentication**: StackAuth
4. **Database**: Supabase
5. **Payments**: UPI Deep Links + QR Generation

## Integration Points

### Authentication System
- [StackAuth Integration](STACKAUTH_INTEGRATION.md) provides secure user authentication
- Protected routes ensure only authenticated users can access expense features

### AI and Chat
- [Vercel AI SDK Integration](VERCEL_AI_SDK_INTEGRATION.md) enables natural language processing
- Assistant UI provides the chat interface components

### Payment Processing
- [UPI Integration](UPI_INTEGRATION.md) handles UPI deep links and QR code generation
- [Reminder Integration](REMINDER_INTEGRATION.md) sends payment reminders via WhatsApp and Web Share API

### Feature Implementation
- [SplitMate Features](SPLITMATE_FEATURES.md) documents all core features
- [Summary](SUMMARY.md) provides a complete picture of the system

## Getting Started

To understand how SplitMate works, we recommend reading the documentation in this order:

1. [SplitMate Features](SPLITMATE_FEATURES.md) - Understand what SplitMate does
2. [StackAuth Integration](STACKAUTH_INTEGRATION.md) - Learn how authentication works
3. [Vercel AI SDK Integration](VERCEL_AI_SDK_INTEGRATION.md) - Understand the AI chat system
4. [UPI Integration](UPI_INTEGRATION.md) - Learn about payment processing
5. [Reminder Integration](REMINDER_INTEGRATION.md) - See how reminders work
6. [Summary](SUMMARY.md) - Get a complete picture of the system

## Development

For developers interested in contributing:

1. [Development Setup](DEVELOPMENT_SETUP.md) - Set up your development environment
2. [Project Structure](PROJECT_STRUCTURE.md) - Understand the codebase organization
3. [Coding Standards](CODING_STANDARDS.md) - Follow our code quality guidelines
4. [Testing](TESTING.md) - Learn how to test SplitMate
5. [Contributing](CONTRIBUTING.md) - Learn how to contribute to the project
6. [Deployment](DEPLOYMENT.md) - Deploy SplitMate to production

## Contributing

We welcome contributions to SplitMate! Please read our [contributing guidelines](CONTRIBUTING.md) before submitting pull requests.

## License

MIT License - see [LICENSE](../LICENSE) for details.