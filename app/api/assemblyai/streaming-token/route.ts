import { NextResponse } from "next/server";
import { mintStreamingToken } from "@/lib/assemblyai";

export async function GET() {
  try {
    const token = await mintStreamingToken();
    return NextResponse.json(token);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Token request failed" },
      { status: 500 },
    );
  }
}

