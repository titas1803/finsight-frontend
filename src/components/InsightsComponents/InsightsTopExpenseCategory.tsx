import type React from "react";
import { Tag } from "lucide-react";
import { InsightsSkeleton } from "./InsightsSkeleton";

export const InsightsTopExpenseCategory: React.FC<{
  topExpenseCategory: string | null;
  loading: boolean;
}> = ({ topExpenseCategory, loading }) => {
  if (loading) return <InsightsSkeleton className="h-10 w-56" />;
  if (!topExpenseCategory) return null;

  return (
    <div
      className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
      style={{
        background: "rgba(239,68,68,0.1)",
        border: "1px solid rgba(239,68,68,0.2)",
      }}
    >
      <Tag size={14} style={{ color: "#EF4444" }} />
      <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>
        Top Expense
      </span>
      <span className="text-xs font-semibold" style={{ color: "#EF4444" }}>
        {topExpenseCategory}
      </span>
    </div>
  );
};
