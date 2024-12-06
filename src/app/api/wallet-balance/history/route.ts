import { NextResponse } from "next/server";
import supabase from "../../../../utils/supabase";
import { TimeInterval } from "@/components/charts/TimeSeriesChart";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");
    const interval = (searchParams.get("interval") || "24h") as TimeInterval;

    if (!address) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    const now = new Date();
    let startTime: Date;

    switch (interval) {
      case "1h":
        startTime = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case "24h":
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "7d":
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "all":
        startTime = new Date(0); // Beginning of time
        break;
      default:
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    const { data, error } = await supabase
      .from("feegrant_balance")
      .select("*")
      .eq("address", address)
      .gte("created_at", startTime.toISOString())
      .order("created_at", { ascending: true });

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
