import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { AppHeader } from '@/components/app-header'
import StackProviderClient from '@/components/stack-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://splitmate.app'),
  title: {
    default: 'SplitMate - AI-Powered Expense Splitting',
    template: '%s | SplitMate'
  },
  description: 'Split expenses effortlessly with friends using our AI-powered expense management app. Track, calculate, and settle bills with intelligent insights.',
  keywords: ['expense splitting', 'bill splitting', 'group expenses', 'AI assistant', 'expense tracker', 'money management'],
  authors: [{ name: 'SplitMate Team' }],
  creator: 'SplitMate',
  publisher: 'SplitMate',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://splitmate.app',
    title: 'SplitMate - AI-Powered Expense Splitting',
    description: 'Split expenses effortlessly with friends using our AI-powered expense management app.',
    siteName: 'SplitMate',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SplitMate - AI-Powered Expense Splitting'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SplitMate - AI-Powered Expense Splitting',
    description: 'Split expenses effortlessly with friends using our AI-powered expense management app.',
    images: ['/og-image.png'],
    creator: '@splitmate'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  className={"flex justify-center items-center" + inter.className}>
        <StackProviderClient>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen  bg-transparent ">
              <AppHeader />
              <main className="min-h-[calc(100vh-3.5rem)]">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </StackProviderClient>
      </body>
    </html>
  )
}
