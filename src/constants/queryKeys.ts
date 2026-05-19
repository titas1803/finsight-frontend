import type { InsightPeriod } from "../types/insight.types";
import type { TransactionFilters } from "../types/transaction.types";
import type { TransactionType, Category } from "./enums";

// constants/queryKeys.ts  ← add this file
export const queryKeys = {
  transactions: {
    all: ["transactions"] as const,
    list: (filters?: TransactionFilters) =>
      ["transactions", "list", filters] as const,
    byId: (id: string) => ["transactions", id] as const,
    summary: (params?: { startDate?: string; endDate?: string }) =>
      ["transactions", "summary", params] as const,
    byType: (type: TransactionType, category?: Category) =>
      ["transactions", "byType", type, category] as const,
    lastDays: (period: "week" | "month" | "year") =>
      ["transactions", "lastDays", period] as const,
    recent: ["transactions", "list", "recent"] as const,
    monthlyDays: ["transactions", "lastDays", "month"] as const,
    byCategory: ["transactions", "byType", "expense"] as const,
  },
  insights: {
    period: (period: InsightPeriod) => ["insights", period] as const,
    category: (category: Category) =>
      ["insights", "category", category] as const,
  },
  user: {
    profile: ["user", "profile"] as const,
  },
};
