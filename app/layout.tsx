import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Inter } from "next/font/google";
import "./globals.css";
import { SplitMateRuntimeProvider } from "@/app/splitmate-runtime-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SplitMate - AI Expense Chatbot",
  description: "Smart expense splitting and management with AI assistance",
  manifest: "/manifest.json",
  themeColor: "#0EA5A4",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <SplitMateRuntimeProvider>
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {children}
              </div>
            </SplitMateRuntimeProvider>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
