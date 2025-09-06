"use client";

import { useState } from "react";
import { Assistant } from "./assistant";
import { Dashboard } from "@/components/dashboard";
import { SplitMateHeader } from "@/components/header";

// Mock user data - in real app this would come from StackAuth
const mockUser = {
  name: "Shaswat Raj",
  email: "shaswat@splitmate.com",
  avatar: "",
  notifications: 3
};

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'chat'>('dashboard');
  // Start with user logged in for demo - change to null for auth flow
  const [user, setUser] = useState<typeof mockUser | null>(mockUser);

  const handleSignIn = () => {
    // This would integrate with StackAuth
    setUser(mockUser);
  };

  const handleSignOut = () => {
    // This would integrate with StackAuth
    setUser(null);
  };

  const handleToggleChat = () => {
    setCurrentView(currentView === 'dashboard' ? 'chat' : 'dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SplitMateHeader
        user={user || undefined}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onToggleChat={handleToggleChat}
        currentView={currentView}
      />
      
      <main className="h-[calc(100vh-80px)]">
        {!user ? (
          <div className="h-full">
            <Assistant user={undefined} />
          </div>
        ) : currentView === 'dashboard' ? (
          <div className="container mx-auto px-4 py-6 overflow-y-auto h-full">
            <Dashboard />
          </div>
        ) : (
          <div className="h-full">
            <Assistant user={user} />
          </div>
        )}
      </main>
    </div>
  );
}
