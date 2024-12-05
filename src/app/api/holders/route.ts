import { NextResponse } from "next/server";
import supabase from "../../../utils/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const snapshot = searchParams.get("snapshot") === "true";

  try {
    let query = supabase
      .from("Xion Holders")
      .select("total_holders, updated_at")
      .order("updated_at", { ascending: false });

    if (!snapshot) {
      query = query.limit(1);
    }

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "No holder data found" },
        { status: 404 }
      );
    }

    if (snapshot) {
      return NextResponse.json({
        snapshots: data.map((record) => ({
          timestamp: record.updated_at,
          total_holders: record.total_holders,
        })),
      });
    }

    return NextResponse.json({
      timestamp: data[0].updated_at,
      total: data[0].total_holders,
      next_key: null,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
