import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { itineraries } from "@/db/schema";
import { createId } from "@/lib/cuid";

const schema = z.object({
  passengerName: z.string().min(2).max(120),
  passengerEmail: z.string().email(),
  passengerPhone: z.string().min(5).max(30),
  flightOffer: z.record(z.unknown()),
  locale: z.string().min(2).max(5).default("en"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { passengerName, passengerEmail, passengerPhone, flightOffer, locale } =
      parsed.data;

    const id = createId();
    await db.insert(itineraries).values({
      id,
      passengerName,
      passengerEmail,
      passengerPhone,
      flightJson: flightOffer,
      locale,
    });

    return NextResponse.json({ id }, { status: 201 });
  } catch (err) {
    console.error("[itinerary/create]", err);
    return NextResponse.json({ error: "Could not create itinerary" }, { status: 500 });
  }
}
