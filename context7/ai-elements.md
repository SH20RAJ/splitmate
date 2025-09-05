========================
CODE SNIPPETS
========================
TITLE: Install AI Elements CLI
DESCRIPTION: Installs AI Elements components using the CLI. It can install all components or specific ones by name. It also handles shadcn/ui setup and dependency installation.

SOURCE: https://github.com/vercel/ai-elements/blob/main/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx ai-elements@latest
npx ai-elements@latest add <component-name>
```

----------------------------------------

TITLE: Install AI Elements CLI
DESCRIPTION: Installs all AI Elements components using npx. This command sets up shadcn/ui if needed, installs all components to your configured directory, and adds necessary dependencies.

SOURCE: https://github.com/vercel/ai-elements/blob/main/packages/registry/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx ai-elements@latest
```

----------------------------------------

TITLE: Install All Components via shadcn CLI
DESCRIPTION: Installs all AI Elements components using the shadcn CLI by providing a registry URL. This is an alternative method for installing the entire component library.

SOURCE: https://github.com/vercel/ai-elements/blob/main/packages/registry/README.md#_snippet_2

LANGUAGE: bash
CODE:
```
npx shadcn@latest add https://registry.ai-sdk.dev/all.json
```

----------------------------------------

TITLE: Quick Start Example with AI Elements
DESCRIPTION: A basic React component demonstrating the usage of AI Elements components like Conversation, Message, and Response within a chat interface. It utilizes the `useChat` hook from `@ai-sdk/react`.

SOURCE: https://github.com/vercel/ai-elements/blob/main/README.md#_snippet_2

LANGUAGE: tsx
CODE:
```
'use client';

import { useChat } from '@ai-sdk/react';
import {
  Conversation,
  ConversationContent,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
} from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';

export default function Chat() {
  const { messages } = useChat();

  return (
    <Conversation>
      <ConversationContent>
        {messages.map((message, index) => (
          <Message key={index} from={message.role}>
            <MessageContent>
              <Response>{message.content}</Response>
            </MessageContent>
          </Message>
        ))}
      </ConversationContent>
    </Conversation>
  );
}
```

----------------------------------------

TITLE: Install Specific Component via shadcn CLI
DESCRIPTION: Installs a specific AI Element component using the shadcn CLI by providing the component's registry URL. This allows for granular installation of individual components.

SOURCE: https://github.com/vercel/ai-elements/blob/main/packages/registry/README.md#_snippet_3

LANGUAGE: bash
CODE:
```
npx shadcn@latest add https://registry.ai-sdk.dev/message.json
```

----------------------------------------

TITLE: Install AI Elements with shadcn CLI
DESCRIPTION: Installs AI Elements components using the shadcn/ui CLI. This method allows installing all components from a registry URL or specific components from their respective URLs.

SOURCE: https://github.com/vercel/ai-elements/blob/main/README.md#_snippet_1

LANGUAGE: bash
CODE:
```
npx shadcn@latest add https://registry.ai-sdk.dev/all.json
npx shadcn@latest add https://registry.ai-sdk.dev/message.json
```

----------------------------------------

TITLE: Run Development Server
DESCRIPTION: Commands to start the Next.js development server using different package managers. This allows for local development and testing.

SOURCE: https://github.com/vercel/ai-elements/blob/main/apps/test/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

----------------------------------------

TITLE: Install Specific AI Element Component
DESCRIPTION: Installs a specific AI Element component by name. Replace `<component-name>` with the desired component, e.g., 'message' or 'conversation'.

SOURCE: https://github.com/vercel/ai-elements/blob/main/packages/registry/README.md#_snippet_1

LANGUAGE: bash
CODE:
```
npx ai-elements@latest add <component-name>
```

----------------------------------------

TITLE: Basic Next.js Page Structure
DESCRIPTION: An example of a basic page component in Next.js using TypeScript. This file (`app/page.tsx`) is the entry point for the application's home page.

SOURCE: https://github.com/vercel/ai-elements/blob/main/apps/test/README.md#_snippet_1

LANGUAGE: typescript
CODE:
```
// app/page.tsx

export default function Page() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
    </div>
  );
}
```

----------------------------------------

TITLE: Basic Chat Interface with AI Elements
DESCRIPTION: A basic React component demonstrating the usage of AI Elements components like `Conversation`, `Message`, and `Response` within a Next.js application. It utilizes the `useChat` hook from `@ai-sdk/react` to manage chat messages.

SOURCE: https://github.com/vercel/ai-elements/blob/main/packages/registry/README.md#_snippet_4

LANGUAGE: tsx
CODE:
```
'use client';

import { useChat } from '@ai-sdk/react';
import {
  Conversation,
  ConversationContent,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
} from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';

export default function Chat() {
  const { messages } = useChat();

  return (
    <Conversation>
      <ConversationContent>
        {messages.map((message, index) => (
          <Message key={index} from={message.role}>
            <MessageContent>
              <Response>{message.content}</Response>
            </MessageContent>
          </Message>
        ))}
      </ConversationContent>
    </Conversation>
  );
}
```