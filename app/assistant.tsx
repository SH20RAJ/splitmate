"use client";

import { SplitMateThread } from "@/components/assistant-ui/splitmate-thread";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

export const Assistant = () => {
  return (
    <SidebarProvider>
      <div className="flex h-dvh w-full pr-0.5">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <div className="bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">₹</span>
              </div>
              <h1 className="text-lg font-semibold">SplitMate</h1>
            </div>
          </header>
          <div className="flex-1 overflow-hidden">
            <SplitMateThread />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
