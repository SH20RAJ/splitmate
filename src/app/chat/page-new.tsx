import type { Metadata } from 'next'
import { ChatInterface } from '@/components/chat-interface'

export const metadata: Metadata = {
  title: 'AI Chat',
  description: 'Chat with your AI expense assistant to get help with splitting bills and managing expenses.',
}

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <ChatInterface />
    </div>
  )
}
