import type { Category } from "../constants/enums";

// Shared stats shape — returned by both insight endpoints
export type InsightStats = {
  totalIncome: string;
  totalExpense: string;
  totalInvestment: string;
  netBalance: string;
  topExpenseCategory: string;
  transactionCount: number;
};

// Used by PeriodTabs component
export type InsightPeriod = "week" | "month" | "year";

// GET /insights?period=week|month|year response
export type InsightResponse = {
  period: InsightPeriod;
  insight: string;
  transactionCount: number;
  stats: InsightStats | null;
};

// GET /insights/category?category=food response
export type CategoryInsightResponse = {
  category: Category;
  insight: string;
  transactionCount: number;
  stats: InsightStats | null;
};
