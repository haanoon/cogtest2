import DashboardLayout from "@/components/layout/DashboardLayout";
import SalesPredictionApp from "@/pages/AdvancedPrediction"; // adjust path if needed

export default function Insights() {
  return (
    <DashboardLayout
      title="Advanced Insights"
    >
      <SalesPredictionApp />
    </DashboardLayout>
  );
}
