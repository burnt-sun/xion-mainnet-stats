import { useQuery } from "@tanstack/react-query";
import { HoldersData } from "@/types/holders";
import { TimeSeriesChartWrapper } from "../charts/TimeSeriesChartWrapper";
import { TimeInterval } from "../charts/TimeSeriesChart";
import { useState } from "react";

export const TotalHoldersChart = () => {
  const [timeInterval, setTimeInterval] = useState<TimeInterval>("24h");

  const {
    data: holdersData,
    isLoading,
    error,
  } = useQuery<HoldersData>({
    queryKey: ["holders", timeInterval],
    queryFn: async () => {
      const response = await fetch(
        `/api/holders?snapshot=true&interval=${timeInterval}`
      );
      if (!response.ok) throw new Error("Failed to fetch holders data");
      return response.json();
    },
  });

  const timeSeriesData =
    holdersData?.snapshots.map((snapshot) => ({
      timestamp: snapshot.timestamp,
      value: parseInt(snapshot.total_holders),
    })) || [];

  return (
    <TimeSeriesChartWrapper
      data={timeSeriesData}
      title="Total Holders - Historical Data"
      isLoading={isLoading}
      error={error}
      refetchWithInterval={setTimeInterval}
    />
  );
};
