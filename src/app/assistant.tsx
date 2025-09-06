"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { ThreadList } from "@/components/assistant-ui/thread-list";
import { useMemo } from "react";
import {
  SplitExpenseToolUI,
  AddExpenseToolUI,
  AnalyzeExpensesToolUI,
  SearchExpensesToolUI,
  CategorizeExpenseToolUI,
  CheckBudgetToolUI,
  GetTopExpensesToolUI
} from "@/components/tools/expense-tools-ui";

export const Assistant = () => {
  const runtime = useChatRuntime();

  const memoizedRuntime = useMemo(() => runtime, [runtime]);

  if (!memoizedRuntime) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Initializing AI Assistant...</p>
        </div>
      </div>
    );
  }

  return (
    <AssistantRuntimeProvider runtime={memoizedRuntime}>
      <SplitExpenseToolUI />
      <AddExpenseToolUI />
      <AnalyzeExpensesToolUI />
      <SearchExpensesToolUI />
      <CategorizeExpenseToolUI />
      <CheckBudgetToolUI />
      <GetTopExpensesToolUI />
      <div className=" px-4 py-4">
        {/* <ThreadList /> */}
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};
