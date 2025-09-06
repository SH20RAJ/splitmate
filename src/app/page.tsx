import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirect to about page as the main landing
  redirect('/about')
}
