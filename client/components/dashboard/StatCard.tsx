import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

export default function StatCard({ title, value, sub, icon }: { title: string; value: string; sub?: string; icon?: ReactNode; }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="grid gap-1">
          <div className="text-xs text-muted-foreground">{title}</div>
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
          {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
        </div>
        {icon && <div className="text-primary/80">{icon}</div>}
      </div>
    </Card>
  );
}
