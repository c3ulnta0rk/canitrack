import { NextResponse } from "next/server";
import { getTeamsWithDetails } from "@/lib/db/database";

export async function GET() {
  try {
    const teams = getTeamsWithDetails();
    return NextResponse.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}
