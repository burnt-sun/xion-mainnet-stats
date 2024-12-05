import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TimeSeriesData {
  timestamp: string;
  value: number;
}

export const TimeSeriesChart = ({ data }: { data: TimeSeriesData[] }) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <div className="h-48 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sortedData}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(time) => new Date(time).toLocaleDateString()}
            stroke="#6B7280"
            fontSize={12}
          />
          <YAxis stroke="#6B7280" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "0.375rem",
            }}
            labelStyle={{ color: "#9CA3AF" }}
            itemStyle={{ color: "#D1D5DB" }}
            labelFormatter={(label) => new Date(label).toLocaleString()}
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
