/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Sales forecasting domain types
export interface ForecastMetrics {
  next7Days: number;
  next30Days: number;
  promoImpactPct: number;
  delta7DaysPct: number;
  delta30DaysPct: number;
}

export interface TrendPoint {
  date: string; // ISO date
  sales: number;
}

export interface TrendResponse {
  points: TrendPoint[];
}

export interface ReplenishmentItem {
  id: string;
  item: string;
  family: string;
  recommendedQty: number;
  onHand: number;
  risk: "low" | "medium" | "high";
}

export interface ReplenishmentListResponse {
  items: ReplenishmentItem[];
}

export interface FiltersPayload {
  store: string;
  family: string;
  item: string;
  dateRange: "7d" | "30d" | "90d";
}
