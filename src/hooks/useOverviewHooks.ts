import { useQuery } from "@tanstack/react-query";
import {
  getAllTransactions,
  getByTypeAndCategory,
  getSpecificPeriod,
  getTransactionSummary,
} from "../api/transaction.api";
import { getInsights } from "../api/insight.api";
import { TransactionType } from "../constants/enums";

export const overviewKeys = {
  summary: ["transactions", "summary"] as const,
  recent: ["transactions", "list", "recent"] as const,
  insight: ["insights", "week"] as const,
  byCategory: ["transactions", "byType", "expense"] as const,
  monthlyDays: ["transactions", "lastDays", "month"] as const,
};

export const useSummary = () =>
  useQuery({
    queryKey: overviewKeys.summary,
    queryFn: () => getTransactionSummary(),
  });

export const useRecentTransactions = () =>
  useQuery({
    queryKey: overviewKeys.recent,
    queryFn: () =>
      getAllTransactions({ sortBy: "date", order: "DESC", limit: 5 }),
  });

export const useWeeklyInsight = () =>
  useQuery({
    queryKey: overviewKeys.insight,
    queryFn: () => getInsights("week"),
    staleTime: 1000 * 60 * 30,
  });

export const useExpenseByCategory = () =>
  useQuery({
    queryKey: overviewKeys.byCategory,
    queryFn: () => getByTypeAndCategory(TransactionType.EXPENSE),
  });

export const useMonthlyTransactions = () =>
  useQuery({
    queryKey: overviewKeys.monthlyDays,
    queryFn: () => getSpecificPeriod("month"),
    // Transform raw transactions into monthly bar chart data
    select: (data) => {
      const grouped: Record<
        string,
        { income: number; expense: number; investment: number }
      > = {};

      data.transactions.forEach((t) => {
        const date = new Date(t.date);
        const label = date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        });

        if (!grouped[label]) {
          grouped[label] = { income: 0, expense: 0, investment: 0 };
        }

        if (t.type === "income") grouped[label].income += Number(t.amount);
        if (t.type === "expense") grouped[label].expense += Number(t.amount);
        if (t.type === "investment")
          grouped[label].investment += Number(t.amount);
      });

      return Object.entries(grouped)
        .map(([date, values]) => ({ date, ...values }))
        .reverse(); // oldest → newest for chart left → right
    },
  });
