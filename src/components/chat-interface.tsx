"use client"

import { AssistantRuntimeProvider } from "@assistant-ui/react"
import { useChatRuntime } from "@assistant-ui/react-ai-sdk"
import { Thread } from "@/components/assistant-ui/thread"

export function ChatInterface() {
  const runtime = useChatRuntime()

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex h-full flex-col">
        {/* Chat Header */}
        <div className="border-b border-border bg-muted/50 px-4 py-3">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-lg font-semibold">AI Expense Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Get help with expense tracking, splitting bills, and managing your finances
            </p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 overflow-hidden">
          <div className="mx-auto h-full max-w-7xl">
            <Thread />
          </div>
        </div>
      </div>
    </AssistantRuntimeProvider>
  )
}
