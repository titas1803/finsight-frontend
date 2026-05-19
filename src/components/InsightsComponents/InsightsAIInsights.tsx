import { Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import { InsightsSkeleton } from "./InsightsSkeleton";

export const InsightsAIInsights: React.FC<{
  insight: string | null;
  loading: boolean;
  onRefresh: () => void;
  transactionCount: number;
}> = ({ insight, loading, onRefresh, transactionCount }) => {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "#1A1D27",
        border: "1px solid #2A2D3E",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className="p-1.5 rounded-md"
            style={{ background: "rgba(108,99,255,0.15)", color: "#6C63FF" }}
          >
            <Sparkles size={16} />
          </div>
          <span className="font-semibold text-sm" style={{ color: "#F1F5F9" }}>
            AI Financial Insight
          </span>
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 rounded-lg transition-colors duration-150 disabled:opacity-50"
          style={{ background: "rgba(108,99,255,0.1)", color: "#6C63FF" }}
          title="Refresh insight"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Body */}
      {loading ? (
        <div className="space-y-2">
          <InsightsSkeleton className="h-4 w-full" />
          <InsightsSkeleton className="h-4 w-5/6" />
          <InsightsSkeleton className="h-4 w-4/6" />
        </div>
      ) : transactionCount === 0 ? (
        <div className="flex items-start gap-3">
          <AlertCircle
            size={16}
            className="mt-0.5 shrink-0"
            style={{ color: "#64748B" }}
          />
          <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
            No transactions found for this period. Add some transactions to get
            AI-powered insights.
          </p>
        </div>
      ) : (
        <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
          {insight}
        </p>
      )}
    </div>
  );
};
