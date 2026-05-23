import { TrendingUp, TrendingDown, Wallet, Scale } from "lucide-react";
import { InsightsSkeleton } from "./InsightsSkeleton";

export const InsightsStatCard: React.FC<{
  label: string;
  value: string | null;
  icon: React.ReactNode;
  color: string;
  loading: boolean;
}> = ({ label, value, icon, color, loading }) => {
  const isNegative = value !== null && parseFloat(value) < 0;

  return (
    <div
      className="flex flex-col gap-3 px-2 md:px-4 py-4 rounded-2xl"
      style={{ background: "#1A1D27", border: "1px solid #2A2D3E" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: "#64748B" }}>
          {label}
        </span>
        <div
          className="p-1.5 rounded-md"
          style={{ background: `${color}1A`, color }}
        >
          {icon}
        </div>
      </div>
      {loading ? (
        <InsightsSkeleton className="h-7 w-28" />
      ) : value === null ? (
        <span className="text-xl font-bold" style={{ color: "#64748B" }}>
          —
        </span>
      ) : (
        <span
          className="text-xl font-bold tracking-tight"
          style={{ color: isNegative ? "#EF4444" : "#F1F5F9" }}
        >
          ₹
          {parseFloat(value).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
          })}
        </span>
      )}
    </div>
  );
};

export const InsightsStatsStrip: React.FC<{
  stats: {
    totalIncome: string;
    totalExpense: string;
    totalInvestment: string;
    netBalance: string;
    topExpenseCategory: string;
    transactionCount: number;
  } | null;
  loading: boolean;
}> = ({ stats, loading }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <InsightsStatCard
        label="Total Income"
        value={stats?.totalIncome ?? null}
        icon={<TrendingUp size={14} />}
        color="#22C55E"
        loading={loading}
      />
      <InsightsStatCard
        label="Total Expense"
        value={stats?.totalExpense ?? null}
        icon={<TrendingDown size={14} />}
        color="#EF4444"
        loading={loading}
      />
      <InsightsStatCard
        label="Invested"
        value={stats?.totalInvestment ?? null}
        icon={<Wallet size={14} />}
        color="#F59E0B"
        loading={loading}
      />
      <InsightsStatCard
        label="Net Balance"
        value={stats?.netBalance ?? null}
        icon={<Scale size={14} />}
        color="#6C63FF"
        loading={loading}
      />
    </div>
  );
};
