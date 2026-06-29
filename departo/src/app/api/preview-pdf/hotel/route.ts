import { NextResponse } from "next/server";
import { generateHotelBookingPdf } from "@/lib/pdf-hotel";
import { dummyHotel } from "@/lib/dummy-data";

function pdfFilename(guestName: string): string {
  const name = guestName.replace(/\s+/g, "");
  let digits = "";
  for (let i = 0; i < 12; i++) digits += Math.floor(Math.random() * 10);
  return `itinerary-${digits}-${name}.pdf`;
}

export async function GET() {
  const pdf = await generateHotelBookingPdf(dummyHotel);
  const filename = pdfFilename(dummyHotel.guestName);
  return new NextResponse(pdf as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
