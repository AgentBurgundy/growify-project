import { fetchWithAuth } from "./api";
import { InsightsResponse, BreakdownType } from "@/types/insights";

export const getDateRange = () => {
  const until = Math.floor(Date.now() / 1000);
  const since = until - 7 * 24 * 60 * 60; // 7 days ago
  return { since, until };
};

export const fetchInsights = async (
  breakdown: BreakdownType
): Promise<InsightsResponse> => {
  const { since, until } = getDateRange();

  return fetchWithAuth(
    `/api/insights?since=${since}&until=${until}&breakdown=${breakdown}`
  );
};
