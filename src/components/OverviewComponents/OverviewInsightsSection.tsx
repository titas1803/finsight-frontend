import React, { useState } from "react";
import { RoutePaths } from "@/constants/routes";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/format";
import { Sparkles, RefreshCw, ChevronRight } from "lucide-react";
import { marked } from "marked";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { OverviewSkeleton } from "./OverviewSkeleton";
import { usePeriodicInsight } from "@/hooks/insightHooks";
import type { InsightPeriod } from "@/types/insight.types";

export const OveriewInsightsSection: React.FC = React.memo(() => {
  const [insightPeriod, setInsightPeriod] = useState<InsightPeriod>("week");

  const {
    data: insights,
    isLoading: insightsLoading,
    refetch: refetchInsights,
  } = usePeriodicInsight(insightPeriod);

  return (
    <div className="lg:col-span-2 bg-surface border border-border rounded-xl flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between px-5 py-4 border-b border-border max-lg:gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary/20 flex items-center justify-center">
            <Sparkles size={13} className="text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-text-primary">
              AI Insights
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Period toggle */}
          <div className="flex bg-background rounded-lg p-0.5 gap-0.5">
            {(["week", "month", "year"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setInsightPeriod(p)}
                className={cn(
                  "text-xs px-3.5 lg:px-2 py-1 rounded-md transition-all font-medium capitalize",
                  insightPeriod === p
                    ? "bg-primary text-white"
                    : "text-text-muted hover:text-text-primary",
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => refetchInsights()}
            disabled={insightsLoading}
            className="text-text-muted hover:text-text-primary transition-colors disabled:opacity-40"
            title="Refresh insights"
          >
            <RefreshCw
              size={14}
              className={cn(insightsLoading && "animate-spin")}
            />
          </button>
        </div>
      </div>

      <div className="flex-1 px-5 py-4 overflow-y-auto">
        {insightsLoading ? (
          <div className="space-y-3">
            <OverviewSkeleton className="h-3 w-full" />
            <OverviewSkeleton className="h-3 w-5/6" />
            <OverviewSkeleton className="h-3 w-4/6" />
            <OverviewSkeleton className="h-3 w-full mt-4" />
            <OverviewSkeleton className="h-3 w-3/4" />
          </div>
        ) : insights?.insight ? (
          <div className="space-y-4">
            <div className="text-sm text-text-primary leading-relaxed whitespace-pre-line">
              {parse(marked.parse(insights.insight) as string)}
            </div>
            {insights.stats && (
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Quick Stats
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      label: "Income",
                      value: insights.stats.totalIncome,
                      color: "text-income",
                    },
                    {
                      label: "Expenses",
                      value: insights.stats.totalExpense,
                      color: "text-expense",
                    },
                    {
                      label: "Invested",
                      value: insights.stats.totalInvestment,
                      color: "text-investment",
                    },
                    {
                      label: "Net",
                      value: insights.stats.netBalance,
                      color:
                        Number(insights.stats.netBalance) >= 0
                          ? "text-income"
                          : "text-expense",
                    },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="bg-background rounded-lg px-3 py-2"
                    >
                      <p className="text-xs text-text-muted">{label}</p>
                      <p
                        className={cn("text-sm font-bold font-display", color)}
                      >
                        {formatCurrency(Number(value), true)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles size={20} className="text-primary" />
            </div>
            <p className="text-sm text-text-muted max-w-45">
              No insights yet. Make sure you have transactions in this period.
            </p>
          </div>
        )}
      </div>

      <div className="px-5 py-3 border-t border-border">
        <Link
          to={RoutePaths.INSIGHTS}
          className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          Deep dive into insights <ChevronRight size={12} />
        </Link>
      </div>
    </div>
  );
});
