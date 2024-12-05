import { NextResponse } from "next/server";
import axios from "axios";
import supabase from "../../../utils/supabase";

const BASE_API_URL =
  "https://api.xion-mainnet-1.burnt.com/cosmos/bank/v1beta1/balances/";

interface UxionBalance {
  balance: {
    denom: string;
    amount: string;
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    const response = await axios.get<UxionBalance>(
      `${BASE_API_URL}${address}/by_denom?denom=uxion`
    );

    const balance = response.data.balance.amount;

    // Store in database
    const { error } = await supabase.from("feegrant_balance").insert({
      balance: balance,
      data: response.data,
      address: address,
    });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      address: address,
      balance: balance,
      message: "Wallet data successfully stored in Supabase",
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
