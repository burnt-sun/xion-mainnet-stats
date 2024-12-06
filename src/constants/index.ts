export const MONITORED_WALLETS = [
  {
    address: "xion1rzh8e2n4p59vdgtcdnjef9rlwp6y950fytheme",
    label: "Airdrop Wallet",
  },
  {
    address: "xion12q9q752mta5fvwjj2uevqpuku9y60j33j9rll0",
    label: "Fee Granter",
  },
] as const;

export const API_ENDPOINTS = {
  DENOM_OWNERS:
    "https://api.xion-mainnet-1.burnt.com/cosmos/bank/v1beta1/denom_owners/uxion",
} as const;

export const TIME_INTERVALS = {
  REFETCH: 5 * 60 * 1000, // 5 minutes
  STALE: 5 * 60 * 1000, // 5 minutes
} as const;
