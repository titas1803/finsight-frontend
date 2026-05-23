import React from "react";
import { TransactionType } from "@/constants/enums";
import { RoutePaths } from "@/constants/routes";
import { cn } from "@/utils/cn";
import { capitalize, formatShortDate } from "@/utils/format";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { OverviewSkeleton } from "./OverviewSkeleton";
import { CATEGORY_COLORS } from ".";
import { useRecentTransactions } from "@/hooks/overviewHooks";

export const OverviewRecentTransactions: React.FC = React.memo(() => {
  const { data: recentTxns, isLoading: recentLoading } =
    useRecentTransactions();

  const recentSlice = recentTxns?.transactions.slice(0, 6) ?? [];

  return (
    <div className="lg:col-span-3 bg-surface border border-border rounded-xl">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">
            Recent Transactions
          </h2>
          <p className="text-xs text-text-muted mt-0.5">Last 30 days</p>
        </div>
        <Link
          to={RoutePaths.TRANSACTIONS}
          className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight size={12} />
        </Link>
      </div>

      <div className="divide-y divide-border">
        {recentLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-5 py-3.5 flex items-center gap-3">
              <OverviewSkeleton className="w-9 h-9 rounded-lg" />
              <div className="flex-1 space-y-1.5">
                <OverviewSkeleton className="h-3 w-36" />
                <OverviewSkeleton className="h-2.5 w-20" />
              </div>
              <OverviewSkeleton className="h-4 w-16" />
            </div>
          ))
        ) : recentSlice.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-text-muted">
            No transactions yet.{" "}
            <Link
              to={RoutePaths.TRANSACTIONS}
              className="text-primary hover:underline"
            >
              Add one
            </Link>
          </div>
        ) : (
          recentSlice.map((txn) => {
            const isIncome = txn.type === TransactionType.INCOME;
            const isInvestment = txn.type === TransactionType.INVESTMENT;
            const color = CATEGORY_COLORS[txn.category] ?? "#64748B";
            return (
              <div
                key={txn.id}
                className="px-5 py-3.5 flex items-center gap-3 hover:bg-white/2 transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ background: `${color}18`, color }}
                >
                  {capitalize(txn.category)[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary font-medium truncate">
                    {txn.description}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {capitalize(txn.category)} · {formatShortDate(txn.date)}
                  </p>
                </div>
                <span
                  className={cn(
                    "text-sm font-semibold shrink-0",
                    isIncome
                      ? "text-income"
                      : isInvestment
                        ? "text-investment"
                        : "text-expense",
                  )}
                >
                  {isIncome ? "+" : "-"}
                  {txn.amount}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});
