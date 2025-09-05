========================
CODE SNIPPETS
========================
TITLE: Run AI SDK Example Application with pnpm
DESCRIPTION: This set of `pnpm` commands guides users through setting up and running an example application. It includes navigating to the example directory, configuring the OpenAI API key in an environment file, and starting the development servers for both Angular and Express.

SOURCE: https://github.com/vercel/ai/blob/main/packages/angular/README.md#_snippet_16

LANGUAGE: bash
CODE:
```
# Navigate to example
cd examples/angular-chat

# Set up environment
echo "OPENAI_API_KEY=your_key_here" > .env

# Start development (Angular + Express)
pnpm start
```

----------------------------------------

TITLE: Install Dependencies and Build AI SDK Project
DESCRIPTION: These commands are used to install project dependencies using `pnpm` and then build the AI SDK project, preparing it for execution.

SOURCE: https://github.com/vercel/ai/blob/main/examples/hono/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
pnpm install
pnpm build
```

----------------------------------------

TITLE: Install Dependencies and Build AI SDK Project
DESCRIPTION: Commands to set up the AI SDK project by installing necessary dependencies and then building the project. These steps should be executed from the root directory of the AI SDK repository.

SOURCE: https://github.com/vercel/ai/blob/main/examples/ai-core/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
pnpm install
pnpm build
```

----------------------------------------

TITLE: Install Dependencies and Configure Environment for Next.js AI App
DESCRIPTION: This command sequence facilitates the initial setup of the project by installing all necessary dependencies using pnpm. Following installation, it copies the example environment file to `.env.local`, which is essential for local development. Users are then required to manually populate this new `.env.local` file with specific configuration values.

SOURCE: https://github.com/vercel/ai/blob/main/examples/next-openai-kasada-bot-protection/README.md#_snippet_0

LANGUAGE: sh
CODE:
```
pnpm i
cp .env.local.example .env.local # and fill in the required values
```

----------------------------------------

TITLE: Install AI SDK and Google Generative AI Provider
DESCRIPTION: Instructions for installing the necessary AI SDK and Google Generative AI provider packages using pnpm for a new Next.js application.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/17-gemini-2-5.mdx#_snippet_4

LANGUAGE: Shell
CODE:
```
pnpm install ai @ai-sdk/google
```

----------------------------------------

TITLE: Install Dependencies and Build AI SDK Project
DESCRIPTION: Installs project dependencies using pnpm and then builds the AI SDK project. These steps are necessary to prepare the application for execution and ensure all required modules are available.

SOURCE: https://github.com/vercel/ai/blob/main/examples/fastify/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
pnpm install
pnpm build
```

----------------------------------------

TITLE: Install Dependencies and Start Angular AI Chat App
DESCRIPTION: This snippet provides the necessary commands to set up and run the Angular AI chat application. It covers installing project dependencies using pnpm, creating an environment file for the OpenAI API key, and starting both the Angular frontend (localhost:4200) and Express backend (localhost:3000) concurrently.

SOURCE: https://github.com/vercel/ai/blob/main/examples/angular/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
# Install dependencies
pnpm install

# Create .env file with your OpenAI API key
echo "OPENAI_API_KEY=your_key_here" > .env

# Start the app
pnpm start
```

----------------------------------------

TITLE: Install AI SDK and OpenAI Provider
DESCRIPTION: This command installs the core AI SDK, the OpenAI provider for model integration, and the React-specific UI components, which are essential dependencies for building AI-powered applications with Next.js.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/23-gpt-5.mdx#_snippet_7

LANGUAGE: Shell
CODE:
```
pnpm install ai @ai-sdk/openai @ai-sdk/react
```

----------------------------------------

TITLE: Install AI SDK and OpenAI Provider for Next.js
DESCRIPTION: Provides the command to install the necessary AI SDK packages and the OpenAI provider for a Next.js application. This step is crucial for setting up the development environment to build AI-powered interfaces.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/24-o3.mdx#_snippet_4

LANGUAGE: Shell
CODE:
```
pnpm install ai @ai-sdk/openai @ai-sdk/react
```

----------------------------------------

TITLE: Install AI SDK and DeepSeek Provider for Next.js
DESCRIPTION: This command installs the necessary AI SDK packages (`ai`, `@ai-sdk/deepseek`, `@ai-sdk/react`) required to build AI-powered applications with DeepSeek models in a Next.js environment.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/25-r1.mdx#_snippet_3

LANGUAGE: Shell
CODE:
```
pnpm install ai @ai-sdk/deepseek @ai-sdk/react
```

----------------------------------------

TITLE: Build AI SDK Project with pnpm
DESCRIPTION: These commands demonstrate how to install project dependencies and build the AI SDK project using `pnpm`. `pnpm install` fetches all required packages, and `pnpm build` compiles the project, preparing it for execution.

SOURCE: https://github.com/vercel/ai/blob/main/examples/mcp/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
pnpm install
```

LANGUAGE: sh
CODE:
```
pnpm build
```

----------------------------------------

TITLE: Run AI SDK with SSE Transport (Legacy)
DESCRIPTION: This section outlines the commands for starting a server and running a client using the legacy SSE transport. `pnpm sse:server` starts the server, and `pnpm sse:client` runs the client to interact via SSE.

SOURCE: https://github.com/vercel/ai/blob/main/examples/mcp/README.md#_snippet_4

LANGUAGE: sh
CODE:
```
pnpm sse:server
```

LANGUAGE: sh
CODE:
```
pnpm sse:client
```

----------------------------------------

TITLE: Install Dependencies and Build AI SDK Project
DESCRIPTION: These commands are used to install all required project dependencies and then build the AI SDK project. This prepares the application for execution by compiling source code and resolving modules.

SOURCE: https://github.com/vercel/ai/blob/main/examples/express/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
pnpm install
pnpm build
```

----------------------------------------

TITLE: Install Project Dependencies for Nest.js AI SDK Example
DESCRIPTION: This command installs all required project dependencies using `pnpm`. It ensures that all necessary packages for the Nest.js application and AI SDK integration are available. This command should be executed from the root directory of the AI SDK repository.

SOURCE: https://github.com/vercel/ai/blob/main/examples/nest/README.md#_snippet_1

LANGUAGE: sh
CODE:
```
pnpm install
```

----------------------------------------

TITLE: Start Hono AI SDK Development Server
DESCRIPTION: This command initiates the development server for the Hono application integrated with the AI SDK, typically running on a local port.

SOURCE: https://github.com/vercel/ai/blob/main/examples/hono/README.md#_snippet_2

LANGUAGE: sh
CODE:
```
pnpm dev
```

----------------------------------------

TITLE: Install AI SDK and related dependencies for Expo
DESCRIPTION: Installs the core AI SDK package, the OpenAI provider, the React integration, and `zod` for schema validation using various package managers.

SOURCE: https://github.com/vercel/ai/blob/main/content/docs/02-getting-started/07-expo.mdx#_snippet_2

LANGUAGE: pnpm
CODE:
```
pnpm add ai @ai-sdk/openai @ai-sdk/react zod
```

LANGUAGE: npm
CODE:
```
npm install ai @ai-sdk/openai @ai-sdk/react zod
```

LANGUAGE: yarn
CODE:
```
yarn add ai @ai-sdk/openai @ai-sdk/react zod
```

LANGUAGE: bun
CODE:
```
bun add ai @ai-sdk/openai @ai-sdk/react zod
```

----------------------------------------

TITLE: Bootstrap Next.js AI Chat Example with create-next-app
DESCRIPTION: Commands to initialize a new Next.js project based on the AI SDK, Next.js, and OpenAI example using different package managers: npm, Yarn, and pnpm.

SOURCE: https://github.com/vercel/ai/blob/main/examples/next-openai/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx create-next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai next-openai-app
```

LANGUAGE: bash
CODE:
```
yarn create next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai next-openai-app
```

LANGUAGE: bash
CODE:
```
pnpm create next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai next-openai-app
```

----------------------------------------

TITLE: Initialize Next.js Project with AI SDK Example
DESCRIPTION: These commands demonstrate how to bootstrap a new Next.js application using `create-next-app` and an example from the Vercel AI repository, specifically for integrating AI SDK with Next.js and FastAPI. Choose your preferred package manager: npm, Yarn, or pnpm.

SOURCE: https://github.com/vercel/ai/blob/main/examples/next-fastapi/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx create-next-app --example https://github.com/vercel/ai/tree/main/examples/next-fastapi next-fastapi-app
```

LANGUAGE: bash
CODE:
```
yarn create next-app --example https://github.com/vercel/ai/tree/main/examples/next-fastapi next-fastapi-app
```

LANGUAGE: bash
CODE:
```
pnpm create next-app --example https://github.com/vercel/ai/tree/main/examples/next-fastapi next-fastapi-app
```

----------------------------------------

TITLE: Run AI SDK Core Basic Example
DESCRIPTION: Command to execute a specific AI SDK core example script. This allows developers to quickly test individual functionalities or scenarios provided within the `examples/ai-core` directory.

SOURCE: https://github.com/vercel/ai/blob/main/examples/ai-core/README.md#_snippet_2

LANGUAGE: sh
CODE:
```
pnpm tsx src/path/to/example.ts
```

----------------------------------------

TITLE: Integrate Google Search with Gemini using AI SDK
DESCRIPTION: This example demonstrates how to use the AI SDK with Google Gemini to ground responses with real-time information from Google Search. It shows how to configure the `google_search` tool and access grounding metadata from the provider.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/17-gemini-2-5.mdx#_snippet_3

LANGUAGE: TypeScript
CODE:
```
import { google } from '@ai-sdk/google';
import { GoogleGenerativeAIProviderMetadata } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text, sources, providerMetadata } = await generateText({
  model: google('gemini-2.5-flash'),
  tools: {
    google_search: google.tools.googleSearch({}),
  },
  prompt:
    'List the top 5 San Francisco news from the past week.' +
    'You must include the date of each article.',
});

// access the grounding metadata. Casting to the provider metadata type
// is optional but provides autocomplete and type safety.
const metadata = providerMetadata?.google as
  | GoogleGenerativeAIProviderMetadata
  | undefined;
const groundingMetadata = metadata?.groundingMetadata;
const safetyRatings = metadata?.safetyRatings;
```

----------------------------------------

TITLE: Run AI SDK Examples Locally
DESCRIPTION: Commands to navigate into an example directory and execute specific AI SDK examples, such as a TypeScript-based OpenAI stream text example or general framework examples.

SOURCE: https://github.com/vercel/ai/blob/main/CONTRIBUTING.md#_snippet_2

LANGUAGE: Shell
CODE:
```
cd examples/ai-core
```

LANGUAGE: Shell
CODE:
```
pnpm tsx src/stream-text/openai.ts
```

LANGUAGE: Shell
CODE:
```
pnpm dev
```

----------------------------------------

TITLE: Integrate Web Search with GPT-5 using AI SDK
DESCRIPTION: This snippet demonstrates how to enable real-time information access for GPT-5 through web search integration using the AI SDK. It utilizes the `openai.responses` model and `web_search_preview` tool to perform searches. The example also shows how to access the URL sources from the search results.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/23-gpt-5.mdx#_snippet_4

LANGUAGE: TypeScript
CODE:
```
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = await generateText({
  model: openai.responses('gpt-5'),
  prompt: 'What are the latest developments in AI this week?',
  tools: {
    web_search_preview: openai.tools.webSearchPreview({
      searchContextSize: 'high',
    }),
  },
  toolChoice: { type: 'tool', toolName: 'web_search_preview' },
});

// Access URL sources
const sources = result.sources;
```

----------------------------------------

TITLE: Bootstrap Next.js AI Chat Example with create-next-app
DESCRIPTION: These commands demonstrate how to quickly set up the Next.js AI chat example project using `create-next-app`. They fetch the example directly from the Vercel AI GitHub repository, providing options for npm, Yarn, and pnpm package managers.

SOURCE: https://github.com/vercel/ai/blob/main/examples/next-langchain/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx create-next-app --example https://github.com/vercel/ai/tree/main/examples/next-langchain next-langchain-app
```

LANGUAGE: bash
CODE:
```
yarn create next-app --example https://github.com/vercel/ai/tree/main/examples/next-langchain next-langchain-app
```

LANGUAGE: bash
CODE:
```
pnpm create next-app --example https://github.com/vercel/ai/tree/main/examples/next-langchain next-langchain-app
```

----------------------------------------

TITLE: Bootstrap Next.js Project with Google Vertex AI Edge Example
DESCRIPTION: This command uses `create-next-app` to bootstrap a new Next.js project, pre-configured with the AI SDK and Google Vertex AI Edge example. It allows users to quickly set up a local development environment for the provided example, requiring npm, Yarn, or pnpm to execute.

SOURCE: https://github.com/vercel/ai/blob/main/examples/next-google-vertex/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx create-next-app --example https://github.com/vercel/ai/tree/main/examples/next-google-vertex-edge next-vertex-edge-app
```

----------------------------------------

TITLE: Start Fastify Development Server
DESCRIPTION: Initiates the Fastify server in development mode, making it accessible for testing on `http://localhost:8080`. This command typically watches for file changes and reloads the server automatically.

SOURCE: https://github.com/vercel/ai/blob/main/examples/fastify/README.md#_snippet_2

LANGUAGE: sh
CODE:
```
pnpm dev
```

----------------------------------------

TITLE: Run AI SDK with Streamable HTTP Transport
DESCRIPTION: This section provides commands to start a server and run a client using the streamable HTTP transport mechanism. `pnpm http:server` initiates the server, and `pnpm http:client` executes the client application to interact with it.

SOURCE: https://github.com/vercel/ai/blob/main/examples/mcp/README.md#_snippet_2

LANGUAGE: sh
CODE:
```
pnpm http:server
```

LANGUAGE: sh
CODE:
```
pnpm http:client
```

----------------------------------------

TITLE: Install Project Dependencies with pnpm
DESCRIPTION: Installs all necessary project dependencies using the pnpm package manager. This command prepares the development environment by downloading and linking required packages.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/03-slackbot.mdx#_snippet_1

LANGUAGE: Shell
CODE:
```
pnpm install
```

----------------------------------------

TITLE: Implement Tool Calling with AI SDK for External Interactions
DESCRIPTION: Illustrates how to integrate custom tools with AI SDK models to enable interaction with external systems. This example defines a `getWeather` tool, allowing the model to simulate fetching real-time weather data based on user prompts, enhancing its dynamic capabilities.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/24-o3.mdx#_snippet_3

LANGUAGE: TypeScript
CODE:
```
import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const { text } = await generateText({
  model: openai('o3-mini'),
  prompt: 'What is the weather like today in San Francisco?',
  tools: {
    getWeather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
  },
});
```

----------------------------------------

TITLE: Bootstrap Next.js AI Chat Example with create-next-app
DESCRIPTION: These commands demonstrate how to quickly set up the Next.js AI chat example project using `create-next-app` with different package managers: npm, Yarn, and pnpm. This bootstraps the project structure and downloads necessary files from the specified GitHub repository, preparing it for local development.

SOURCE: https://github.com/vercel/ai/blob/main/examples/next-openai-upstash-rate-limits/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx create-next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai-rate-limits next-openai-rate-limits-app
```

LANGUAGE: bash
CODE:
```
yarn create next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai-rate-limits next-openai-rate-limits-app
```

LANGUAGE: bash
CODE:
```
pnpm create next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai-rate-limits next-openai-rate-limits-app
```

----------------------------------------

TITLE: Bootstrap Nuxt.js Project with AI SDK and OpenAI Example
DESCRIPTION: This command utilizes `npx create-nuxt` to quickly scaffold a new Nuxt.js project. It fetches the specified GitHub template for the AI SDK and OpenAI example, creating a local directory named `nuxt-openai` ready for development.

SOURCE: https://github.com/vercel/ai/blob/main/examples/nuxt-openai/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx create-nuxt -t github:vercel/ai/examples/nuxt-openai nuxt-openai
```

----------------------------------------

TITLE: Install Vercel CLI Globally
DESCRIPTION: Installs the Vercel command-line interface globally using pnpm, which is a prerequisite for deploying applications to Vercel from your local machine.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/03-slackbot.mdx#_snippet_8

LANGUAGE: bash
CODE:
```
pnpm install -g vercel
```

----------------------------------------

TITLE: Make Basic GPT-5 Call with AI SDK in TypeScript
DESCRIPTION: Illustrates the fundamental way to interact with OpenAI GPT-5 using the AI SDK. It shows how to import necessary modules (`generateText`, `openai`) and make a simple text generation call. This snippet provides a quick start for integrating large language models into applications.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/23-gpt-5.mdx#_snippet_1

LANGUAGE: TypeScript
CODE:
```
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const { text } = await generateText({
  model: openai('gpt-5'),
  prompt: 'Explain the concept of quantum entanglement.',
});
```

----------------------------------------

TITLE: Enable Reasoning Summaries for GPT-5 Thought Process in AI SDK
DESCRIPTION: This example shows how to enable reasoning summaries for GPT-5 to gain transparency into its thought process. By setting `reasoningSummary` to 'detailed' (or 'auto'), the model can provide insights into its logic. The snippet demonstrates streaming both reasoning and text parts separately from the full stream.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/23-gpt-5.mdx#_snippet_5

LANGUAGE: TypeScript
CODE:
```
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

const result = streamText({
  model: openai.responses('gpt-5'),
  prompt:
    'Solve this logic puzzle: If all roses are flowers and some flowers fade quickly, do all roses fade quickly?',
  providerOptions: {
    openai: {
      reasoningSummary: 'detailed', // 'auto' for condensed or 'detailed' for comprehensive
    },
  },
});

// Stream reasoning and text separately
for await (const part of result.fullStream) {
  if (part.type === 'reasoning') {
    console.log(part.textDelta);
  } else if (part.type === 'text-delta') {
    process.stdout.write(part.textDelta);
  }
}
```

----------------------------------------

TITLE: Install AI SDK and Anthropic Provider
DESCRIPTION: This command installs the necessary AI SDK core library and the Anthropic provider package using pnpm. These packages are essential for interacting with AI models like Claude 3.7 Sonnet.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/20-sonnet-3-7.mdx#_snippet_3

LANGUAGE: Shell
CODE:
```
pnpm install ai @ai-sdk/anthropic
```

----------------------------------------

TITLE: Bootstrap Next.js AI Chat Example with create-next-app
DESCRIPTION: These commands show how to initialize a new Next.js application using the provided AI SDK example template. You can choose your preferred package manager (npm, Yarn, or pnpm) to quickly set up the project structure and dependencies for the AI chat bot.

SOURCE: https://github.com/vercel/ai/blob/main/examples/next-openai-pages/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx create-next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai-pages next-openai-app
```

LANGUAGE: bash
CODE:
```
yarn create next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai-pages next-openai-app
```

LANGUAGE: bash
CODE:
```
pnpm create next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai-pages next-openai-app
```

----------------------------------------

TITLE: Install Replicate AI SDK module
DESCRIPTION: Instructions to install the `@ai-sdk/replicate` module using various JavaScript package managers.

SOURCE: https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/60-replicate.mdx#_snippet_0

LANGUAGE: Shell
CODE:
```
pnpm add @ai-sdk/replicate
```

LANGUAGE: Shell
CODE:
```
npm install @ai-sdk/replicate
```

LANGUAGE: Shell
CODE:
```
yarn add @ai-sdk/replicate
```

LANGUAGE: Shell
CODE:
```
bun add @ai-sdk/replicate
```

----------------------------------------

TITLE: Initialize Next.js Project with AI SDK OpenAI Telemetry Example
DESCRIPTION: These commands demonstrate how to bootstrap a new Next.js application pre-configured with the AI SDK, OpenAI integration, and OpenTelemetry support. You can choose your preferred package manager: npm, Yarn, or pnpm, to create the project from the specified GitHub example repository.

SOURCE: https://github.com/vercel/ai/blob/main/examples/next-openai-telemetry/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx create-next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai-telemetry next-openai-telemetry-app
```

LANGUAGE: bash
CODE:
```
yarn create next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai-telemetry next-openai-telemetry-app
```

LANGUAGE: bash
CODE:
```
pnpm create next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai-telemetry next-openai-telemetry-app
```

----------------------------------------

TITLE: Bootstrap Next.js AI Chat Example with create-next-app
DESCRIPTION: This command initializes a new Next.js application using the `create-next-app` utility, specifically cloning the `next-openai` example from the Vercel AI repository. It sets up the project structure and necessary files for the AI-powered chat bot example. Users can choose their preferred package manager: npm, Yarn, or pnpm.

SOURCE: https://github.com/vercel/ai/blob/main/examples/next-openai-telemetry/app/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npx create-next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai next-openai-app
```

LANGUAGE: bash
CODE:
```
yarn create next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai next-openai-app
```

LANGUAGE: bash
CODE:
```
pnpm create next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai next-openai-app
```

----------------------------------------

TITLE: Install Qwen AI Provider Module
DESCRIPTION: Instructions to install the `qwen-ai-provider` module using various JavaScript package managers.

SOURCE: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/02-qwen.mdx#_snippet_0

LANGUAGE: pnpm
CODE:
```
pnpm add qwen-ai-provider
```

LANGUAGE: npm
CODE:
```
npm install qwen-ai-provider
```

LANGUAGE: yarn
CODE:
```
yarn add qwen-ai-provider
```

LANGUAGE: bun
CODE:
```
bun add qwen-ai-provider
```

----------------------------------------

TITLE: Bootstrap Next.js AI Chat Example with create-next-app
DESCRIPTION: These commands show how to initialize a new Next.js project using the Vercel AI SDK example for OpenAI and Sentry integration. Choose your preferred package manager (npm, Yarn, or pnpm) to bootstrap the application.

SOURCE: https://github.com/vercel/ai/blob/main/examples/next-openai-telemetry-sentry/README.md#_snippet_0

LANGUAGE: Bash
CODE:
```
npx create-next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai-telemetry-sentry next-openai-telemetry-sentry-app
```

LANGUAGE: Bash
CODE:
```
yarn create next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai-telemetry-sentry next-openai-telemetry-sentry-app
```

LANGUAGE: Bash
CODE:
```
pnpm create next-app --example https://github.com/vercel/ai/tree/main/examples/next-openai-telemetry-sentry next-openai-telemetry-sentry-app
```

----------------------------------------

TITLE: Install AI SDK and Anthropic Provider
DESCRIPTION: Installs the necessary AI SDK and Anthropic provider packages using pnpm for a Next.js application, enabling integration with AI models like Claude Sonnet 4.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/18-claude-4.mdx#_snippet_2

LANGUAGE: Shell
CODE:
```
pnpm install ai @ai-sdk/anthropic
```

----------------------------------------

TITLE: Typical OpenTelemetry Setup for Observability
DESCRIPTION: Illustrates a more complex OpenTelemetry (OTEL) setup for observability, requiring multiple package installations, SDK configuration, and explicit telemetry enablement. This contrasts with Helicone's simpler proxy approach by showing the extensive boilerplate often needed for traditional observability solutions.

SOURCE: https://github.com/vercel/ai/blob/main/content/providers/05-observability/helicone.mdx#_snippet_3

LANGUAGE: javascript
CODE:
```
// Install multiple packages
// @vercel/otel, @opentelemetry/sdk-node, @opentelemetry/auto-instrumentations-node, etc.

// Create exporter
const exporter = new OtherProviderExporter({
  projectApiKey: process.env.API_KEY
});

// Setup SDK
const sdk = new NodeSDK({
  traceExporter: exporter,
  instrumentations: [getNodeAutoInstrumentations()],
  resource: new Resource({...}),
});

// Start SDK
sdk.start();

// Enable telemetry on each request
const response = await generateText({
  model: openai("gpt-4o-mini"),
  prompt: "Hello world",
  experimental_telemetry: { isEnabled: true }
});

// Shutdown SDK to flush traces
await sdk.shutdown();
```

----------------------------------------

TITLE: Install FriendliAI AI Provider
DESCRIPTION: Instructions for installing the `@friendliai/ai-provider` module using various package managers.

SOURCE: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/08-friendliai.mdx#_snippet_0

LANGUAGE: pnpm
CODE:
```
pnpm add @friendliai/ai-provider
```

LANGUAGE: npm
CODE:
```
npm install @friendliai/ai-provider
```

LANGUAGE: yarn
CODE:
```
yarn add @friendliai/ai-provider
```

LANGUAGE: bun
CODE:
```
bun add @friendliai/ai-provider
```

----------------------------------------

TITLE: Install AI SDK Polyfill Dependencies
DESCRIPTION: Install the necessary polyfill packages (`@ungap/structured-clone` and `@stardazed/streams-text-encoding`) using various package managers like pnpm, npm, yarn, or bun. These packages provide implementations for functions that might be missing in certain JavaScript runtimes, particularly in Expo.

SOURCE: https://github.com/vercel/ai/blob/main/content/docs/02-getting-started/07-expo.mdx#_snippet_14

LANGUAGE: Shell
CODE:
```
pnpm add @ungap/structured-clone @stardazed/streams-text-encoding
```

LANGUAGE: Shell
CODE:
```
npm install @ungap/structured-clone @stardazed/streams-text-encoding
```

LANGUAGE: Shell
CODE:
```
yarn add @ungap/structured-clone @stardazed/streams-text-encoding
```

LANGUAGE: Shell
CODE:
```
bun add @ungap/structured-clone @stardazed/streams-text-encoding
```

----------------------------------------

TITLE: Example Stream Sequence for Vercel AI Language Model V2
DESCRIPTION: Provides an illustrative sequence of stream events for the Vercel AI Language Model V2 streaming system. This example demonstrates the typical flow from stream start, through content events like text and tool calls, to response metadata and the final finish event.

SOURCE: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/01-custom-providers.mdx#_snippet_16

LANGUAGE: typescript
CODE:
```
{
  type: 'stream-start',
  warnings: []
}
{
  type: 'text',
  text: 'Hello'
}
{
  type: 'text',
  text: ' world'
}
{
  type: 'tool-call',
  toolCallId: '1',
  toolName: 'search',
  args: {...}
}
{
  type: 'response-metadata',
  modelId: 'gpt-4.1',
  ...
}
{
  type: 'finish',
  usage: {
    inputTokens: 10,
    outputTokens: 20
  },
  finishReason: 'stop'
}
```

----------------------------------------

TITLE: Install ElevenLabs Provider for AI SDK
DESCRIPTION: Instructions to install the `@ai-sdk/elevenlabs` module, which provides the ElevenLabs integration for the AI SDK, using npm.

SOURCE: https://github.com/vercel/ai/blob/main/packages/elevenlabs/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm i @ai-sdk/elevenlabs
```

----------------------------------------

TITLE: Generate text with Claude 3.7 Sonnet using AI SDK and Anthropic
DESCRIPTION: This example demonstrates how to perform basic text generation using the AI SDK with Claude 3.7 Sonnet via the Anthropic provider. It shows importing necessary modules and calling `generateText` with a specified model and prompt to get a text response.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/20-sonnet-3-7.mdx#_snippet_0

LANGUAGE: ts
CODE:
```
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

const { text, reasoning, reasoningDetails } = await generateText({
  model: anthropic('claude-3-7-sonnet-20250219'),
  prompt: 'How many people will live in the world in 2040?',
});
console.log(text); // text response
```

----------------------------------------

TITLE: Clone and Initialize AI SDK Slackbot Repository
DESCRIPTION: Clones the AI SDK Slackbot repository from GitHub, navigates into the project directory, and checks out the `starter` branch to begin development with the provided base code.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/03-slackbot.mdx#_snippet_0

LANGUAGE: Shell
CODE:
```
git clone https://github.com/vercel-labs/ai-sdk-slackbot.git
cd ai-sdk-slackbot
git checkout starter
```

----------------------------------------

TITLE: Control Gemini 2.5 Thinking Process with AI SDK
DESCRIPTION: This example shows how to configure the internal thinking capabilities of Gemini 2.5 models using the AI SDK. It sets a `thinkingBudget` and requests `includeThoughts` within `providerOptions` to obtain a reasoning summary alongside the text response, which is useful for complex tasks requiring multi-step planning.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/17-gemini-2-5.mdx#_snippet_1

LANGUAGE: typescript
CODE:
```
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const { text, reasoning } = await generateText({
  model: google('gemini-2.5-flash'),
  prompt: 'What is the sum of the first 10 prime numbers?',
  providerOptions: {
    google: {
      thinkingConfig: {
        thinkingBudget: 8192,
        includeThoughts: true,
      },
    },
  },
});

console.log(text); // text response
console.log(reasoning); // reasoning summary
```

----------------------------------------

TITLE: Start Express.js Development Server
DESCRIPTION: This command initiates the development server for the Express.js application. The server will typically run on a local port, making the API endpoints accessible for testing and development purposes.

SOURCE: https://github.com/vercel/ai/blob/main/examples/express/README.md#_snippet_2

LANGUAGE: sh
CODE:
```
pnpm dev
```

----------------------------------------

TITLE: Generate Structured JSON Data with AI SDK Core
DESCRIPTION: Demonstrates how to use the `generateObject` function from AI SDK Core to produce type-safe JSON data. This example generates a recipe object that strictly conforms to a defined Zod schema, ensuring predictable and structured model outputs.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/24-o3.mdx#_snippet_2

LANGUAGE: TypeScript
CODE:
```
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const { object } = await generateObject({
  model: openai('o3-mini'),
  schema: z.object({
    recipe: z.object({
      name: z.string(),
      ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),
      steps: z.array(z.string()),
    }),
  }),
  prompt: 'Generate a lasagna recipe.',
});
```

----------------------------------------

TITLE: Handle Slack Assistant Thread Started Event
DESCRIPTION: This snippet illustrates the `assistantThreadMessage` function, which is triggered by the `assistant_thread_started` event. It shows how to post a welcome message to a new assistant thread and configure suggested prompts to guide users, leveraging the Slack API client for interaction.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/03-slackbot.mdx#_snippet_4

LANGUAGE: typescript
CODE:
```
import type { AssistantThreadStartedEvent } from '@slack/web-api';
import { client } from './slack-utils';

export async function assistantThreadMessage(
  event: AssistantThreadStartedEvent,
) {
  const { channel_id, thread_ts } = event.assistant_thread;
  console.log(`Thread started: ${channel_id} ${thread_ts}`);
  console.log(JSON.stringify(event));

  await client.chat.postMessage({
    channel: channel_id,
    thread_ts: thread_ts,
    text: "Hello, I'm an AI assistant built with the AI SDK by Vercel!",
  });

  await client.assistant.threads.setSuggestedPrompts({
    channel_id: channel_id,
    thread_ts: thread_ts,
    prompts: [
      {
        title: 'Get the weather',
        message: 'What is the current weather in London?',
      },
      {
        title: 'Get the news',
        message: 'What is the latest Premier League news from the BBC?',
      },
    ],
  });
}
```

----------------------------------------

TITLE: Deploy Nuxt.js AI Chat Example to Vercel
DESCRIPTION: These commands prepare and deploy the Nuxt.js AI chat example to Vercel. The `pnpm run build` command compiles the project for production, and `vercel deploy` initiates the deployment process to Vercel's platform, configured to use the `vercel-edge` Nitro preset for optimal performance.

SOURCE: https://github.com/vercel/ai/blob/main/examples/nuxt-openai/README.md#_snippet_1

LANGUAGE: bash
CODE:
```
pnpm run build
vercel deploy
```

----------------------------------------

TITLE: Use DeepSeek R1 via Groq with AI SDK
DESCRIPTION: This snippet shows how to integrate DeepSeek R1 (specifically `deepseek-r1-distill-llama-70b`) using the Groq provider with the AI SDK. Similar to the Fireworks example, it utilizes `extractReasoningMiddleware` to process and extract reasoning tokens from the model's output, showcasing the AI SDK's flexibility across different LLM providers.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/25-r1.mdx#_snippet_2

LANGUAGE: ts
CODE:
```
import { groq } from '@ai-sdk/groq';
import {
  generateText,
  wrapLanguageModel,
  extractReasoningMiddleware,
} from 'ai';

// middleware to extract reasoning tokens
const enhancedModel = wrapLanguageModel({
  model: groq('deepseek-r1-distill-llama-70b'),
  middleware: extractReasoningMiddleware({ tagName: 'think' }),
});

const { reasoningText, text } = await generateText({
  model: enhancedModel,
  prompt: 'Explain quantum entanglement.',
});
```

----------------------------------------

TITLE: Run AI SDK with Stdio Transport
DESCRIPTION: These commands are for building and running the AI SDK example using the `stdio` transport. `pnpm stdio:build` compiles the necessary components for this transport, and `pnpm stdio:client` runs the client application.

SOURCE: https://github.com/vercel/ai/blob/main/examples/mcp/README.md#_snippet_3

LANGUAGE: sh
CODE:
```
pnpm stdio:build
```

LANGUAGE: sh
CODE:
```
pnpm stdio:client
```

----------------------------------------

TITLE: Implement Chat UI with AI SDK useChat Hook in Next.js
DESCRIPTION: This example shows how to build a client-side chat interface in a Next.js `app/page.tsx` using the `useChat` hook from `@ai-sdk/react`. It manages chat messages, handles user input, and sends messages to the backend API route for AI processing.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/17-gemini-2-5.mdx#_snippet_6

LANGUAGE: TSX
CODE:
```
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(message => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'Gemini: '}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>;
            }
          })}
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
      >
        <input
          className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={e => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
```

----------------------------------------

TITLE: Install Groq provider for AI SDK
DESCRIPTION: Instructions to install the `@ai-sdk/groq` module, which provides the Groq provider for the AI SDK, using the npm package manager.

SOURCE: https://github.com/vercel/ai/blob/main/packages/groq/README.md#_snippet_0

LANGUAGE: bash
CODE:
```
npm i @ai-sdk/groq
```

----------------------------------------

TITLE: Initialize a new Node.js project with pnpm
DESCRIPTION: This command sequence creates a new directory for your application, navigates into it, and initializes a new `package.json` file using pnpm, setting up the basic project structure.

SOURCE: https://github.com/vercel/ai/blob/main/content/docs/02-getting-started/06-nodejs.mdx#_snippet_0

LANGUAGE: bash
CODE:
```
mkdir my-ai-app
cd my-ai-app
pnpm init
```

----------------------------------------

TITLE: Use DeepSeek R1 via Fireworks with AI SDK
DESCRIPTION: This example illustrates how to use the DeepSeek R1 model through the Fireworks provider within the AI SDK. It demonstrates wrapping the language model with `extractReasoningMiddleware` to specifically capture reasoning tokens, which is useful for models like DeepSeek R1 that provide detailed internal thought processes.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/25-r1.mdx#_snippet_1

LANGUAGE: ts
CODE:
```
import { fireworks } from '@ai-sdk/fireworks';
import {
  generateText,
  wrapLanguageModel,
  extractReasoningMiddleware,
} from 'ai';

// middleware to extract reasoning tokens
const enhancedModel = wrapLanguageModel({
  model: fireworks('accounts/fireworks/models/deepseek-r1'),
  middleware: extractReasoningMiddleware({ tagName: 'think' }),
});

const { reasoningText, text } = await generateText({
  model: enhancedModel,
  prompt: 'Explain quantum entanglement.',
});
```

----------------------------------------

TITLE: Generate Structured JSON Data with AI SDK Core and Zod
DESCRIPTION: This snippet demonstrates how to generate structured JSON data using `generateObject` from AI SDK Core. It leverages Zod for schema definition, ensuring type-safe outputs from the model. The example shows generating a recipe object conforming to a predefined schema.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/23-gpt-5.mdx#_snippet_2

LANGUAGE: TypeScript
CODE:
```
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const { object } = await generateObject({
  model: openai('gpt-5'),
  schema: z.object({
    recipe: z.object({
      name: z.string(),
      ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),
      steps: z.array(z.string()),
    }),
  }),
  prompt: 'Generate a lasagna recipe.',
});
```

----------------------------------------

TITLE: Implement Tool Calling with GPT-5 and AI SDK
DESCRIPTION: This snippet illustrates how to use GPT-5's tool calling capabilities with the AI SDK to interact with external systems. It defines a custom `getWeather` tool with a Zod schema for input validation. The example shows how to call this tool and receive `toolResults` from the model's response.

SOURCE: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/23-gpt-5.mdx#_snippet_6

LANGUAGE: TypeScript
CODE:
```
import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const { toolResults } = await generateText({
  model: openai('gpt-5'),
  prompt: 'What is the weather like today in San Francisco?',
  tools: {
    getWeather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
  },
});
```