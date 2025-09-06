import { redirect } from 'next/navigation'
export const runtime = 'edge';

export default function HomePage() {
  // Redirect to dashboard as the main app page
  redirect('/dashboard')
}
