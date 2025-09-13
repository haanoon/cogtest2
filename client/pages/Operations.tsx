import DashboardLayout from "@/components/layout/DashboardLayout";
import FiltersBar from "@/components/dashboard/FiltersBar";
import { useQuery } from "@tanstack/react-query";
import { fetchReplenishment } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Operations() {
  const { data } = useQuery({
    queryKey: ["replenishment"],
    queryFn: fetchReplenishment,
  });

  return (
    <DashboardLayout
      title="Day-to-Day Operations"
      subtitle="Store management & inventory decisions"
    >
      <div className="space-y-4">
        <FiltersBar />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">
              Items to Reorder
            </div>
            <div className="text-2xl font-semibold">
              {data
                ? data.items.filter((i) => i.onHand < i.recommendedQty).length
                : "—"}
            </div>
            <div className="text-xs text-muted-foreground">
              +5 from yesterday
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">
              Safety Stock Alert
            </div>
            <div className="text-2xl font-semibold">
              {data
                ? data.items.filter((i) => i.onHand < i.recommendedQty * 0.3)
                    .length
                : "—"}
            </div>
            <div className="text-xs text-muted-foreground">
              Items below threshold
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">
              Today's Forecast
            </div>
            <div className="text-2xl font-semibold">$18,750</div>
            <div className="text-xs text-muted-foreground">
              +12% vs last week
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">
              Stores Needing Stock
            </div>
            <div className="text-2xl font-semibold">3</div>
            <div className="text-xs text-muted-foreground">
              Redistribution needed
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <div className="p-4 text-sm font-medium">
            Daily Replenishment List
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr className="text-left">
                  <th className="p-3">Item</th>
                  <th className="p-3">Family</th>
                  <th className="p-3">Recommended Qty</th>
                  <th className="p-3">On-hand</th>
                  <th className="p-3">Risk Level</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.items.map((it) => (
                  <tr key={it.id} className="border-b last:border-0">
                    <td className="p-3">{it.item}</td>
                    <td className="p-3 text-muted-foreground">{it.family}</td>
                    <td className="p-3 tabular-nums">{it.recommendedQty}</td>
                    <td className="p-3 tabular-nums">{it.onHand}</td>
                    <td className="p-3">
                      {it.risk === "high" ? (
                        <Badge variant="destructive">high</Badge>
                      ) : it.risk === "medium" ? (
                        <Badge variant="secondary">medium</Badge>
                      ) : (
                        <Badge>low</Badge>
                      )}
                    </td>
                    <td className="p-3">
                      <Button size="sm" variant="outline">
                        Re-order
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
