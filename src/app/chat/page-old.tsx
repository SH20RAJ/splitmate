import type { Metadata } from 'next'
import { ChatClient } from './chat-client'

export const metadata: Metadata = {
  title: 'AI Chat',
  description: 'Chat with SplitMate AI to manage expenses, split bills, and get financial insights.',
}

export default function ChatPage() {
  return <ChatClient />
}
