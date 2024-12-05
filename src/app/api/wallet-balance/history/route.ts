import { NextResponse } from "next/server";
import supabase from "../../../../utils/supabase";

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

    const { data, error } = await supabase
      .from("feegrant_balance")
      .select("*")
      .eq("address", address)
      .order("created_at", { ascending: false })
      .limit(100); // Adjust limit as needed

    if (error) throw error;

    return NextResponse.json(data);
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
