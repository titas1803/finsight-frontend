import { getInsights, getInsightsByCategory } from "@/api/insight.api";
import type { Category } from "@/constants/enums";
import { queryKeys } from "@/constants/queryKeys";
import type { InsightPeriod } from "@/types/insight.types";
import { useQuery } from "@tanstack/react-query";

const insightKeys = queryKeys.insights;
export const usePeriodicInsight = (period: InsightPeriod) =>
  useQuery({
    queryKey: insightKeys.period(period),
    queryFn: () => getInsights(period),
    staleTime: 1000 * 60 * 30,
  });

export function useCategoryInsights(category: Category) {
  return useQuery({
    queryKey: insightKeys.category(category),
    queryFn: () => getInsightsByCategory(category),
    enabled: false, // manually triggered — call refetch() to fire
  });
}
