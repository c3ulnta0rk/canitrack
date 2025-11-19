import { NextResponse } from "next/server";
import {
  getTeamWithDetails,
  getResultsByTeam,
  getTeamStats,
} from "@/lib/db/database";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const team = getTeamWithDetails(id);

    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

    const results = getResultsByTeam(id);
    const stats = getTeamStats(id);

    return NextResponse.json({
      team,
      results,
      stats,
    });
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { error: "Failed to fetch team" },
      { status: 500 }
    );
  }
}
