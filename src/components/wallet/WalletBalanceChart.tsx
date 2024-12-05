import { useQuery } from "@tanstack/react-query";
import { WalletBalance } from "@/types/wallet";
import { TimeSeriesChart } from "../charts/TimeSeriesChart";

interface WalletBalanceChartProps {
  address: string;
  label: string;
}

export const WalletBalanceChart = ({
  address,
  label,
}: WalletBalanceChartProps) => {
  const { data, isLoading, error } = useQuery<WalletBalance[]>({
    queryKey: ["wallet-balance-history", address],
    queryFn: async () => {
      const response = await fetch(
        `/api/wallet-balance/history?address=${address}`
      );
      if (!response.ok) throw new Error("Failed to fetch wallet data");
      return response.json();
    },
  });

  if (error)
    return <div className="text-red-400">Error loading balance history</div>;
  if (isLoading) return <div className="text-gray-400">Loading...</div>;

  const timeSeriesData =
    data?.map((entry) => ({
      timestamp: entry.created_at,
      value: parseInt(entry.balance) / 1000000,
    })) || [];

  return (
    <div className="p-4 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
      <h3 className="font-bold text-lg text-gray-100">
        {label} - Historical Balance
      </h3>
      <p className="text-sm text-gray-400">{address}</p>
      <TimeSeriesChart data={timeSeriesData} />
    </div>
  );
};
