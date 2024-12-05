"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Owner } from "@/types/holders";

interface HolderSnapshot {
  timestamp: string;
  total_holders: string;
  holders: Owner[];
}

interface HoldersData {
  snapshots: HolderSnapshot[];
}

const Dashboard = () => {
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
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Xion Network Dashboard</h1>

      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      <div className="mt-4">
        {error ? (
          <p className="text-red-500">Error: {(error as Error).message}</p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : holdersData?.snapshots ? (
          <div>
            <p className="text-xl">
              Current Holders of Xion: {holdersData.snapshots[0].total_holders}
            </p>
            <p className="text-sm text-gray-600">
              Last updated:{" "}
              {new Date(holdersData.snapshots[0].timestamp).toLocaleString()}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
