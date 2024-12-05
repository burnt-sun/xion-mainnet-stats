import { useQuery } from "@tanstack/react-query";
import { HoldersData } from "@/types/holders";
import { TimeSeriesChart } from "../charts/TimeSeriesChart";

export const TotalHoldersChart = () => {
  const {
    data: holdersData,
    isLoading,
    error,
  } = useQuery<HoldersData>({
    queryKey: ["holders"],
    queryFn: async () => {
      const response = await fetch(`/api/holders?snapshot=true`);
      if (!response.ok) throw new Error("Failed to fetch holders data");
      return response.json();
    },
  });

  if (error)
    return <div className="text-red-400">Error loading holders history</div>;
  if (isLoading) return <div className="text-gray-400">Loading...</div>;

  const timeSeriesData =
    holdersData?.snapshots.map((snapshot) => ({
      timestamp: snapshot.timestamp,
      value: parseInt(snapshot.total_holders),
    })) || [];

  return (
    <div className="p-4 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
      <h3 className="font-bold text-lg text-gray-100">
        Total Holders - Historical Data
      </h3>
      <TimeSeriesChart data={timeSeriesData} />
    </div>
  );
};
