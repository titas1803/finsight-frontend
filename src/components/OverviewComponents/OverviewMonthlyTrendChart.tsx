import { formatCurrency } from "@/utils/format";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Tooltip,
} from "recharts";
import { OverviewSkeleton } from "./OverviewSkeleton";
import { useMonthlyTransactions } from "@/hooks/overviewHooks";
import React from "react";

const ChartTooltip: React.FC<{
  active: boolean;
  payload?: { name: string; color: string; value: number }[];
  label: string;
}> = ({ active = false, payload, label }) => {
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
};

export const OverviewMonthlyTrendChart: React.FC = React.memo(() => {
  const { data: monthly, isLoading: monthlyLoading } = useMonthlyTransactions();

  return (
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
        <OverviewSkeleton className="h-56 w-full" />
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
            <Bar dataKey="investment" fill="#F59E0B" radius={[4, 4, 0, 0]} />
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
  );
});
