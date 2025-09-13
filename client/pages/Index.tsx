import { useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import FiltersBar from "@/components/dashboard/FiltersBar";
import StatCard from "@/components/dashboard/StatCard";
import TrendChart from "@/components/dashboard/TrendChart";
import RiskMatrix from "@/components/dashboard/RiskMatrix";
import MapboxMap from "@/components/dashboard/MapboxMap";
import { useFilters } from "@/store/filters";
import { useQuery } from "@tanstack/react-query";
import { fetchForecastMetrics, fetchTrend } from "@/lib/api";
import { Bolt, CalendarClock, Percent, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Index() {
  const { store, family, item, dateRange } = useFilters();
  const params = useMemo(() => {
    const p = new URLSearchParams();
    p.set("store", store);
    p.set("family", family);
    p.set("item", item);
    p.set("dateRange", dateRange);
    return p;
  }, [store, family, item, dateRange]);

  const metricsQuery = useQuery({
    queryKey: ["metrics", params.toString()],
    queryFn: () => fetchForecastMetrics(params),
  });
  const trendQuery = useQuery({
    queryKey: ["trend", params.toString()],
    queryFn: () => fetchTrend(params),
  });

  return (
    <DashboardLayout
      title="Weekly/Monthly Planning"
      subtitle="Tactical trends & promotional planning"
    >
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiltersBar />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 gap-3 md:grid-cols-4"
        >
          <StatCard
            title="Next 7 Days Forecast"
            value={
              metricsQuery.data
                ? `$${metricsQuery.data.next7Days.toLocaleString()}`
                : "—"
            }
            sub={
              metricsQuery.data
                ? `${metricsQuery.data.delta7DaysPct > 0 ? "+" : ""}${metricsQuery.data.delta7DaysPct}% vs last week`
                : "Loading..."
            }
            icon={<CalendarClock className="size-5" />}
          />
          <StatCard
            title="Next 30 Days Forecast"
            value={
              metricsQuery.data
                ? `$${metricsQuery.data.next30Days.toLocaleString()}`
                : "—"
            }
            sub={
              metricsQuery.data
                ? `${metricsQuery.data.delta30DaysPct > 0 ? "+" : ""}${metricsQuery.data.delta30DaysPct}% vs last month`
                : "Loading..."
            }
            icon={<TrendingUp className="size-5" />}
          />
          <StatCard
            title="Promotional impact"
            value={
              metricsQuery.data ? `${metricsQuery.data.promoImpactPct}%` : "—"
            }
            sub="Average sales lift"
            icon={<Percent className="size-5" />}
          />
          <StatCard
            title="System Status"
            value="Normal"
            sub="All services operational"
            icon={<Bolt className="size-5" />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-lg border bg-card p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="text-sm font-medium">Sales Forecast Trend</div>
          </div>
          {trendQuery.data ? (
            <TrendChart data={trendQuery.data.points} />
          ) : (
            <div className="h-[300px] animate-pulse rounded-md bg-muted" />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-4 md:grid-cols-2"
        >
          <div className="rounded-lg border bg-card p-4">
            <div className="text-sm font-medium mb-2">
              Holiday Demand Forecast
            </div>
            <div className="text-sm text-muted-foreground">
              Model projects higher demand near holidays; adjust replenishment
              and promotions accordingly.
            </div>
          </div>
          <RiskMatrix />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MapboxMap />
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
