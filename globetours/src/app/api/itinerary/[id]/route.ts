import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { itineraries } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rows = await db
      .select()
      .from(itineraries)
      .where(eq(itineraries.id, params.id))
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Itinerary not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("[itinerary/get]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
