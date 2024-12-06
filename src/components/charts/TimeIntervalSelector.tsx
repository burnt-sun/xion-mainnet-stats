import { TimeInterval } from "./TimeSeriesChart";

interface TimeIntervalSelectorProps {
  value: TimeInterval;
  onChange: (interval: TimeInterval) => void;
}

export const TimeIntervalSelector = ({
  value,
  onChange,
}: TimeIntervalSelectorProps) => {
  const intervals: TimeInterval[] = ["1h", "24h", "7d", "all"];

  return (
    <div className="flex gap-2">
      {intervals.map((interval) => (
        <button
          key={interval}
          onClick={() => onChange(interval)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            value === interval
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {interval}
        </button>
      ))}
    </div>
  );
};
