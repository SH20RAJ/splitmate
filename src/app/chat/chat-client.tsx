"use client"

import { AssistantRuntimeProvider } from "@assistant-ui/react"
import { useChatRuntime } from "@assistant-ui/react-ai-sdk"
import { AppHeader } from '@/components/app-header'
import { ChatInterface } from '@/components/chat-interface'

export function ChatClient() {
  const runtime = useChatRuntime()

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex h-screen flex-col bg-background">
        <AppHeader />
        <main className="flex-1">
          <ChatInterface />
        </main>
      </div>
    </AssistantRuntimeProvider>
  )
}
