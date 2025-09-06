Absolutely! I’ve gathered the official documentation for **assistant-ui**—especially the "Getting Started" and relevant feature guides—to help you create a comprehensive **setup guide** for integrating everything into your project. Here's a breakdown you can adapt to make a long-form document:

---

## 1.  Getting Started: Installation & Setup

### A. **Initialize a New Project or Add to Existing One**

From the docs:

* To create from scratch:

  ```bash
  npx assistant-ui@latest create
  ```
* To integrate into your existing React project:

  ```bash
  npx assistant-ui@latest init
  ```

  ([Assistant UI][1], [GitHub][2])

### B. **Manual Installation (Optional)**

If you prefer manual control:

1. Add UI packages:

   ```bash
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
2. Copy component templates like `components/ui/button.tsx` into your project.
   ([Assistant UI][1])

### C. **Environment Variables**

Create a `.env` file and include necessary keys:

```env
OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
# Optional for chat history persistence:
NEXT_PUBLIC_ASSISTANT_BASE_URL="https://..."
```

([Assistant UI][1])

### D. **Start the App**

```bash
npm run dev
```

([Assistant UI][1])

---

## 2.  Integrate Into Your Application

Wrap your app to provide the assistant runtime:

```tsx
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";

const runtime = useChatRuntime({
  api: "/api/chat",
});

<AssistantRuntimeProvider runtime={runtime}>
  {/* Your components go here */}
</AssistantRuntimeProvider>;
```

Then you can use components like `ThreadList` and `Thread` built-in, or others such as `AssistantModal` for modal-style chat.
([Assistant UI][1])

---

## 3.  Optional Features: What’s Next?

Per the docs, after basic setup you can explore:

* **Choosing a Runtime**, whether it's AI SDK, LangGraph, or a custom backend
* **Generative UI**: mapping tool outputs to custom components
* **Chat Persistence**: saving and restoring conversations
* **Offline examples and demos** for reference
  ([Assistant UI][1])

---

## 4.  Enable Rich Features Step by Step

### A. **Attachments Support**

To add file attachments (images, docs, etc.):

1. Run:

   ```bash
   npx shadcn@latest add "https://r.assistant-ui.com/attachment"
   ```

   This adds components like `attachment.tsx` to your project.
   ([Assistant UI][3])

2. In your composer UI:

   ```tsx
   import {
     ComposerAttachments,
     ComposerAddAttachment,
   } from "@/components/assistant-ui/attachment";

   // inside your Composer component
   <ComposerPrimitive.Root>
     <ComposerAttachments />
     <ComposerAddAttachment />
     <ComposerPrimitive.Input placeholder="Type a message..." />
   </ComposerPrimitive.Root>
   ```

3. For rendering in messages:

   ```tsx
   import { UserMessageAttachments } from "@/components/assistant-ui/attachment";

   <MessagePrimitive.Root>
     <UserMessageAttachments />
     {/* Message Parts */}
   </MessagePrimitive.Root>
   ```

   ([Assistant UI][3])

You can use default adapters like `SimpleImageAttachmentAdapter` or build your own for vision-capable models.
([Assistant UI][3])

### B. **System Instructions Hook**

Use the `useAssistantInstructions` hook to inject system-level prompts or context:

```tsx
useAssistantInstructions({
  instruction: "You are an expense assistant that helps track group balances.",
  disabled: false,
});
```

It auto registers instructions and cleans up on component unmount.
([Assistant UI][4])

### C. **Custom Tool and UI Hooks**

Within assistant runtime, you can register tools or custom UI components:

* `useAssistantRuntime` gives programmatic access to runtime state.
* Other utility hooks include:

  * `makeAssistantTool`, `makeAssistantToolUI`
  * `useAssistantTool`, `useAssistantToolUI`
  * `useToolUIs`, `useToolUIsStore`
    ([Assistant UI][5])

### D. **Contextual Primitives & UI Building Blocks**

Assistant-UI provides many composable primitives to build chat structure:

* `ThreadListPrimitive`, `ThreadPrimitive`, `ComposerPrimitive`, `MessagePrimitive`, etc.
* Each of these tags like `<MessagePrimitive.Parts />`, `<ActionBarPrimitive.Copy />`, `<BranchPickerPrimitive.Root />` help you customize deeply.
  ([Assistant UI][5])

---

## 5.  Developer Experience Tooling

### MCP Docs Server for In-IDE Documentation

If you’re using an LLM-enabled IDE like Claude Code, VSCode, etc., you can install the MCP server to access docs within your editor:

```bash
npx -y @assistant-ui/mcp-docs-server
```

Then configure your IDE’s `.mcp.json`. It adds tools like `assistantUIDocs` and `assistantUIExamples`.
([Assistant UI][6])

*Note: There are compatibility issues with the official package as of mid-2025; a community-maintained fix is available for smoother integration.*
([LobeHub][7])

---

## 6.  Advanced Integrations (Optional)

Depending on your backend architecture, you may choose one of these:

### A. **LangGraph Cloud Integration**

* Create a new project with:

  ```bash
  npx assistant-ui@latest create -t langgraph my-app
  ```
* Configure `.env.local`:

  ```env
  NEXT_PUBLIC_LANGGRAPH_API_URL=your_api_url
  NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID=your_graph_id
  ```
* For existing React apps:

  ```bash
  npm install @assistant-ui/react @assistant-ui/react-ui @assistant-ui/react-langgraph @langchain/langgraph-sdk
  ```

Followed by a proxy endpoint to LangGraph in your Next.js API route.
([Assistant UI][8])

### B. **Mastra Agent Integration**

* Run a standalone Mastra server (e.g., for a `weather-agent`).
* Create your assistant-ui frontend:

  ```bash
  npx assistant-ui@latest create
  ```
* Update your front end’s `useChatRuntime` to point to the Mastra agent’s stream endpoint:

  ```ts
  const runtime = useChatRuntime({
    api: "http://localhost:4111/api/agents/weatherAgent/stream",
  });
  ```
* Run both servers and start building!
  ([Mastra][9])

---

## 7.  Summary Outline for a Long-Form Document

Here’s how you could structure your full documentation:

1. **Introduction**
   What is assistant-ui? Why it fits your project (e.g., Splitmate).

2. **Project Setup**

   * Installation (CLI and Manual)
   * Environment Configuration
   * App Initialization

3. **Core Components & Primitives**

   * Runtime Provider, Composer, Threads, Messages

4. **Advanced Features**

   * Attachments
   * System Instructions
   * Custom Tools & UI

5. **Editor Tooling**

   * MCP Docs Server Setup for dev experience

6. **Backend Integrations**

   * LangGraph
   * Mastra
   * Custom Backend

7. **Customization & Theming**

   * How to style and tweak UI components

8. **Deployment & Persistence**

   * Assistant Cloud, Chat History, Analytics

9. **Examples & Use Cases**

   * Expense tracking (Splitmate scenario)

7. **UI Components**
  
  * [Pill Component Usage Guide](./pill-component.md) - Enhanced badge components with indicators, deltas, and avatars

 ---

Let me know if you'd like help formatting this into a polished document, adding diagrams, or expanding any section into code examples!

[1]: https://www.assistant-ui.com/docs?utm_source=chatgpt.com "Getting Started | assistant-ui"
[2]: https://github.com/assistant-ui/assistant-ui?utm_source=chatgpt.com "assistant-ui/assistant-ui: Typescript/React Library for AI Chat - GitHub"
[3]: https://www.assistant-ui.com/docs/guides/Attachments?utm_source=chatgpt.com "Attachments | assistant-ui"
[4]: https://www.assistant-ui.com/docs/copilots/use-assistant-instructions?utm_source=chatgpt.com "useAssistantInstructions - assistant-ui"
[5]: https://www.assistant-ui.com/docs/api-reference/overview?utm_source=chatgpt.com "Overview | assistant-ui"
[6]: https://www.assistant-ui.com/docs/mcp-docs-server?utm_source=chatgpt.com "MCP Docs Server | assistant-ui"
[7]: https://lobehub.com/mcp/leewinn1-assistant-ui-mcp-fix?utm_source=chatgpt.com "Assistant-UI MCP Docs Server - LobeHub"
[8]: https://www.assistant-ui.com/docs/runtimes/langgraph?utm_source=chatgpt.com "Getting Started - assistant-ui"
[9]: https://mastra.ai/docs/frameworks/agentic-uis/assistant-ui?utm_source=chatgpt.com "Using with Assistant UI - Mastra"