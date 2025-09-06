import type { Metadata } from 'next'
import { Assistant } from "@/app/assistant"; // Import the Assistant component

export const metadata: Metadata = {
  title: 'AI Assistant - SplitMate',
  description: 'Chat with your AI financial assistant.',
}
export const runtime = 'edge';

export default function ChatPage() {
  return (
    <Assistant />
  )
}
