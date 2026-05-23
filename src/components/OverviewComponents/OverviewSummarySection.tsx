import { TrendingUp, TrendingDown, Landmark, Wallet } from "lucide-react";
import { OverviewSummaryCard } from "./OverviewSummaryCard";
import { useSummary } from "@/hooks/overviewHooks";
import React from "react";

export const OverviewSummarySection: React.FC = React.memo(() => {
  const { data: summary, isLoading: summaryLoading } = useSummary();

  const netBalance = (summary?.totalIncome ?? 0) - (summary?.totalExpense ?? 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <OverviewSummaryCard
        label="Total Income"
        value={summary?.totalIncome ?? 0}
        icon={TrendingUp}
        color="bg-income/10 text-income"
        isLoading={summaryLoading}
      />
      <OverviewSummaryCard
        label="Total Expenses"
        value={summary?.totalExpense ?? 0}
        icon={TrendingDown}
        color="bg-expense/10 text-expense"
        isLoading={summaryLoading}
      />
      <OverviewSummaryCard
        label="Investments"
        value={summary?.totalInvestment ?? 0}
        icon={Landmark}
        color="bg-investment/10 text-investment"
        isLoading={summaryLoading}
      />
      <OverviewSummaryCard
        label="Net Balance"
        value={netBalance}
        icon={Wallet}
        color={
          netBalance >= 0
            ? "bg-income/10 text-income"
            : "bg-expense/10 text-expense"
        }
        textColor={netBalance >= 0 ? "text-income" : "text-expense"}
        isLoading={summaryLoading}
        footnote="Income minus expenses"
      />
    </div>
  );
});
