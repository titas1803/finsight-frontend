// ─── Color map ────────────────────────────────────────────────────────────────

import {
  OveriewInsightsSection,
  OverviewExpensePieChart,
  OverviewMonthlyTrendChart,
  OverviewRecentTransactions,
  OverviewSummarySection,
} from "@/components/OverviewComponents";

export default function OverviewPage() {
  return (
    <div className="p-2 md:p-6 space-y-6 max-w-350 mx-auto">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-text-primary font-display">
            Overview
          </h1>
          <p className="text-sm text-text-muted mt-0.5">
            Your financial snapshot at a glance
          </p>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <OverviewSummarySection />
      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Trend Bar Chart — takes 2 cols */}
        <OverviewMonthlyTrendChart />

        {/* Expense Breakdown Pie */}
        <OverviewExpensePieChart />
      </div>

      {/* ── Bottom Row: Recent Transactions + AI Insights ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent Transactions — 3 cols */}
        <OverviewRecentTransactions />
        {/* AI Insights — 2 cols */}
        <OveriewInsightsSection />
      </div>
    </div>
  );
}
