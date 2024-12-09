import { NextRequest, NextResponse } from "next/server";
import { bot } from "@/lib/bot";

export async function POST(req: NextRequest) {
  const body = await req.json();
  bot.processUpdate(body);
  return NextResponse.json({ status: "success" });
}
