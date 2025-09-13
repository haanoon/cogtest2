import ReactECharts from "echarts-for-react";

export default function RiskMatrix() {
  const option = {
    tooltip: { trigger: "item" },
    grid: { left: 10, right: 10, top: 20, bottom: 30, containLabel: true },
    xAxis: { type: "category", data: ["Low", "Medium", "High"] },
    yAxis: { type: "category", data: ["Low", "Medium", "High"] },
    visualMap: {
      show: false,
      min: 0,
      max: 9,
      inRange: { color: ["#22c55e", "#f59e0b", "#ef4444"] },
    },
    series: [
      {
        type: "heatmap",
        data: [
          [0, 0, 3],
          [1, 0, 1],
          [2, 0, 0],
          [0, 1, 1],
          [1, 1, 2],
          [2, 1, 1],
          [0, 2, 0],
          [1, 2, 1],
          [2, 2, 2],
        ],
        label: { show: true },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.4)" },
        },
      },
    ],
  } as const;

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="text-sm font-medium mb-2">Risk Matrix</div>
      <ReactECharts option={option} style={{ height: 260 }} />
    </div>
  );
}
