export interface WalletBalance {
  balance: string;
  address: string;
  created_at: string;
  data: {
    balance: {
      denom: string;
      amount: string;
    };
  };
}
