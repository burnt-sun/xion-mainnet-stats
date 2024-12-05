import { useQuery } from "@tanstack/react-query";
import { HoldersData } from "@/types/holders";

export const TotalHoldersCard = () => {
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
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
  });

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
          <p className="text-xs text-gray-500 mt-1">
            Last updated:{" "}
            {new Date(holdersData.snapshots[0].timestamp).toLocaleString()}
          </p>
        </>
      ) : null}
    </div>
  );
};
