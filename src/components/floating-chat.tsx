"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon, X } from "lucide-react";

export function FloatingChatButton() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
          onClick={toggleFullScreen}
        >
          <MessageSquareIcon className="h-6 w-6" />
        </Button>
      </div>

      {/* Full Screen Chat Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-background">
          {/* Chat Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold">AI Expense Assistant</h1>
                <p className="text-sm text-muted-foreground">Ask me anything about expenses</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullScreen}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
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
