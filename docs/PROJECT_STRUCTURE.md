# SplitMate Project Structure

This document explains the directory structure and organization of the SplitMate project.

## Root Directory

```
splitmate/
├── app/                 # Next.js app directory
├── components/          # Shared React components
├── docs/                # Documentation files
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
├── public/              # Static assets
├── src/                 # Source code (when not using app directory)
├── .env.example         # Environment variable template
├── .gitignore           # Git ignore file
├── LICENSE              # MIT License
├── README.md            # Project README
├── next.config.ts       # Next.js configuration
├── package.json         # NPM package file
├── postcss.config.mjs   # PostCSS configuration
├── stack.tsx            # StackAuth configuration
├── tailwind.config.ts   # TailwindCSS configuration
└── tsconfig.json        # TypeScript configuration
```

## App Directory Structure

```
app/
├── api/                 # API routes
│   ├── chat/            # AI chat API
│   ├── expenses/        # Expense management API
│   ├── groups/          # Group management API
│   ├── reminders/      # Reminder sending API
│   ├── splitmate/       # SplitMate specific APIs
│   │   ├── qr/          # QR code generation
│   │   ├── remind/      # Reminder sending
│   │   ├── split/       # Bill splitting
│   │   ├── expenses/    # Expense management
│   │   └── groups/      # Group management
│   ├── upi/             # UPI link generation
│   └── user/            # User management
│       └── sync/        # User data synchronization
├── assistant/           # Assistant UI components
├── chat/                # Chat page
├── dashboard/           # Dashboard page
├── generate-qr/         # QR code generator page
├── groups/              # Groups page
├── handler/             # StackAuth handler
│   └── [...stack]/      # Dynamic StackAuth routes
├── profile/             # User profile page
├── split-bill/          # Bill splitter page
├── favicon.ico          # Favicon
├── globals.css         # Global CSS
├── layout.tsx           # Root layout
└── page.tsx             # Home page
```

## Components Directory

```
components/
├── app-sidebar.tsx      # Main application sidebar
├── assistant-ui/         # Assistant UI components
│   ├── markdown-text.tsx # Markdown text renderer
│   ├── thread-list.tsx   # Thread list component
│   ├── thread.tsx        # Thread component
│   ├── tool-fallback.tsx # Fallback tool UI
│   └── tooltip-icon-button.tsx # Tooltip icon button
├── splitmate/          # SplitMate specific components
│   ├── bill-splitter.tsx # Bill splitter UI
│   ├── dashboard.tsx    # Dashboard component
│   ├── expenses-list.tsx # Expenses list component
│   ├── groups-list.tsx   # Groups list component
│   ├── qr-generator.tsx  # QR code generator
│   └── remind-user.tsx   # User reminder component
└── ui/                  # shadcn/ui components
    ├── accordion.tsx     # Accordion component
    ├── alert-dialog.tsx  # Alert dialog component
    ├── alert.tsx         # Alert component
    ├── avatar.tsx        # Avatar component
    ├── badge.tsx         # Badge component
    ├── button.tsx        # Button component
    ├── card.tsx          # Card component
    ├── dialog.tsx        # Dialog component
    ├── dropdown-menu.tsx # Dropdown menu component
    ├── input.tsx         # Input component
    ├── label.tsx         # Label component
    ├── separator.tsx     # Separator component
    ├── sidebar.tsx       # Sidebar component
    ├── skeleton.tsx       # Skeleton loader component
    └── ...               # Other UI components
```

## Hooks Directory

```
hooks/
├── use-splitmate.ts     # SplitMate API hook
└── ...                  # Other custom hooks
```

## Lib Directory

```
lib/
├── db/                  # Database utilities
│   └── index.ts         # Database client
├── upi.ts               # UPI link and QR code utilities
├── utils.ts             # General utilities
└── ...                  # Other utility libraries
```

## Docs Directory

```
docs/
├── CONDUCT.md           # Code of conduct
├── CONTRIBUTING.md      # Contribution guidelines
├── DEPLOYMENT.md        # Deployment instructions
├── PROJECT_STRUCTURE.md  # Project structure documentation
├── README.md            # Documentation index
├── REMINDER_INTEGRATION.md # Reminder system documentation
├── SPLITMATE_FEATURES.md # Feature overview
├── STACKAUTH_INTEGRATION.md # StackAuth integration
├── SUMMARY.md           # Project summary
├── UPI_INTEGRATION.md   # UPI integration documentation
└── VERCEL_AI_SDK_INTEGRATION.md # Vercel AI SDK integration
```

## Public Directory

```
public/
├── favicon.ico          # Favicon
├── icon-192x192.png     # App icon
├── icon-512x512.png     # App icon
├── manifest.json        # PWA manifest
└── ...                  # Other static assets
```

## Src Directory

```
src/
├── lib/                 # Library code
├── types/               # TypeScript types
└── ...                  # Other source code
```

## API Routes Structure

### Main API Routes

```
app/api/
├── chat/route.ts        # AI chat endpoint
├── expenses/route.ts    # Expense management
├── groups/route.ts      # Group management
├── reminders/route.ts   # Reminder sending
├── upi/route.ts         # UPI link generation
└── user/sync/route.ts   # User data sync
```

### SplitMate API Routes

```
app/api/splitmate/
├── expenses/route.ts    # Expense management
├── groups/route.ts      # Group management
├── qr/route.ts          # QR code generation
├── remind/route.ts      # Reminder sending
├── split/route.ts       # Bill splitting
└── route.ts             # Main SplitMate API endpoint
```

## Component Organization

### Assistant UI Components

These components are part of the Assistant UI library integration:

- `thread.tsx` - Main chat thread component
- `thread-list.tsx` - List of chat threads
- `markdown-text.tsx` - Markdown text renderer
- `tool-fallback.tsx` - Fallback for unknown tools
- `tooltip-icon-button.tsx` - Button with tooltip

### SplitMate Components

These are custom components built for SplitMate's specific features:

- `bill-splitter.tsx` - UI for splitting bills
- `dashboard.tsx` - Main dashboard view
- `expenses-list.tsx` - List of user expenses
- `groups-list.tsx` - List of user groups
- `qr-generator.tsx` - QR code generator
- `remind-user.tsx` - User reminder interface

### UI Components

These are shadcn/ui components customized for SplitMate:

- `sidebar.tsx` - Application sidebar
- `card.tsx` - Card container
- `button.tsx` - Interactive button
- `input.tsx` - Text input
- `dialog.tsx` - Modal dialog
- And many more...

## File Naming Conventions

### Component Files

- Use PascalCase for React component files
- Use kebab-case for utility files
- End component files with `.tsx`
- End utility files with `.ts`

### Route Files

- API routes use `route.ts`
- Page routes use `page.tsx`
- Layout files use `layout.tsx`

## Module Organization

### Absolute Imports

SplitMate uses absolute imports with the following aliases:

- `@/` - Root directory
- `@/app` - App directory
- `@/components` - Components directory
- `@/hooks` - Hooks directory
- `@/lib` - Lib directory
- `@/src` - Src directory

### Relative Imports

For imports within the same directory or closely related directories, use relative imports.

## Configuration Files

### Next.js Configuration

- `next.config.ts` - Main Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - TailwindCSS configuration
- `postcss.config.mjs` - PostCSS configuration

### Environment Files

- `.env.local` - Local environment variables
- `.env.example` - Template for environment variables

## Testing Structure

Currently, SplitMate does not have a dedicated testing directory, but tests should be colocated with the components they test:

```
components/
├── example-component.tsx
├── example-component.test.tsx
└── __snapshots__/
    └── example-component.test.tsx.snap
```

## Asset Organization

### Images

Images should be placed in the `public/` directory:

```
public/
├── images/
│   ├── icons/
│   ├── logos/
│   └── illustrations/
└── ...
```

### Styles

Global styles are in `app/globals.css`, with component-specific styles using TailwindCSS classes.

## Documentation Organization

Documentation files are organized by topic:

1. **Getting Started** - Basic setup and usage
2. **Features** - Detailed feature documentation
3. **Integrations** - Third-party service integrations
4. **Development** - Development guidelines and processes
5. **Deployment** - Deployment instructions

## Conclusion

This structure allows for:

1. Clear separation of concerns
2. Easy navigation and maintenance
3. Scalable growth
4. Consistent organization
5. Clear module boundaries

Understanding this structure will help contributors quickly find and modify the right files when working on SplitMate.