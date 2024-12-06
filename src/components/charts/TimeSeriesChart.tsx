import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type TimeInterval = "1h" | "24h" | "7d" | "all";

interface TimeSeriesData {
  timestamp: string;
  value: number;
}

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  interval?: TimeInterval;
}

export const TimeSeriesChart = ({
  data,
  interval = "24h",
}: TimeSeriesChartProps) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const formatTick = (time: string) => {
    const date = new Date(time);
    switch (interval) {
      case "1h":
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      case "24h":
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      case "7d":
        return date.toLocaleDateString([], { weekday: "short" });
      case "all":
        return date.toLocaleDateString([], { month: "short", day: "numeric" });
      default:
        return date.toLocaleString();
    }
  };

  const getTickCount = () => {
    switch (interval) {
      case "1h":
        return 6; // Show 10-minute intervals
      case "24h":
        return 8; // Show 3-hour intervals
      case "7d":
        return 7; // Show daily intervals
      case "all":
        return 6; // Show monthly intervals
      default:
        return 6;
    }
  };

  return (
    <div className="h-48 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sortedData}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTick}
            stroke="#6B7280"
            fontSize={12}
            interval="preserveStartEnd"
            tickCount={getTickCount()}
          />
          <YAxis
            stroke="#6B7280"
            fontSize={12}
            width={60}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "0.375rem",
            }}
            labelStyle={{ color: "#9CA3AF" }}
            itemStyle={{ color: "#D1D5DB" }}
            labelFormatter={(label) => new Date(label).toLocaleString()}
            formatter={(value: number) => [value.toLocaleString(), "Balance"]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
