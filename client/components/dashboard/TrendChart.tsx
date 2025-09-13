import { useMemo } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendPoint } from "@shared/api";

export default function TrendChart({ data }: { data: TrendPoint[] }) {
  const config = useMemo(
    () => ({
      sales: { label: "Sales" },
    }),
    [],
  );

  return (
    <ChartContainer config={config} className="w-full">
      <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="date" tickMargin={8} minTickGap={24} />
        <YAxis width={70} tickFormatter={(v) => v.toLocaleString()} />
        <Tooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
