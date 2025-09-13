import { RequestHandler } from "express";
import { ForecastMetrics, TrendResponse, FiltersPayload } from "@shared/api";

function seededRand(seed: number) {
  let t = seed % 2147483647;
  if (t <= 0) t += 2147483646;
  return () => (t = (t * 16807) % 2147483647) / 2147483647;
}

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

function parseFilters(query: any): FiltersPayload {
  const store = String(query.store ?? "All Stores");
  const family = String(query.family ?? "All Families");
  const item = String(query.item ?? "All Items");
  const dateRange = String(
    query.dateRange ?? "30d",
  ) as FiltersPayload["dateRange"];
  return { store, family, item, dateRange };
}

export const metricsHandler: RequestHandler = (req, res) => {
  const filters = parseFilters(req.query);
  const seed = hash(
    `${filters.store}|${filters.family}|${filters.item}|${filters.dateRange}`,
  );
  const rnd = seededRand(seed);
  const base = 100000 + Math.floor(rnd() * 100000);
  const delta7 = Math.round((rnd() * 2 - 1) * 10 * 10) / 10; // -10..10
  const delta30 = Math.round((rnd() * 2 - 1) * 15 * 10) / 10; // -15..15
  const promoImpact = Math.round((25 + rnd() * 40) * 10) / 10; // 25..65

  const response: ForecastMetrics = {
    next7Days: Math.round(base * 0.25),
    next30Days: Math.round(base * 1.1),
    promoImpactPct: promoImpact,
    delta7DaysPct: delta7,
    delta30DaysPct: delta30,
  };
  res.json(response);
};

export const trendHandler: RequestHandler = (req, res) => {
  const filters = parseFilters(req.query);
  const seed = hash(
    `${filters.store}|${filters.family}|${filters.item}|${filters.dateRange}|trend`,
  );
  const rnd = seededRand(seed);
  const days =
    filters.dateRange === "7d" ? 7 : filters.dateRange === "90d" ? 90 : 30;
  const today = new Date();
  const points: TrendResponse["points"] = [];
  let level = 10000 + rnd() * 10000;
  for (let i = days - 1; i >= 0; i--) {
    level += (rnd() - 0.45) * 800;
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const sales = Math.max(
      2000,
      Math.round(level + Math.sin(i / 3) * 1200 + (rnd() - 0.5) * 500),
    );
    points.push({ date: date.toISOString().slice(0, 10), sales });
  }
  res.json({ points });
};
