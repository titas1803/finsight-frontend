import React from "react";
import { cn } from "../../utils/cn";
import { formatCurrency } from "../../utils/format";
import { TrendingDown, TrendingUp } from "lucide-react";

type SummaryCardProps = {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  trend?: number;
  isLoading?: boolean;
};
export const SummaryCard: React.FC<SummaryCardProps> = ({
  label,
  value,
  icon: Icon,
  color,
  trend,
  isLoading,
}) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-white/10 transition-colors">
      <div className="flex items-start justify-between">
        <span className="text-sm text-text-muted font-medium">{label}</span>
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center",
            color,
          )}
        >
          <Icon size={18} />
        </div>
      </div>
      {isLoading ? (
        <div className="h-8 w-32 bg-white/5 rounded-md animate-pulse" />
      ) : (
        <span className="text-2xl font-bold text-text-primary font-display tracking-tight">
          {formatCurrency(value, true)}
        </span>
      )}
      {trend !== undefined && !isLoading && (
        <span
          className={cn(
            "text-xs font-medium flex items-center gap-1",
            trend >= 0 ? "text-income" : "text-expense",
          )}
        >
          {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(trend).toFixed(1)}% vs last month
        </span>
      )}
    </div>
  );
};
