import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface PerfumeItem {
  _id: string;
  title: string;
  category: string;
  price: number;
  gender: string;
}

interface DashboardChartProps {
  perfumes: PerfumeItem[];
}

export default function DashboardChart({ perfumes }: DashboardChartProps) {
  const chartData = perfumes.slice(0, 6).map((p) => ({
    name: p.title.split(" ")[0],
    Price: p.price,
    Stock: Math.floor(Math.random() * 40) + 15,
  }));

  return (
    <div className="w-full bg-perf-card/40 border border-perf-border/80 p-6 rounded-2xl shadow-sm backdrop-blur-md">
      <div className="mb-4">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-perf-gold">
          Boutique Metrics
        </span>
        <h3 className="text-lg font-bold font-serif-luxury text-perf-text-main">
          Sales & Inventory Analytics
        </h3>
      </div>

      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255, 255, 255, 0.08)"
            />
            <XAxis
              dataKey="name"
              stroke="var(--perf-text-muted)"
              fontSize={11}
              tickLine={false}
            />
            <YAxis
              stroke="var(--perf-text-muted)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--perf-card)",
                borderColor: "var(--perf-gold)",
                borderRadius: "12px",
                color: "var(--perf-text-main)",
              }}
              itemStyle={{ color: "var(--perf-text-main)" }}
            />
            <Legend
              wrapperStyle={{
                fontSize: "12px",
                paddingTop: "10px",
                color: "var(--perf-text-main)",
              }}
            />
            <Bar
              dataKey="Price"
              name="Unit Price ($)"
              fill="var(--perf-gold)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="Stock"
              name="Available Stock"
              fill="var(--perf-text-muted)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
