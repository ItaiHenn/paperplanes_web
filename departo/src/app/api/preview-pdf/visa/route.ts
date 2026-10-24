import { NextResponse } from "next/server";
import { generateVisaTripPlanPdf } from "@/lib/pdf-visa";
import { dummyVisaPlan } from "@/lib/dummy-data";

function pdfFilename(applicantName: string): string {
  const name = applicantName.replace(/\s+/g, "");
  let digits = "";
  for (let i = 0; i < 12; i++) digits += Math.floor(Math.random() * 10);
  return `itinerary-${digits}-${name}.pdf`;
}

export async function GET() {
  const pdf = await generateVisaTripPlanPdf(dummyVisaPlan);
  const filename = pdfFilename(dummyVisaPlan.applicantName);
  return new NextResponse(pdf as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
