import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  ErrorPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
 CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  Square,
} from "lucide-react";
import type { FC } from "react";
import { memo, useState } from "react";

import {
  ComposerAddAttachment,
  ComposerAttachments,
  UserMessageAttachments,
} from "@/components/assistant-ui/attachment";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import { ToolFallback } from "@/components/assistant-ui/tool-fallback";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import * as m from "motion/react-m";
import { ExpenseSplitToolUI } from "@/components/tool-ui/expense-split-tool";
import { ExpenseAnalyticsToolUI } from "@/components/tool-ui/expense-analytics-ui";
import {
  ExpenseParserTool,
  CategorizationTool,
  BudgetAlertTool,
  InsightsGeneratorTool,
  SettlementTool,
  ExpenseSearchTool,
} from "@/components/tools/conversational-tools";

export const Thread: FC = () => {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <ThreadPrimitive.Root
          className="aui-root * border-border outline-ring/50 aui-thread-root @container flex h-full flex-col bg-background"
          style={{
            ["--thread-max-width" as string]: "44rem",
          }}
        >
          <ThreadPrimitive.Viewport className="aui-thread-viewport relative flex flex-1 flex-col overflow-x-auto overflow-y-scroll px-4">
            <ThreadWelcome />

            <ThreadPrimitive.Messages
              components={{
                UserMessage,
                EditComposer,
                AssistantMessage,
              }}
            />
            <div className="aui-thread-viewport-spacer min-h-8 grow" />
            <Composer />
          </ThreadPrimitive.Viewport>
        </ThreadPrimitive.Root>
      </MotionConfig>
    </LazyMotion>
  );
};

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        className="aui-thread-scroll-to-bottom absolute -top-12 z-10 self-center rounded-full p-4 disabled:invisible dark:bg-background dark:hover:bg-accent"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const ThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      <div className="aui-thread-welcome-root mx-auto mb-16 flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col">
        <div className="aui-thread-welcome-center flex w-full flex-grow flex-col items-center justify-center">
          <div className="aui-thread-welcome-message flex size-full flex-col justify-center px-8 md:mt-20">
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="aui-thread-welcome-message-motion-1 text-2xl font-semibold"
            >
              Welcome to SplitMate AI!
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1 }}
              className="aui-thread-welcome-message-motion-2 text-2xl text-muted-foreground/65"
            >
              I&apos;ll help you split expenses and manage group bills effortlessly.
            </m.div>
          </div>
        </div>
      </div>
    </ThreadPrimitive.Empty>
  );
};

const ThreadWelcomeSuggestions: FC = () => {
  const allSuggestions = [
    {
      title: "Split a dinner bill",
      label: "of ₹1200 with 4 friends",
      action: "I paid ₹1200 for dinner at Domino's with 3 friends yesterday. How much does each person owe me? Can you help me track who has paid and send payment reminders?",
    },
    {
      title: "Add a group expense",
      label: "for our trip to Goa",
      action: "Help me add a group expense of ₹5000 for hotel booking for our 3-day Goa trip with 6 friends. Split it equally and track individual contributions.",
    },
    {
      title: "Track monthly expenses",
      label: "and analyze spending patterns",
      action: "Show me my spending analysis for this month. Break it down by categories like food, transportation, entertainment, and groceries. Highlight where I'm spending the most.",
    },
    {
      title: "Settle group balances",
      label: "with friends efficiently",
      action: "I owe different amounts to different friends from various shared expenses. Help me calculate the optimal way to settle all balances with minimum transactions.",
    },
    {
      title: "Create expense budget",
      label: "for next month",
      action: "Help me create a monthly budget based on my past spending. Set limits for dining out (₹3000), groceries (₹2000), and entertainment (₹1500). Send alerts when I'm close to limits.",
    },
    {
      title: "Import restaurant bill",
      label: "from UPI payment screenshot",
      action: "I have a screenshot of my Google Pay payment for ₹850 at Starbucks with 2 friends. Can you extract the details and help me split this bill equally?",
    },
    {
      title: "Plan trip expenses",
      label: "for upcoming vacation",
      action: "We're planning a 4-day trip to Manali with 5 friends. Help me create expense categories (accommodation, food, activities, transport) and set a budget of ₹8000 per person.",
    },
    {
      title: "Roommate bill splitting",
      label: "for monthly utilities",
      action: "I paid the electricity bill (₹1800), internet (₹600), and grocery bill (₹2400) for our shared apartment. Help me split these with my 2 roommates (Asra, Rehan) and track payments.",
    },
    {
      title: "Track lending money",
      label: "to friends and family",
      action: "I lent ₹2000 to my friend Rahul last week and ₹1500 to my sister this month. Help me keep track of these personal loans and set payment reminders.",
    },
    {
      title: "Analyze group spending",
      label: "for office lunch expenses",
      action: "Our office team of 8 people regularly orders lunch together. Show me our spending pattern over the last 3 months and suggest ways to optimize costs.",
    },
    {
      title: "Split shopping bills",
      label: "from grocery store",
      action: "I bought groceries worth ₹3200 from BigBasket. Some items are shared (₹2000) and some are personal (₹1200). Help me split only the shared items with my roommates.",
    },
    {
      title: "Manage wedding expenses",
      label: "with family members",
      action: "We're organizing my cousin's wedding with a budget of ₹5 lakhs. Help me track expenses across different categories (venue, catering, decorations, photography) and split costs among family members.",
    }
  ];

  // Randomly select 4 suggestions each time the component renders
  const getRandomSuggestions = () => {
    const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const [randomSuggestions] = useState(() => getRandomSuggestions());

  return (
    <div className="space-y-4">
      {/* Telegram Bot Button */}
      <div className="flex justify-center">
        <a
          href="https://t.me/splitmate2_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 8.16c-.416 1.896-2.208 8.944-3.12 11.872-.384 1.248-1.44 1.464-2.32.912L8.928 18.48l-1.248-2.16 4.896-3.072c.672-.432.432-1.104-.336-.672l-6.048 3.744-2.16-.816c-.48-.144-.48-.48.096-.72l10.08-3.936c.432-.144.816.096.672.552z"/>
          </svg>
          Chat on Telegram Bot
        </a>
      </div>

      <div className="aui-thread-welcome-suggestions grid w-full gap-2 @md:grid-cols-2">
        {randomSuggestions.map((suggestedAction, index) => (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className="aui-thread-welcome-suggestion-display [&:nth-child(n+3)]:hidden @md:[&:nth-child(n+3)]:block"
        >
          <ThreadPrimitive.Suggestion
            prompt={suggestedAction.action}
            method="replace"
            autoSend
            asChild
          >
            <Button
              variant="ghost"
              className="aui-thread-welcome-suggestion h-auto w-full flex-1 flex-wrap items-start justify-start gap-1 rounded-3xl border px-5 py-4 text-left text-sm @md:flex-col dark:hover:bg-accent/60"
              aria-label={suggestedAction.action}
            >
              <span className="aui-thread-welcome-suggestion-text-1 font-medium">
                {suggestedAction.title}
              </span>
              <span className="aui-thread-welcome-suggestion-text-2 text-muted-foreground">
                {suggestedAction.label}
              </span>
            </Button>
          </ThreadPrimitive.Suggestion>
        </m.div>
      ))}
      </div>
    </div>
  );
};

const Composer: FC = () => {
  return (
    <div className="aui-composer-wrapper sticky bottom-0 mx-auto flex w-full max-w-[var(--thread-max-width)] flex-col gap-4 overflow-visible rounded-t-3xl bg-background pb-4 md:pb-6">
      <ThreadScrollToBottom />
      <ThreadPrimitive.Empty>
        <ThreadWelcomeSuggestions />
      </ThreadPrimitive.Empty>
      <ComposerPrimitive.Root className="aui-composer-root relative flex w-full flex-col rounded-3xl border border-border bg-muted px-1 pt-2 shadow-[0_9px_9px_0px_rgba(0,0,0,0.01),0_2px_5px_0px_rgba(0,0,0,0.06)] dark:border-muted-foreground/15">
        <ComposerAttachments />
        <ComposerPrimitive.Input
          placeholder="Send a message..."
          className="aui-composer-input mb-1 max-h-32 min-h-16 w-full resize-none bg-transparent px-3.5 pt-1.5 pb-3 text-base outline-none placeholder:text-muted-foreground focus:outline-primary"
          rows={1}
          autoFocus
          aria-label="Message input"
        />
        <ComposerAction />
      </ComposerPrimitive.Root>
    </div>
  );
};

const ComposerAction: FC = () => {
  return (
    <div className="aui-composer-action-wrapper relative mx-1 mt-2 mb-2 flex items-center justify-between">
      <ComposerAddAttachment />

      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <TooltipIconButton
            tooltip="Send message"
            side="bottom"
            type="submit"
            variant="default"
            size="icon"
            className="aui-composer-send size-[34px] rounded-full p-1"
            aria-label="Send message"
          >
            <ArrowUpIcon className="aui-composer-send-icon size-5" />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>

      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <Button
            type="button"
            variant="default"
            size="icon"
            className="aui-composer-cancel size-[34px] rounded-full border border-muted-foreground/60 hover:bg-primary/75 dark:border-muted-foreground/90"
            aria-label="Stop generating"
          >
            <Square className="aui-composer-cancel-icon size-3.5 fill-white dark:fill-black" />
          </Button>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </div>
  );
};

const MessageError: FC = () => {
  return (
    <MessagePrimitive.Error>
      <ErrorPrimitive.Root className="aui-message-error-root mt-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive dark:bg-destructive/5 dark:text-red-200">
        <ErrorPrimitive.Message className="aui-message-error-message line-clamp-2" />
      </ErrorPrimitive.Root>
    </MessagePrimitive.Error>
  );
};

const AssistantMessage: FC = memo(() => {
  return (
    <MessagePrimitive.Root asChild>
      <m.div
        className="aui-assistant-message-root relative mx-auto w-full max-w-[var(--thread-max-width)] py-4 last:mb-24"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role="assistant"
      >
        <div className="aui-assistant-message-content mx-2 leading-7 break-words text-foreground">
          <MessagePrimitive.Parts
            components={{
              Text: MarkdownText,
              tools: { 
                by_name: {
                  splitExpense: ExpenseSplitToolUI,
                  analyzeExpenses: ExpenseAnalyticsToolUI,
                  parseExpense: ExpenseParserTool,
                  categorizeExpense: CategorizationTool,
                  checkBudget: BudgetAlertTool,
                  generateInsights: InsightsGeneratorTool,
                  calculateSettlement: SettlementTool,
                  searchExpenses: ExpenseSearchTool,
                },
                Fallback: ToolFallback 
              },
            }}
          />
          <MessageError />
        </div>

        <div className="aui-assistant-message-footer mt-2 ml-2 flex">
          <BranchPicker />
          <AssistantActionBar />
        </div>
      </m.div>
    </MessagePrimitive.Root>
  );
});

// Add display name for React DevTools
AssistantMessage.displayName = 'AssistantMessage';

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      autohideFloat="single-branch"
      className="aui-assistant-action-bar-root col-start-3 row-start-2 -ml-1 flex gap-1 text-muted-foreground data-floating:absolute data-floating:rounded-md data-floating:border data-floating:bg-background data-floating:p-1 data-floating:shadow-sm"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip="Copy">
          <MessagePrimitive.If copied>
            <CheckIcon />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip="Refresh">
          <RefreshCwIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  );
};

const UserMessage: FC = memo(() => {
  return (
    <MessagePrimitive.Root asChild>
      <m.div
        className="aui-user-message-root mx-auto grid w-full max-w-[var(--thread-max-width)] auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-2 px-2 py-4 first:mt-3 last:mb-5 [&:where(>*)]:col-start-2"
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role="user"
      >
        <UserMessageAttachments />

        <div className="aui-user-message-content-wrapper relative col-start-2 min-w-0">
          <div className="aui-user-message-content rounded-3xl bg-muted px-5 py-2.5 break-words text-foreground">
            <MessagePrimitive.Parts />
          </div>
          <div className="aui-user-action-bar-wrapper absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 pr-2">
            <UserActionBar />
          </div>
        </div>

        <BranchPicker className="aui-user-branch-picker col-span-full col-start-1 row-start-3 -mr-1 justify-end" />
      </m.div>
    </MessagePrimitive.Root>
  );
});

// Add display name for React DevTools
UserMessage.displayName = 'UserMessage';

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="aui-user-action-bar-root flex flex-col items-end"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton tooltip="Edit" className="aui-user-action-edit p-4">
          <PencilIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};

const EditComposer: FC = memo(() => {
  return (
    <div className="aui-edit-composer-wrapper mx-auto flex w-full max-w-[var(--thread-max-width)] flex-col gap-4 px-2 first:mt-4">
      <ComposerPrimitive.Root className="aui-edit-composer-root ml-auto flex w-full max-w-7/8 flex-col rounded-xl bg-muted">
        <ComposerPrimitive.Input
          className="aui-edit-composer-input flex min-h-[60px] w-full resize-none bg-transparent p-4 text-foreground outline-none"
          autoFocus
        />

        <div className="aui-edit-composer-footer mx-3 mb-3 flex items-center justify-center gap-2 self-end">
          <ComposerPrimitive.Cancel asChild>
            <Button variant="ghost" size="sm" aria-label="Cancel edit">
              Cancel
            </Button>
          </ComposerPrimitive.Cancel>
          <ComposerPrimitive.Send asChild>
            <Button size="sm" aria-label="Update message">
              Update
            </Button>
          </ComposerPrimitive.Send>
        </div>
      </ComposerPrimitive.Root>
    </div>
  );
});

// Add display name for React DevTools
EditComposer.displayName = 'EditComposer';

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn("aui-branch-picker-root mr-2 -ml-2 inline-flex items-center text-xs text-muted-foreground", className)}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip="Previous">
          <ChevronLeftIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className="aui-branch-picker-state font-medium">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip="Next">
          <ChevronRightIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};