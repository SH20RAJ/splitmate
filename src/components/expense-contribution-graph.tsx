"use client";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
} from "@/components/ui/kibo-ui/contribution-graph";
import { eachDayOfInterval, endOfYear, formatISO, startOfYear } from "date-fns";
import { cn } from "@/lib/utils";

const maxCount = 20;
const maxLevel = 4;
const now = new Date();
const days = eachDayOfInterval({
  start: startOfYear(now),
  end: endOfYear(now),
});

// Generate expense data for the year (red color scheme for expenses)
const data = days.map((date) => {
  const c = Math.round(
    Math.random() * maxCount - Math.random() * (0.8 * maxCount)
  );
  const count = Math.max(0, c);
  const level = Math.ceil((count / maxCount) * maxLevel);

  return {
    date: formatISO(date, { representation: "date" }),
    count,
    level,
  };
});

export const ExpenseContributionGraph = () => (
  <div className="w-full">
    <div className="mb-4">
      <h3 className="text-lg font-semibold">Expense Activity</h3>
      <p className="text-sm text-muted-foreground">Your spending patterns over the year</p>
    </div>
    <ContributionGraph data={data}>
      <ContributionGraphCalendar>
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            className={cn(
              // Red color scheme for expenses (darker = more expenses)
              'data-[level="0"]:fill-[#fecaca] dark:data-[level="0"]:fill-[#1f1f1f]',
              'data-[level="1"]:fill-[#fca5a5] dark:data-[level="1"]:fill-[#4c1d1d]',
              'data-[level="2"]:fill-[#f87171] dark:data-[level="2"]:fill-[#7f1d1d]',
              'data-[level="3"]:fill-[#ef4444] dark:data-[level="3"]:fill-[#b91c1c]',
              'data-[level="4"]:fill-[#dc2626] dark:data-[level="4"]:fill-[#dc2626]'
            )}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
          />
        )}
      </ContributionGraphCalendar>
      <ContributionGraphFooter />
    </ContributionGraph>
  </div>
);

export default ExpenseContributionGraph;
