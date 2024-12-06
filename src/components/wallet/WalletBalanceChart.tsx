import { useQuery } from "@tanstack/react-query";
import { WalletBalance } from "@/types/wallet";
import { TimeSeriesChartWrapper } from "../charts/TimeSeriesChartWrapper";
import { TimeInterval } from "../charts/TimeSeriesChart";
import { useState } from "react";

interface WalletBalanceChartProps {
  address: string;
  label: string;
}

export const WalletBalanceChart = ({
  address,
  label,
}: WalletBalanceChartProps) => {
  const [timeInterval, setTimeInterval] = useState<TimeInterval>("24h");

  const { data, isLoading, error } = useQuery<WalletBalance[]>({
    queryKey: ["wallet-balance-history", address, timeInterval],
    queryFn: async () => {
      const response = await fetch(
        `/api/wallet-balance/history?address=${address}&interval=${timeInterval}`
      );
      if (!response.ok) throw new Error("Failed to fetch wallet data");
      return response.json();
    },
  });

  const timeSeriesData =
    data?.map((entry) => ({
      timestamp: entry.created_at,
      value: parseFloat(entry.balance) / 1_000_000,
    })) || [];

  return (
    <TimeSeriesChartWrapper
      data={timeSeriesData}
      title={`${label} - Historical Data`}
      isLoading={isLoading}
      error={error}
      refetchWithInterval={setTimeInterval}
    />
  );
};
