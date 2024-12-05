export interface Balance {
  denom: string;
  amount: string;
}

export interface Owner {
  address: string;
  balance: Balance;
}

export interface PaginatedResponse {
  denom_owners: Owner[];
  pagination: {
    next_key: string | null;
    total: string;
  };
}
