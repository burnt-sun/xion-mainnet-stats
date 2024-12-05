import { useQuery } from "@tanstack/react-query";
import { HoldersData } from "@/types/holders";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const TotalHoldersCard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: holdersData,
    isLoading,
    error,
    refetch,
  } = useQuery<HoldersData>({
    queryKey: ["holders"],
    queryFn: async () => {
      const response = await fetch(`/api/holders?snapshot=true`);
      if (!response.ok) throw new Error("Failed to fetch holders data");
      return response.json();
    },
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
  });

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch("/api/fetch-holders");
      if (!response.ok) throw new Error("Failed to fetch holders data");

      await refetch();
    } catch (error) {
      console.error("Error refreshing holders:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  if (error) return <div className="text-red-400">Error loading holders</div>;
  if (isLoading) return <div className="text-gray-400">Loading...</div>;

  return (
    <div className="p-4 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
      <h3 className="font-bold text-lg text-gray-100">
        Total XION Holders (on-chain)
      </h3>
      {holdersData?.snapshots ? (
        <>
          <p className="mt-2 text-gray-200 text-2xl">
            {parseInt(holdersData.snapshots[0].total_holders).toLocaleString()}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
            <span>
              Last updated:{" "}
              {new Date(holdersData.snapshots[0].timestamp).toLocaleString()}
            </span>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-1 hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50"
              title="Refresh holders"
            >
              <ArrowPathIcon
                className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};
