"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon, X, Maximize, Minimize } from "lucide-react";
import Image from "next/image";

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setIsFullScreen(false);
    } else {
      setIsOpen(false);
      setIsMinimized(false);
      setIsFullScreen(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
            onClick={toggleChat}
          >
            <MessageSquareIcon className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Small Chat Window */}
      {isOpen && !isMinimized && !isFullScreen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 flex flex-col border rounded-lg shadow-xl bg-background">
          {/* Chat Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image 
                  src="/logo.png" 
                  alt="SplitMate Logo" 
                  width={20} 
                  height={20}
                  className="object-contain"
                />
                <h1 className="text-sm font-semibold">AI Expense Assistant</h1>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullScreen}
                  className="h-6 w-6"
                >
                  <Maximize className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChat}
                  className="h-6 w-6"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-hidden">
            <iframe
              src="/chat"
              className="w-full h-full border-0"
              title="AI Chat Assistant"
            />
          </div>
        </div>
      )}

      {/* Minimized Chat Window */}
      {isOpen && isMinimized && (
        <div className="fixed bottom-6 right-6 z-50 w-64 flex items-center gap-2 border rounded-lg shadow-lg bg-background p-2">
          <div className="flex items-center gap-2 flex-1">
            <Image 
              src="/logo.png" 
              alt="SplitMate Logo" 
              width={16} 
              height={16}
              className="object-contain"
            />
            <span className="text-sm font-medium truncate">AI Assistant</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMinimize}
              className="h-6 w-6"
            >
              <Minimize className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="h-6 w-6"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      )}

      {/* Full Screen Chat Modal */}
      {isOpen && isFullScreen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col">
          {/* Chat Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold">AI Expense Assistant</h1>
                <p className="text-sm text-muted-foreground">Ask me anything about expenses</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullScreen}
                  className="h-8 w-8"
                >
                  <Minimize className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChat}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 h-full">
            <iframe
              src="/chat"
              className="w-full h-full border-0"
              title="AI Chat Assistant"
            />
          </div>
        </div>
      )}
    </>
  );
}
