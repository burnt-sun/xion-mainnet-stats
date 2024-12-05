export interface Owner {
  address: string;
  balance: string;
}

export interface HolderSnapshot {
  timestamp: string;
  total_holders: string;
  holders: Owner[];
}

export interface HoldersData {
  snapshots: HolderSnapshot[];
}

export interface PaginatedResponse {
  denom_owners: Owner[];
  pagination: {
    next_key: string | null;
    total: string;
  };
}
