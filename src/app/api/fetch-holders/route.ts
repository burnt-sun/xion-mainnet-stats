import { NextResponse } from "next/server";
import axios from "axios";
import supabase from "../../../utils/supabase";
import { Owner, PaginatedResponse } from "@/types/holders";

const API_ENDPOINT =
  "https://api.xion-mainnet-1.burnt.com/cosmos/bank/v1beta1/denom_owners/uxion";

const fetchAllOwners = async (): Promise<Owner[]> => {
  let allOwners: Owner[] = [];
  let nextKey: string | null = null;

  while (true) {
    const response: { data: PaginatedResponse } = await axios.get(
      API_ENDPOINT,
      {
        params: nextKey ? { "pagination.key": nextKey } : {},
      }
    );

    const { denom_owners, pagination } = response.data;
    allOwners = [...allOwners, ...denom_owners];

    if (!pagination?.next_key) break;
    nextKey = pagination.next_key;
  }

  return allOwners;
};

export async function GET() {
  try {
    const owners = await fetchAllOwners();

    const { error } = await supabase.from("Xion Holders").insert({
      total_holders: owners.length.toString(),
      data: owners,
    });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      total: owners.length,
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
