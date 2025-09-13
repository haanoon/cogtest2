import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Insights() {
  return (
    <DashboardLayout title="Strategic Questions" subtitle="Executive insights & long-term planning">
      <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
        This section can include scenario planning, price elasticity, and executive summaries. Ask to fill this page with your desired analyses.
      </div>
    </DashboardLayout>
  );
}
