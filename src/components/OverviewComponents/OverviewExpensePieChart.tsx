import React from "react";
import { capitalize, formatCurrency } from "@/utils/format";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { OverviewSkeleton } from "./OverviewSkeleton";
import { CATEGORY_COLORS } from ".";
import { useExpenseByCategory } from "@/hooks/overviewHooks";

export const OverviewExpensePieChart: React.FC = React.memo(() => {
  const { data: categoryData, isLoading: categoryLoading } =
    useExpenseByCategory();

  const pieData =
    categoryData?.map((c) => ({
      name: capitalize(c.category),
      value: c.total,
      color: CATEGORY_COLORS[c.category] ?? "#64748B",
    })) ?? [];

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-text-primary">
          Expense Breakdown
        </h2>
        <p className="text-xs text-text-muted mt-0.5">By category this month</p>
      </div>
      {categoryLoading ? (
        <OverviewSkeleton className="h-56 w-full" />
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
              formatter={(value) => formatCurrency(Number(value ?? 0), true)}
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
                <span style={{ color: "#64748B", fontSize: 11 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
});
