import {
  InsightsAIInsights,
  InsightsCategoryInsightPanel,
  InsightsEmptyState,
  InsightsPeriodTabs,
  InsightsStatsStrip,
  InsightsTopExpenseCategory,
  type PeriodTab,
} from "@/components/InsightsComponents";
import { usePeriodicInsight } from "@/hooks/insightHooks";
import { useState } from "react";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Insights() {
  const [period, setPeriod] = useState<PeriodTab>("month");

  const { data, isLoading, isFetching, refetch } = usePeriodicInsight(period);

  const loading = isLoading || isFetching;
  const hasNoTransactions = !loading && data?.transactionCount === 0;

  return (
    <div className="min-h-screen" style={{ background: "#0F1117" }}>
      <div className="max-w-300 mx-auto p-4 lg:p-6 space-y-6">
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#F1F5F9" }}
            >
              Insights
            </h1>
            <p className="text-sm mt-0.5" style={{ color: "#64748B" }}>
              AI-powered analysis of your financial activity
            </p>
          </div>
          <InsightsPeriodTabs active={period} onChange={setPeriod} />
        </div>

        {/* ── Stats Strip ── */}
        <InsightsStatsStrip stats={data?.stats ?? null} loading={loading} />

        {/* ── Top Expense + Transaction Count ── */}
        {(data?.stats || loading) && (
          <div className="flex flex-wrap items-center gap-3">
            <InsightsTopExpenseCategory
              topExpenseCategory={data?.stats?.topExpenseCategory ?? null}
              loading={loading}
            />
            {!loading && data && data.transactionCount > 0 && (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
                style={{
                  background: "rgba(108,99,255,0.08)",
                  border: "1px solid rgba(108,99,255,0.2)",
                  color: "#6C63FF",
                }}
              >
                {data.transactionCount} transaction
                {data.transactionCount !== 1 ? "s" : ""} this {period}
              </span>
            )}
          </div>
        )}

        {/* ── Empty State ── */}
        {hasNoTransactions ? (
          <InsightsEmptyState />
        ) : (
          <>
            {/* ── AI Insight Card ── */}
            <InsightsAIInsights
              insight={data?.insight ?? null}
              loading={loading}
              onRefresh={refetch}
              transactionCount={data?.transactionCount ?? 0}
            />

            {/* ── Category Insight Panel ── */}
            <InsightsCategoryInsightPanel />
          </>
        )}
      </div>
    </div>
  );
}
