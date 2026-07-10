import { NextResponse } from "next/server";
import { generateFlightTicketPdf, pdfFilename } from "@/lib/pdf-flight";
import { dummyFlight } from "@/lib/dummy-data";

export async function GET() {
  const pdf = await generateFlightTicketPdf(dummyFlight);
  const filename = pdfFilename(dummyFlight.passengerName);
  return new NextResponse(pdf as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
