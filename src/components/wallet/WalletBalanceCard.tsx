import { useQuery } from "@tanstack/react-query";
import { WalletBalance } from "@/types/wallet";

interface WalletBalanceCardProps {
  address: string;
  label: string;
}

export const WalletBalanceCard = ({
  address,
  label,
}: WalletBalanceCardProps) => {
  const { data, isLoading, error } = useQuery<WalletBalance>({
    queryKey: ["wallet-balance", address],
    queryFn: async () => {
      const response = await fetch(`/api/wallet-balance?address=${address}`);
      if (!response.ok) throw new Error("Failed to fetch wallet data");
      return response.json();
    },
    refetchInterval: 5 * 60 * 1000,
    refetchIntervalInBackground: false,
  });

  if (error) return <div className="text-red-400">Error loading balance</div>;
  if (isLoading) return <div className="text-gray-400">Loading...</div>;

  const balance = data?.balance ? parseInt(data.balance) / 1000000 : 0;

  return (
    <div className="p-4 border border-gray-700 rounded-lg shadow-lg bg-gray-800">
      <h3 className="font-bold text-lg text-gray-100">{label}</h3>
      <p className="text-sm text-gray-400">{address}</p>
      <p className="mt-2 text-gray-200">
        Balance: {balance.toLocaleString()} XION
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Last updated:{" "}
        {data?.created_at ? new Date(data.created_at).toLocaleString() : "N/A"}
      </p>
    </div>
  );
};
