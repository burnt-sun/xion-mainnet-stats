export type TimeInterval = "1h" | "24h" | "7d" | "all";

export interface TimeSeriesData {
  timestamp: string;
  value: number;
}
