========================
CODE SNIPPETS
========================
TITLE: Start the Application
DESCRIPTION: Command to run the Assistant UI application after setup.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_2

LANGUAGE: sh
CODE:
```
npm run dev

```

----------------------------------------

TITLE: Install assistant-ui CLI
DESCRIPTION: Use the npx command to add assistant-ui to your project. This command handles the initial setup for threads and thread lists.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_3

LANGUAGE: sh
CODE:
```
npx assistant-ui add thread thread-list
```

----------------------------------------

TITLE: Install assistant-ui Packages
DESCRIPTION: Install the necessary @assistant-ui packages and their dependencies. This includes core UI components, styling, and utility libraries like radix-ui and lucide-react.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_4

LANGUAGE: sh
CODE:
```
npm install \
  @assistant-ui/react \
  @assistant-ui/react-markdown \
  @assistant-ui/styles \
  @radix-ui/react-tooltip \
  @radix-ui/react-slot \
  lucide-react \
  remark-gfm \
  class-variance-authority \
  clsx
```

----------------------------------------

TITLE: Navigate to Project Directory
DESCRIPTION: Changes the current directory to the specified example within the Assistant UI project.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/search-agent-for-e-commerce/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
cd assistant-ui/examples/search-agent-for-e-commerce
```

----------------------------------------

TITLE: Make Start Script Executable
DESCRIPTION: Grants execute permissions to the start.sh script, allowing it to be run.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/search-agent-for-e-commerce/README.md#_snippet_3

LANGUAGE: sh
CODE:
```
chmod +x start.sh
```

----------------------------------------

TITLE: Start Assistant UI Servers
DESCRIPTION: Executes the start.sh script to launch the necessary servers for the Assistant UI application.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/search-agent-for-e-commerce/README.md#_snippet_4

LANGUAGE: sh
CODE:
```
./start.sh
```

----------------------------------------

TITLE: Install AI Provider SDKs
DESCRIPTION: Installs the necessary SDKs for integrating with various AI providers. This includes the core 'ai' package, the Assistant UI React SDK, and the specific provider's SDK.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_23

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/openai
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/anthropic
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/azure
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/amazon-bedrock
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/google
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/google-vertex
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/openai
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/openai
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/cohere
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk ollama-ai-provider
```

LANGUAGE: sh
CODE:
```
npm install ai @assistant-ui/react-ai-sdk chrome-ai
```

----------------------------------------

TITLE: Install and Run Example
DESCRIPTION: Provides the necessary bash commands to install project dependencies and run the development server for the assistant-ui parent ID grouping example.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/with-parent-id-grouping/README.md#_snippet_1

LANGUAGE: bash
CODE:
```
# Install dependencies
npm install

# Run the development server
npm run dev
```

----------------------------------------

TITLE: Setup Environment Variables
DESCRIPTION: Provides the necessary environment variables for development and production, including API URLs and assistant IDs.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/index.mdx#_snippet_7

LANGUAGE: sh
CODE:
```
# LANGCHAIN_API_KEY=your_api_key # for production
# LANGGRAPH_API_URL=your_api_url # for production
NEXT_PUBLIC_LANGGRAPH_API_URL=your_api_url # for development (no api key required)
NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID=your_graph_id

```

----------------------------------------

TITLE: Installation and Running Commands
DESCRIPTION: Provides the commands to install dependencies and run the LangGraph example application using npm.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/with-langgraph/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
npm install
npm run dev
```

----------------------------------------

TITLE: Run Example Project
DESCRIPTION: Starts a specific example project in development mode.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/CONTRIBUTING.md#_snippet_3

LANGUAGE: sh
CODE:
```
cd examples/<your-example>
pnpm dev
```

----------------------------------------

TITLE: Start Development Server
DESCRIPTION: Command to start the Next.js development server, allowing you to view the frontend application locally.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/tutorial/part-1.mdx#_snippet_2

LANGUAGE: sh
CODE:
```
npm run dev
```

----------------------------------------

TITLE: Install Assistant UI Dependencies
DESCRIPTION: Command to install the necessary Assistant UI packages and LangGraph SDK for a React project. This includes core UI components and LangGraph integration.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/index.mdx#_snippet_2

LANGUAGE: sh
CODE:
```
npm install @assistant-ui/react @assistant-ui/react-ui @assistant-ui/react-langgraph @langchain/langgraph-sdk
```

----------------------------------------

TITLE: Run Development Server
DESCRIPTION: Starts the development server for the project.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/with-ai-sdk-v5/README.md#_snippet_2

LANGUAGE: bash
CODE:
```
npm run dev
```

----------------------------------------

TITLE: Environment Setup
DESCRIPTION: Copies the example environment file and instructs on setting the Anthropic API key.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/with-ai-sdk-v5/README.md#_snippet_1

LANGUAGE: bash
CODE:
```
cp .env.example .env.local
ANTHROPIC_API_KEY=your-api-key-here
```

----------------------------------------

TITLE: App Integration - Thread List and Thread View
DESCRIPTION: Example of integrating the Assistant UI runtime into a React application to display a list of threads and the active thread content. It uses the `useChatRuntime` hook and `AssistantRuntimeProvider`.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_38

LANGUAGE: tsx
CODE:
```
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { Thread } from "@/components/assistant-ui/thread";

const MyApp = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid h-dvh grid-cols-[200px_1fr] gap-x-2 px-4 py-4">
        <ThreadList />
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};
```

----------------------------------------

TITLE: Create .env File with API Key
DESCRIPTION: Creates a .env file and sets the OPENAI_API_KEY environment variable. Replace 'skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' with your actual OpenAI API key.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/search-agent-for-e-commerce/README.md#_snippet_2

LANGUAGE: sh
CODE:
```
OPENAI_API_KEY="skXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

----------------------------------------

TITLE: Environment Variables for AI Providers
DESCRIPTION: Configuration for environment variables required by various AI providers. Each snippet shows the necessary API key or credential setup for services like OpenAI, Anthropic, Azure, AWS, Gemini, GCP, Groq, Fireworks, and Cohere.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_37

LANGUAGE: sh
CODE:
```
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
ANTHROPIC_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
AZURE_RESOURCE_NAME="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AZURE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
AWS_ACCESS_KEY_ID="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_SECRET_ACCESS_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_REGION="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
GOOGLE_GENERATIVE_AI_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
GOOGLE_VERTEX_PROJECT="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GOOGLE_VERTEX_LOCATION="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GOOGLE_APPLICATION_CREDENTIALS="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
GROQ_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
FIREWORKS_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
COHERE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

----------------------------------------

TITLE: Install Dependencies
DESCRIPTION: Installs the necessary project dependencies using npm.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/with-ai-sdk-v5/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm install
```

----------------------------------------

TITLE: Clone Assistant UI Repository
DESCRIPTION: Clones the Assistant UI project from GitHub to your local machine.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/search-agent-for-e-commerce/README.md#_snippet_0

LANGUAGE: sh
CODE:
```
git clone https://github.com/assistant-ui/assistant-ui.git
```

----------------------------------------

TITLE: App Integration - Assistant Modal
DESCRIPTION: Example of integrating the Assistant UI into a React application using an Assistant Modal component. It sets up the chat runtime and provides it to the `AssistantModal` component for a pop-up chat interface.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_39

LANGUAGE: tsx
CODE:
```
// run `npx shadcn@latest add "https://r.assistant-ui.com/assistant-modal"`

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantModal } from "@/components/assistant-ui/assistant-modal";

const MyApp = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <AssistantModal />
    </AssistantRuntimeProvider>
  );
};
```

----------------------------------------

TITLE: Assistant UI Styles Integration
DESCRIPTION: Instructions for integrating Assistant UI's pre-compiled CSS files into your project. This bypasses the need for a Tailwind CSS setup, allowing direct use of the provided styles for components and markdown elements.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_22

LANGUAGE: ts
CODE:
```
import "@assistant-ui/styles/index.css";
import "@assistant-ui/styles/markdown.css";
// import "@assistant-ui/styles/modal.css";  // for future reference, only if you use our modal component
```

----------------------------------------

TITLE: Welcome Suggestions
DESCRIPTION: Displays a list of suggested prompts for the user to interact with the assistant. Includes 'What is the weather in Tokyo?' and 'What is assistant-ui?'.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_8

LANGUAGE: jsx
CODE:
```
const Welcome: FC = () => {
  return (
    <div className="aui-thread-welcome-suggestions">
      <ThreadPrimitive.Suggestion
        className="aui-thread-welcome-suggestion"
        prompt="What is the weather in Tokyo?"
        method="replace"
        autoSend
      >
        <span className="aui-thread-welcome-suggestion-text">
          What is the weather in Tokyo?
        </span>
      </ThreadPrimitive.Suggestion>
      <ThreadPrimitive.Suggestion
        className="aui-thread-welcome-suggestion"
        prompt="What is assistant-ui?"
        method="replace"
        autoSend
      >
        <span className="aui-thread-welcome-suggestion-text">
          What is assistant-ui?
        </span>
      </ThreadPrimitive.Suggestion>
    </div>
  );
};
```

----------------------------------------

TITLE: Initialize Assistant UI Project
DESCRIPTION: Commands to create a new project with Assistant UI, either from scratch or using specific templates like LangGraph or MCP. Also includes instructions for adding Assistant UI to an existing React project.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_0

LANGUAGE: sh
CODE:
```
# Create a new project with the default template
npx assistant-ui@latest create

# Or start with a template:
# LangGraph
npx assistant-ui@latest create -t langgraph

# MCP support
npx assistant-ui@latest create -t mcp

# Add assistant-ui to an existing React project
npx assistant-ui@latest init

```

----------------------------------------

TITLE: Installation
DESCRIPTION: Instructions for installing the assistant-ui-sync-server-api library using pip or uv.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/python/assistant-ui-sync-server-api/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
pip install assistant-ui-sync-server-api
```

LANGUAGE: bash
CODE:
```
uv add assistant-ui-sync-server-api
```

----------------------------------------

TITLE: Chat API Endpoint - Cohere
DESCRIPTION: Example of a Next.js API route handler for streaming chat messages using the Cohere AI model. It processes incoming JSON requests, streams text from the specified model, and returns a data stream response.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_34

LANGUAGE: typescript
CODE:
```
export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: cohere("command-r-plus"),
    messages,
  });
  return result.toDataStreamResponse();
}
```

----------------------------------------

TITLE: Chat API Endpoint - Ollama
DESCRIPTION: Example of a Next.js API route handler for streaming chat messages using an Ollama model. It configures the chat to use the 'llama3' model via the ollama-ai-provider and returns a data stream response.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_35

LANGUAGE: typescript
CODE:
```
import { ollama } from "ollama-ai-provider";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: ollama("llama3"),
    messages,
  });
  return result.toDataStreamResponse();
}
```

----------------------------------------

TITLE: Add API Key Configuration
DESCRIPTION: Instructions for setting up the OpenAI API key in a `.env` file for the Assistant UI project. It also shows where to configure the chat history base URL.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_1

LANGUAGE: env
CODE:
```
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# chat history -- sign up for free on https://cloud.assistant-ui.com
# NEXT_PUBLIC_ASSISTANT_BASE_URL="https://..."

```

----------------------------------------

TITLE: Chat API Endpoint - Chrome AI
DESCRIPTION: Example of a Next.js API route handler for streaming chat messages using the Chrome AI provider. It initializes the chat with the chromeai() model and returns the response as a data stream.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_36

LANGUAGE: typescript
CODE:
```
import { chromeai } from "chrome-ai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: chromeai(),
    messages,
  });
  return result.toDataStreamResponse();
}
```

----------------------------------------

TITLE: API Endpoint for AI Chat (Groq)
DESCRIPTION: Implements a POST endpoint at /app/api/chat/route.ts for handling chat messages using Groq. It configures the OpenAI SDK to use the Groq API base URL and streams responses.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_31

LANGUAGE: ts
CODE:
```
import {
  createOpenAI
} from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY ?? "",
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: groq("llama3-70b-8192"),
    messages,
  });
  return result.toDataStreamResponse();
}
```

----------------------------------------

TITLE: Create New Project with LangGraph Template
DESCRIPTION: Command to create a new project using the LangGraph assistant-ui template. This sets up a new project with the necessary structure for integrating with LangGraph.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/index.mdx#_snippet_0

LANGUAGE: sh
CODE:
```
npx create-assistant-ui@latest -t langgraph my-app
```

----------------------------------------

TITLE: Vercel AI SDK RSC Setup with Primitives
DESCRIPTION: Shows how to update unstyled primitives to use RSCDisplay for Vercel AI SDK RSC support.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/migrations/v0-8.mdx#_snippet_2

LANGUAGE: ts
CODE:
```
import { RSCDisplay } from "@assistant-ui/react-ai-sdk";

// if you are using unstyled primitives, update MyThread.tsx
<MessagePrimitive.Parts components={{ Text: RSCDisplay }} />
```

----------------------------------------

TITLE: Assistant Message Component
DESCRIPTION: Represents a message from the assistant. It displays content formatted with Markdown and includes action buttons.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_14

LANGUAGE: jsx
CODE:
```
const AssistantMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="aui-assistant-message-root">
      <div className="aui-assistant-message-content">
        <MessagePrimitive.Parts components={{ Text: MarkdownText }} />
      </div>

      <AssistantActionBar />

      <BranchPicker className="aui-assistant-branch-picker" />
    </MessagePrimitive.Root>
  );
};
```

----------------------------------------

TITLE: Environment Variables for API Keys
DESCRIPTION: This section details the environment variables required for various AI providers. Each snippet shows the variable name and a placeholder for the API key or credentials.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_28

LANGUAGE: sh
CODE:
```
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
ANTHROPIC_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
AZURE_RESOURCE_NAME="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AZURE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
AWS_ACCESS_KEY_ID="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_SECRET_ACCESS_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
AWS_REGION="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
GOOGLE_GENERATIVE_AI_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
GOOGLE_VERTEX_PROJECT="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GOOGLE_VERTEX_LOCATION="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
GOOGLE_APPLICATION_CREDENTIALS="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
GROQ_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
FIREWORKS_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
COHERE_API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

LANGUAGE: sh
CODE:
```
# Ollama does not require an API key for local setup.
```

LANGUAGE: sh
CODE:
```
# Chrome AI does not require an API key for local setup.
```

----------------------------------------

TITLE: Project Initialization
DESCRIPTION: Get started with assistant-ui by creating a new project or initializing it in an existing one using the provided command-line interface.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/packages/react/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx assistant-ui create
npx assistant-ui init
```

----------------------------------------

TITLE: API Endpoint for AI Chat (Fireworks)
DESCRIPTION: Implements a POST endpoint at /app/api/chat/route.ts for handling chat messages using Fireworks AI. It configures the OpenAI SDK to use the Fireworks AI API base URL and streams responses.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_32

LANGUAGE: ts
CODE:
```
import {
  createOpenAI
} from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

const fireworks = createOpenAI({
  apiKey: process.env.FIREWORKS_API_KEY ?? "",
  baseURL: "https://api.fireworks.ai/inference/v1",
});

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: fireworks("accounts/fireworks/models/firefunction-v2"),
    messages,
  });
  return result.toDataStreamResponse();
}
```

----------------------------------------

TITLE: Composer Action Buttons
DESCRIPTION: Handles the send and cancel actions within the composer. It conditionally displays buttons based on the assistant's running state.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_10

LANGUAGE: jsx
CODE:
```
const ComposerAction: FC = () => {
  return (
    <>
      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <TooltipIconButton
            tooltip="Send"
            variant="default"
            className="aui-composer-send"
          >
            <SendHorizontalIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>
      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <TooltipIconButton
            tooltip="Cancel"
            variant="default"
            className="aui-composer-cancel"
          >
            <CircleStopIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </>
  );
};
```

----------------------------------------

TITLE: Composer Component
DESCRIPTION: The main input component for users to type messages. It includes an input field and a send action button.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_9

LANGUAGE: jsx
CODE:
```
const Composer: FC = () => {
  return (
    <ComposerPrimitive.Root className="aui-composer-root">
      <ComposerPrimitive.Input
        rows={1}
        autoFocus
        placeholder="Write a message..."
        className="aui-composer-input"
      />
      <ComposerAction />
    </ComposerPrimitive.Root>
  );
};
```

----------------------------------------

TITLE: MCP Client and Runtime Setup
DESCRIPTION: Demonstrates how to create an MCP client to integrate with Model Context Protocol servers, specifically showing an example with a GitHub server. It then uses the obtained tools with the chat runtime.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/guides/Tools.mdx#_snippet_8

LANGUAGE: tsx
CODE:
```
// Using AI SDK's MCP support
import { createMCPClient } from "ai/mcp";

const mcpClient = createMCPClient({
  servers: {
    github: {
      command: "npx",
      args: ["@modelcontextprotocol/server-github"]
    }
  }
});

// Tools are automatically available through the runtime
const runtime = useChatRuntime({
  api: "/api/chat",
  tools: await mcpClient.getTools()
});
```

----------------------------------------

TITLE: Install Dependencies
DESCRIPTION: Installs project dependencies using the uv package manager.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/python/assistant-ui-sync-server-api/README.md#_snippet_9

LANGUAGE: bash
CODE:
```
uv sync
```

----------------------------------------

TITLE: API Endpoint for AI Chat (Cohere)
DESCRIPTION: Implements a POST endpoint at /app/api/chat/route.ts for handling chat messages using the Cohere provider. It streams text responses from the specified Cohere model.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_33

LANGUAGE: ts
CODE:
```
import {
  cohere
} from "@ai-sdk/cohere";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: cohere("command-r-plus"),
    messages,
  });
  return result.toDataStreamResponse();
}
```

----------------------------------------

TITLE: Migrating UIMessagePart: Good Example (Custom Chart)
DESCRIPTION: Presents the recommended method for displaying custom charts using tool calls and makeAssistantToolUI.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/migrations/v0-8.mdx#_snippet_6

LANGUAGE: ts
CODE:
```
const convertMessage = (message: MyMessage): ThreadMessageLike => {
  return {
    content: [
      {
        type: "tool-call",
        toolName: "chart",
        args: message.chartData,
      },
    ],
  };
};

const ChartToolUI = makeAssistantToolUI({
  toolName: "chart",
  render: ({ args }) => <MyChart data={args} />,
});

// use tool UI to display the chart
<Thread tools={[ChartToolUI]} />
```

----------------------------------------

TITLE: Install Dependencies
DESCRIPTION: Installs all necessary project dependencies using pnpm.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/CONTRIBUTING.md#_snippet_0

LANGUAGE: sh
CODE:
```
pnpm install
```

----------------------------------------

TITLE: Create Mastra Server Project
DESCRIPTION: Scaffolds a new Mastra server project using npx. This command initiates an interactive wizard to guide you through project setup, including naming and basic configurations.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/mastra/separate-server-integration.mdx#_snippet_0

LANGUAGE: bash
CODE:
```
npx create-mastra@latest
cd your-mastra-server-directory # Replace with the actual directory name
```

----------------------------------------

TITLE: LangGraph Proxy Backend Endpoint (Next.js)
DESCRIPTION: Example Next.js API route handler to proxy requests to the LangGraph server. This is useful for managing API calls and CORS headers in a production environment. It handles GET, POST, PUT, PATCH, DELETE, and OPTIONS methods.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/index.mdx#_snippet_3

LANGUAGE: tsx
CODE:
```
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };
}

async function handleRequest(req: NextRequest, method: string) {
  try {
    const path = req.nextUrl.pathname.replace(/^\/?api\//, "");
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    searchParams.delete("_path");
    searchParams.delete("nxtP_path");
    const queryString = searchParams.toString()
      ? `?${searchParams.toString()}`
      : "";

    const options: RequestInit = {
      method,
      headers: {
        "x-api-key": process.env["LANGCHAIN_API_KEY"] || "",
      },
    };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      options.body = await req.text();
    }

    const res = await fetch(
      `${process.env["LANGGRAPH_API_URL"]}/${path}${queryString}`,
      options,
    );

    return new NextResponse(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers: {
        ...res.headers,
        ...getCorsHeaders(),
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}

export const GET = (req: NextRequest) => handleRequest(req, "GET");
export const POST = (req: NextRequest) => handleRequest(req, "POST");
export const PUT = (req: NextRequest) => handleRequest(req, "PUT");
export const PATCH = (req: NextRequest) => handleRequest(req, "PATCH");
export const DELETE = (req: NextRequest) => handleRequest(req, "DELETE");

// Add a new OPTIONS handler
export const OPTIONS = () => {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...getCorsHeaders(),
    },
  });
};

```

----------------------------------------

TITLE: Assistant UI Callout Component
DESCRIPTION: A simple callout component used to highlight important information or calls to action, such as guiding users to get started. It contains a title and a link.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/about-assistantui.mdx#_snippet_2

LANGUAGE: jsx
CODE:
```
<Callout title="Want to try it out?">
  [Get Started in 30 Seconds](/docs/getting-started).
</Callout>
```

----------------------------------------

TITLE: Assistant UI Integration Examples
DESCRIPTION: This section highlights various integration examples for Assistant UI, showcasing its flexibility with different AI SDKs, frameworks, and local models. Each example provides full source code and configuration details for direct use or adaptation.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/mcp-docs-server.mdx#_snippet_9

LANGUAGE: javascript
CODE:
```
/*
  Integration with Vercel AI SDK
  React Server Components implementation
  LangGraph runtime setup
  OpenAI Assistants integration
  Local Ollama usage
  External store management
  React Hook Form integration
  Tool UI implementation patterns
*/
// Full source code, configuration files, and implementation details are available for each example.
```

----------------------------------------

TITLE: Markdown Text Component with Code Highlighting
DESCRIPTION: The MarkdownText component renders markdown content with support for code blocks and syntax highlighting. It utilizes `@assistant-ui/react-markdown` and `remark-gfm` for extended markdown features. Includes a custom `CodeHeader` for displaying language and providing a copy-to-clipboard functionality.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_19

LANGUAGE: tsx
CODE:
```
"use client";

import "@assistant-ui/react-markdown/styles/dot.css";

import {
  CodeHeaderProps,
  MarkdownTextPrimitive,
  unstable_memoizeMarkdownComponents as memoizeMarkdownComponents,
  useIsMarkdownCodeBlock,
} from "@assistant-ui/react-markdown";
import remarkGfm from "remark-gfm";
import { FC, memo, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { cn } from "@/lib/utils";

const MarkdownTextImpl = () => {
  return (
    <MarkdownTextPrimitive
      remarkPlugins={[remarkGfm]}
      className="aui-md"
      components={defaultComponents}
    />
  );
};

export const MarkdownText = memo(MarkdownTextImpl);

const CodeHeader: FC<CodeHeaderProps> = ({ language, code }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const onCopy = () => {
    if (!code || isCopied) return;
    copyToClipboard(code);
  };

  return (
    <div className="aui-code-header-root">
      <span className="aui-code-header-language">{language}</span>
      <TooltipIconButton tooltip="Copy" onClick={onCopy}>
        {!isCopied && <CopyIcon />}
        {isCopied && <CheckIcon />}
      </TooltipIconButton>
    </div>
  );
};

const useCopyToClipboard = ({
  copiedDuration = 3000,
}: {
  copiedDuration?: number;
} = {}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = (value: string) => {
    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), copiedDuration);
    });
  };

  return { isCopied, copyToClipboard };
};

const defaultComponents = memoizeMarkdownComponents({
  h1: ({ className, ...props }) => (
    <h1 className={cn("aui-md-h1", className)} {...props} />
  ),
  h2: ({ className, ...props }) => (
    <h2 className={cn("aui-md-h2", className)} {...props} />
  ),
  h3: ({ className, ...props }) => (
    <h3 className={cn("aui-md-h3", className)} {...props} />
  ),
  h4: ({ className, ...props }) => (
    <h4 className={cn("aui-md-h4", className)} {...props} />
  ),
  h5: ({ className, ...props }) => (
    <h5 className={cn("aui-md-h5", className)} {...props} />
  ),
  h6: ({ className, ...props }) => (
    <h6 className={cn("aui-md-h6", className)} {...props} />
  ),
  p: ({ className, ...props }) => (
    <p className={cn("aui-md-p", className)} {...props} />
  ),
  a: ({ className, ...props }) => (
    <a className={cn("aui-md-a", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote className={cn("aui-md-blockquote", className)} {...props} />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("aui-md-ul", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("aui-md-ol", className)} {...props} />
  ),
  hr: ({ className, ...props }) => (
    <hr className={cn("aui-md-hr", className)} {...props} />
  ),
  table: ({ className, ...props }) => (
    <table className={cn("aui-md-table", className)} {...props} />
  ),
  th: ({ className, ...props }) => (

```

----------------------------------------

TITLE: Codemod Options and Usage Examples
DESCRIPTION: Provides available options for the codemod and demonstrates their usage. Options include `--dry` for previewing changes, `--print` for outputting transformed code, and `--verbose` for detailed logs. Examples show how to preview, apply to a specific directory, and apply to the entire project.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/packages/cli/src/codemods/v0-11/README.md#_snippet_7

LANGUAGE: bash
CODE:
```
# Preview changes without applying them
npx @assistant-ui/cli codemod v0-11/content-part-to-message-part src/ --dry

# Apply the transformation to your src directory
npx @assistant-ui/cli codemod v0-11/content-part-to-message-part src/

# Apply to entire project
npx @assistant-ui/cli codemod v0-11/content-part-to-message-part .
```

----------------------------------------

TITLE: Redirect to Getting Started
DESCRIPTION: This snippet demonstrates a common pattern in Next.js applications for handling documentation routing. It uses the `redirect` function from 'next/navigation' to send users to a specific documentation page, in this case, '/docs/getting-started'. This is typically used for the root documentation path.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/index.mdx#_snippet_0

LANGUAGE: typescript
CODE:
```
import { redirect } from "next/navigation";

<>{redirect("/docs/getting-started")}</>
```

----------------------------------------

TITLE: Configure Environment Variables
DESCRIPTION: Instructions for setting up environment variables in a `.env.local` file. These variables are crucial for connecting to the LangGraph API server, especially for development and production environments.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/index.mdx#_snippet_1

LANGUAGE: sh
CODE:
```
# LANGCHAIN_API_KEY=your_api_key # for production
# LANGGRAPH_API_URL=your_api_url # for production
NEXT_PUBLIC_LANGGRAPH_API_URL=your_api_url # for development (no api key required)
NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID=your_graph_id
```

----------------------------------------

TITLE: Install MCP Docs Server (Claude CLI)
DESCRIPTION: Installs the assistant-ui MCP docs server using the Claude CLI. Supports project-specific or global installation.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/mcp-docs-server.mdx#_snippet_0

LANGUAGE: bash
CODE:
```
# Add to current project only
claude mcp add assistant-ui -- npx -y @assistant-ui/mcp-docs-server

# Or add globally for all projects
claude mcp add --scope user assistant-ui -- npx -y @assistant-ui/mcp-docs-server
```

----------------------------------------

TITLE: Create and Navigate Next.js Project
DESCRIPTION: This command initializes a new Next.js project using the LangGraph assistant-ui template and then navigates into the newly created project directory.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/tutorial/part-1.mdx#_snippet_0

LANGUAGE: sh
CODE:
```
npx create-assistant-ui@latest -t langgraph my-app
cd my-app
```

----------------------------------------

TITLE: Use MyAssistant Component in Page
DESCRIPTION: Demonstrates how to import and use the `MyAssistant` component within a Next.js page.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/langgraph/index.mdx#_snippet_6

LANGUAGE: tsx
CODE:
```
import { MyAssistant } from "@/components/MyAssistant";

export default function Home() {
  return (
    <main className="h-dvh">
      <MyAssistant />
    </main>
  );
}

```

----------------------------------------

TITLE: User Message Component
DESCRIPTION: Represents a message sent by the user. It includes an action bar for editing and displays the message content.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_11

LANGUAGE: jsx
CODE:
```
const UserMessage: FC = () => {
  return (
    <MessagePrimitive.Root className="aui-user-message-root">
      <UserActionBar />

      <div className="aui-user-message-content">
        <MessagePrimitive.Parts />
      </div>

      <BranchPicker className="aui-user-branch-picker" />
    </MessagePrimitive.Root>
  );
};
```

----------------------------------------

TITLE: Initialize Assistant UI
DESCRIPTION: Commands to create a new Assistant UI project or initialize it in an existing one. Installs dependencies and sets up basic configuration.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/mastra/full-stack-integration.mdx#_snippet_0

LANGUAGE: sh
CODE:
```
npx assistant-ui@latest create
```

LANGUAGE: sh
CODE:
```
npx assistant-ui@latest init
```

----------------------------------------

TITLE: Install Assistant UI React
DESCRIPTION: Command to install the Assistant UI React library using npm or yarn.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/custom/local.mdx#_snippet_2

LANGUAGE: sh
CODE:
```
npm install @assistant-ui/react
```

----------------------------------------

TITLE: Basic Setup with useChatRuntime
DESCRIPTION: Demonstrates the basic setup for integrating the Assistant UI React AI SDK. It shows how to use the `useChatRuntime` hook and wrap the application with `AssistantRuntimeProvider` to enable default system message and tool forwarding.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/packages/react-ai-sdk/README.md#_snippet_0

LANGUAGE: typescript
CODE:
```
import { useChatRuntime } from '@assistant-ui/react-ai-sdk';
import { AssistantRuntimeProvider } from '@assistant-ui/react';

function App() {
  // By default, uses AssistantChatTransport which forwards system messages and tools
  const runtime = useChatRuntime();
  
  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {/* Your assistant UI components */}
    </AssistantRuntimeProvider>
  );
}
```

----------------------------------------

TITLE: Branch Picker Component
DESCRIPTION: Allows navigation between different branches of a conversation. It displays the current branch number and total count, with previous and next navigation buttons.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_16

LANGUAGE: jsx
CODE:
```
const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn("aui-branch-picker-root", className)}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip="Previous">
          <ChevronLeftIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className="aui-branch-picker-state">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip="Next">
          <ChevronRightIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};
```

----------------------------------------

TITLE: Assistant Action Bar
DESCRIPTION: Provides actions for assistant messages, including Copy and Refresh. It supports autohiding behavior.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_15

LANGUAGE: jsx
CODE:
```
const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      autohideFloat="single-branch"
      className="aui-assistant-action-bar-root"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip="Copy">
          <MessagePrimitive.If copied>
            <CheckIcon />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip="Refresh">
          <RefreshCwIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  );
};
```

----------------------------------------

TITLE: Create New Project with Assistant UI
DESCRIPTION: This command initializes a new project with the Assistant UI framework. It sets up the necessary files and configurations to start building an AI chat application.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx assistant-ui create
```

----------------------------------------

TITLE: Run Docs Project
DESCRIPTION: Starts the documentation project in development mode.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/CONTRIBUTING.md#_snippet_2

LANGUAGE: sh
CODE:
```
cd apps/docs
pnpm dev
```

----------------------------------------

TITLE: Install Assistant UI
DESCRIPTION: Installs the Assistant UI React package using npm or yarn.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/runtimes/custom/external-store.mdx#_snippet_1

LANGUAGE: sh
CODE:
```
npm install @assistant-ui/react
```

----------------------------------------

TITLE: Tooltip Component (Tailwind)
DESCRIPTION: A Tooltip component using Radix UI primitives, providing Tooltip, TooltipTrigger, and TooltipContent. It's styled to integrate with Tailwind CSS.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_6

LANGUAGE: tsx
CODE:
```
"use client";

import * as React from "";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn("aui-tooltip-content", className)}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
```

----------------------------------------

TITLE: Clone Repository and Install Dependencies
DESCRIPTION: Commands to clone the assistant-ui-local-ollama repository and install project dependencies using npm.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/examples/local-ollama/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
git clone https://github.com/yourusername/assistant-ui-local-ollama.git
cd assistant-ui-local-ollama
npm install
```

----------------------------------------

TITLE: Vercel AI SDK RSC Setup with Thread
DESCRIPTION: Demonstrates how to integrate RSCDisplay with the default Thread component for Vercel AI SDK RSC support.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/migrations/v0-8.mdx#_snippet_1

LANGUAGE: ts
CODE:
```
import { RSCDisplay } from "@assistant-ui/react-ai-sdk";

// if you are using the default Thread component
// add RSCDisplay to assistantMessage.components.Text
<Thread assistantMessage={{ components: { Text: RSCDisplay } }} />
```

----------------------------------------

TITLE: Install shiki-highlighter
DESCRIPTION: Installs the shiki-highlighter component and the react-shiki dependency. This command adds a new file to your project and allows for customization of the highlighter's configuration.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/ui/SyntaxHighlighting.mdx#_snippet_0

LANGUAGE: bash
CODE:
```
npx shadcn@latest add "https://r.assistant-ui.com/shiki-highlighter"
```

----------------------------------------

TITLE: Assistant UI Integration - Assistant Modal
DESCRIPTION: This React component shows how to integrate the Assistant UI's chat runtime for an Assistant Modal view. It utilizes `useChatRuntime` for API connection and `AssistantRuntimeProvider` for runtime accessibility.

SOURCE: https://github.com/assistant-ui/assistant-ui/blob/main/apps/docs/content/docs/getting-started.mdx#_snippet_30

LANGUAGE: tsx
CODE:
```
// run `npx shadcn@latest add "https://r.assistant-ui.com/assistant-modal"

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { AssistantModal } from "@/components/assistant-ui/assistant-modal";

const MyApp = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <AssistantModal />
    </AssistantRuntimeProvider>
  );
};

```