import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { itineraries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { generateItineraryPdf } from "@/lib/pdf";
import type { ItineraryRecord } from "@/lib/amadeus";

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

    const row = rows[0];
    const record: ItineraryRecord = {
      id: row.id,
      passengerName: row.passengerName,
      passengerEmail: row.passengerEmail,
      passengerPhone: row.passengerPhone,
      flightJson: row.flightJson as ItineraryRecord["flightJson"],
      locale: row.locale,
      createdAt: row.createdAt,
    };

    const pdf = await generateItineraryPdf(record);

    return new NextResponse(pdf as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="GlobeTours-${params.id.slice(0, 8)}.pdf"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err) {
    console.error("[itinerary/pdf]", err);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
