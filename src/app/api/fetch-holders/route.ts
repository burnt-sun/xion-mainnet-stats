import { NextResponse } from "next/server";
import axios from "axios";
import supabase from "../../../utils/supabase";
import { Owner, PaginatedResponse } from "@/types/holders";

const API_ENDPOINT =
  "https://api.xion-mainnet-1.burnt.com/cosmos/bank/v1beta1/denom_owners/uxion";

const fetchAllOwners = async (): Promise<{
  denom_owners: Owner[];
  pagination: {
    next_key: string | null;
    total: string;
  };
}> => {
  const response: { data: PaginatedResponse } = await axios.get(API_ENDPOINT);

  const { denom_owners, pagination } = response.data;
  return { denom_owners, pagination };
};

export async function GET() {
  try {
    const owners = await fetchAllOwners();

    const { error } = await supabase.from("Xion Holders").insert({
      total_holders: owners.pagination.total,
      data: owners.denom_owners,
    });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      total: owners.pagination.total,
      message: "Data successfully stored in Supabase",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
