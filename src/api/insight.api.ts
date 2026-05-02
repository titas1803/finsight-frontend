import { Category, Insighturls } from "../constants/enums";
import {
  type CategoryInsightResponse,
  type InsightPeriod,
  type InsightResponse,
} from "../types/insight.types";
import api from "./client";

export const getInsights = async (period: InsightPeriod = "week") => {
  const { data } = await api.get<InsightResponse>(`${Insighturls.GETINSIGHT}`, {
    params: { period },
  });

  return data;
};

export const getInsightsByCategory = async (category: Category) => {
  const { data } = await api.get<CategoryInsightResponse>(
    `/${Insighturls.GETINSIGHTBYCATEGORY(category)}`,
  );

  return data;
};
