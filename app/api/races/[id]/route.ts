import { NextResponse } from "next/server";
import { getRaceWithResults } from "@/lib/db/database";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const race = getRaceWithResults(id);

    if (!race) {
      return NextResponse.json({ error: "Race not found" }, { status: 404 });
    }

    return NextResponse.json(race);
  } catch (error) {
    console.error("Error fetching race:", error);
    return NextResponse.json(
      { error: "Failed to fetch race" },
      { status: 500 }
    );
  }
}
