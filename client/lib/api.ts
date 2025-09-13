import { ForecastMetrics, TrendResponse, ReplenishmentListResponse } from "@shared/api";

export async function fetchForecastMetrics(params: URLSearchParams): Promise<ForecastMetrics> {
  const res = await fetch(`/api/forecast/metrics?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch metrics");
  return res.json();
}

export async function fetchTrend(params: URLSearchParams): Promise<TrendResponse> {
  const res = await fetch(`/api/forecast/trend?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch trend");
  return res.json();
}

export async function fetchReplenishment(): Promise<ReplenishmentListResponse> {
  const res = await fetch(`/api/operations/replenishment`);
  if (!res.ok) throw new Error("Failed to fetch replenishment");
  return res.json();
}
