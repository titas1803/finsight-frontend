import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Landmark,
  Wallet,
  Sparkles,
  RefreshCw,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Link } from "react-router-dom";
import {
  useSummary,
  useMonthlyTransactions,
  useExpenseByCategory,
  useRecentTransactions,
} from "@/hooks/overviewHooks";
import { RoutePaths } from "@/constants/routes";
import { TransactionType } from "@/constants/enums";
import { formatCurrency, formatShortDate, capitalize } from "@/utils/format";
import { cn } from "@/utils/cn";
import { SummaryCard } from "@/components/OverviewComponents/SummaryCard";
import type { InsightPeriod } from "@/types/insight.types";
import { marked } from "marked";
import parse from "html-react-parser";
import { usePeriodicInsight } from "@/hooks/insightHooks";
// ─── Color map ────────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  food: "#F59E0B",
  transport: "#6C63FF",
  entertainment: "#EC4899",
  health: "#22C55E",
  shopping: "#F97316",
  bills: "#EF4444",
  salary: "#22C55E",
  other: "#64748B",
};

// ─── Subcomponents ────────────────────────────────────────────────────────────

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={cn("bg-white/5 rounded-lg animate-pulse", className)} />
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function ChartTooltip({
  active = false,
  payload,
  label,
}: {
  active: boolean;
  payload?: { name: string; color: string; value: number }[];
  label: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface border border-border rounded-lg p-3 shadow-xl text-xs space-y-1.5">
      <p className="text-text-muted font-medium mb-1">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-text-muted capitalize">{entry.name}</span>
          <span className="text-text-primary font-semibold ml-auto pl-4">
            {formatCurrency(entry.value, true)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function OverviewPage() {
  const [insightPeriod, setInsightPeriod] = useState<InsightPeriod>("week");

  const { data: summary, isLoading: summaryLoading } = useSummary();
  const { data: monthly, isLoading: monthlyLoading } = useMonthlyTransactions();
  const { data: categoryData, isLoading: categoryLoading } =
    useExpenseByCategory();
  const {
    data: insights,
    isLoading: insightsLoading,
    refetch: refetchInsights,
  } = usePeriodicInsight(insightPeriod);
  const { data: recentTxns, isLoading: recentLoading } =
    useRecentTransactions();

  const netBalance = (summary?.totalIncome ?? 0) - (summary?.totalExpense ?? 0);

  const pieData =
    categoryData?.map((c) => ({
      name: capitalize(c.category),
      value: c.total,
      color: CATEGORY_COLORS[c.category] ?? "#64748B",
    })) ?? [];

  // const monthlyData = monthly?.map(m => ({
  //   name: capitalize(m.)
  // }))

  const recentSlice = recentTxns?.transactions.slice(0, 6) ?? [];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-350 mx-auto">
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Income"
          value={summary?.totalIncome ?? 0}
          icon={TrendingUp}
          color="bg-income/10 text-income"
          isLoading={summaryLoading}
        />
        <SummaryCard
          label="Total Expenses"
          value={summary?.totalExpense ?? 0}
          icon={TrendingDown}
          color="bg-expense/10 text-expense"
          isLoading={summaryLoading}
        />
        <SummaryCard
          label="Investments"
          value={summary?.totalInvestment ?? 0}
          icon={Landmark}
          color="bg-investment/10 text-investment"
          isLoading={summaryLoading}
        />
        <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-white/10 transition-colors">
          <div className="flex items-start justify-between">
            <span className="text-sm text-text-muted font-medium">
              Net Balance
            </span>
            <div
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center",
                netBalance >= 0
                  ? "bg-income/10 text-income"
                  : "bg-expense/10 text-expense",
              )}
            >
              <Wallet size={18} />
            </div>
          </div>
          {summaryLoading ? (
            <div className="h-8 w-32 bg-white/5 rounded-md animate-pulse" />
          ) : (
            <span
              className={cn(
                "text-2xl font-bold font-display tracking-tight",
                netBalance >= 0 ? "text-income" : "text-expense",
              )}
            >
              {formatCurrency(netBalance, true)}
            </span>
          )}
          <span className="text-xs text-text-muted">Income minus expenses</span>
        </div>
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monthly Trend Bar Chart — takes 2 cols */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-text-primary">
                Monthly Trend
              </h2>
              <p className="text-xs text-text-muted mt-0.5">
                Income vs expenses vs investments
              </p>
            </div>
          </div>
          {monthlyLoading ? (
            <SkeletonBlock className="h-56 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthly ?? []} barSize={8} barGap={3}>
                <CartesianGrid vertical={false} stroke="#2A2D3E" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748B", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => formatCurrency(v, true)}
                  width={52}
                />
                <Tooltip
                  content={
                    <ChartTooltip
                      active
                      label="tip"
                      payload={monthly?.map((monthData) => ({
                        name: "expense",
                        color: "#EF4444",
                        value: monthData.expense,
                      }))}
                    />
                  }
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="income" fill="#22C55E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="investment"
                  fill="#F59E0B"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
          <div className="flex items-center gap-4 mt-3">
            {[
              ["#22C55E", "Income"],
              ["#EF4444", "Expense"],
              ["#F59E0B", "Investment"],
            ].map(([color, label]) => (
              <div key={label} className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: color }}
                />
                <span className="text-xs text-text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Breakdown Pie */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-text-primary">
              Expense Breakdown
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              By category this month
            </p>
          </div>
          {categoryLoading ? (
            <SkeletonBlock className="h-56 w-full" />
          ) : pieData.length === 0 ? (
            <div className="h-56 flex items-center justify-center text-text-muted text-sm">
              No expense data
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry: { color: string }, i: number) => (
                    <Cell key={i} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) =>
                    formatCurrency(Number(value ?? 0), true)
                  }
                  contentStyle={{
                    background: "#1A1D27",
                    border: "1px solid #2A2D3E",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  itemStyle={{ color: "#F1F5F9" }}
                  labelStyle={{ color: "#64748B" }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => (
                    <span style={{ color: "#64748B", fontSize: 11 }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Bottom Row: Recent Transactions + AI Insights ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent Transactions — 3 cols */}
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
                  <SkeletonBlock className="w-9 h-9 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <SkeletonBlock className="h-3 w-36" />
                    <SkeletonBlock className="h-2.5 w-20" />
                  </div>
                  <SkeletonBlock className="h-4 w-16" />
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

        {/* AI Insights — 2 cols */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
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
                      "text-xs px-2 py-1 rounded-md transition-all font-medium capitalize",
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
                <SkeletonBlock className="h-3 w-full" />
                <SkeletonBlock className="h-3 w-5/6" />
                <SkeletonBlock className="h-3 w-4/6" />
                <SkeletonBlock className="h-3 w-full mt-4" />
                <SkeletonBlock className="h-3 w-3/4" />
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
                            className={cn(
                              "text-sm font-bold font-display",
                              color,
                            )}
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
                  No insights yet. Make sure you have transactions in this
                  period.
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
      </div>
    </div>
  );
}
