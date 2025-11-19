import { NextResponse } from "next/server";
import { getRacesWithResults } from "@/lib/db/database";

export async function GET() {
  try {
    const races = getRacesWithResults();
    return NextResponse.json(races);
  } catch (error) {
    console.error("Error fetching races:", error);
    return NextResponse.json(
      { error: "Failed to fetch races" },
      { status: 500 }
    );
  }
}
