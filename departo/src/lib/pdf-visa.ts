import PDFDocument from "pdfkit";
import type { VisaTripPlanData } from "@/types/documents";

const NAVY = "#1A2B5C";
const GOLD = "#D4AF37";
const LIGHT_GRAY = "#F5F5F5";
const MID_GRAY = "#888888";
const DARK = "#1A1A1A";
const WHITE = "#FFFFFF";
const TEAL = "#1A6B6B";

const DISCLAIMER =
  "This document is a travel itinerary prepared for visa application and planning purposes only. " +
  "It is not a valid ticket for boarding or official immigration use.";

export async function generateVisaTripPlanPdf(data: VisaTripPlanData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 0, autoFirstPage: true });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const W = doc.page.width;
    const H = doc.page.height;

    function drawHeader(pageDoc: PDFKit.PDFDocument) {
      pageDoc.rect(0, 0, W, 90).fill(NAVY);
      pageDoc.fillColor(GOLD).font("Helvetica-Bold").fontSize(26).text("DEPARTO", 40, 22);
      pageDoc
        .fillColor(WHITE)
        .font("Helvetica")
        .fontSize(11)
        .text("Visa Trip Plan", 40, 54);
      pageDoc
        .fillColor(GOLD)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(`REF: ${data.bookingRef}`, W - 200, 30, { width: 160, align: "right" });
      pageDoc
        .fillColor(WHITE)
        .font("Helvetica")
        .fontSize(9)
        .text(`Issued: ${data.issuedAt}`, W - 200, 48, { width: 160, align: "right" });
      pageDoc.rect(0, 90, W, 4).fill(GOLD);
    }

    function drawFooter(pageDoc: PDFKit.PDFDocument) {
      const footerY = H - 60;
      pageDoc.rect(0, footerY - 10, W, 70).fill(NAVY);
      pageDoc
        .fillColor(WHITE)
        .font("Helvetica")
        .fontSize(7)
        .text(DISCLAIMER, 40, footerY, { width: W - 80, align: "center" });
      pageDoc
        .fillColor(GOLD)
        .font("Helvetica-Bold")
        .fontSize(9)
        .text("Departo — premium travel documents, simplified.", 40, footerY + 20, {
          width: W - 80,
          align: "center",
        });
    }

    drawHeader(doc);

    let y = 114;
    const CONTENT_BOTTOM = H - 80;

    function ensureSpace(needed: number) {
      if (y + needed > CONTENT_BOTTOM) {
        drawFooter(doc);
        doc.addPage({ size: "A4", margin: 0 });
        drawHeader(doc);
        y = 114;
      }
    }

    // ── Applicant info ────────────────────────────────────────────────────────
    doc.rect(40, y, W - 80, 80).fillAndStroke(LIGHT_GRAY, LIGHT_GRAY);
    doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(10).text("APPLICANT DETAILS", 56, y + 10);
    doc.fillColor(DARK).font("Helvetica-Bold").fontSize(14).text(data.applicantName, 56, y + 26);
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(MID_GRAY)
      .text(`${data.applicantEmail}  ·  ${data.applicantPhone}`, 56, y + 46);
    const passportLine = [
      data.passportNumber ? `Passport: ${data.passportNumber}` : null,
      data.nationality ? `Nationality: ${data.nationality}` : null,
    ]
      .filter(Boolean)
      .join("  ·  ");
    if (passportLine) {
      doc.text(passportLine, 56, y + 60);
    }
    y += 96;

    // ── Trip summary ──────────────────────────────────────────────────────────
    doc.rect(40, y, W - 80, 80).fillAndStroke(WHITE, "#E0E0E0");
    doc.rect(40, y, W - 80, 28).fill(TEAL);
    doc
      .fillColor(WHITE)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(data.tripTitle, 56, y + 9);
    doc
      .fillColor(DARK)
      .font("Helvetica")
      .fontSize(10)
      .text(`Destination: ${data.destinationCountry}`, 56, y + 38);
    doc.text(`Purpose: ${data.purpose}`, 56, y + 54);
    doc.text(`${data.departureDate} → ${data.returnDate}  (${data.totalDays} days)`, W - 280, y + 38, {
      width: 240,
      align: "right",
    });
    doc.text(`Accommodation: ${data.accommodation}`, W - 280, y + 54, { width: 240, align: "right" });
    y += 96;

    // ── Day-by-day itinerary ──────────────────────────────────────────────────
    doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(13).text("DAY-BY-DAY ITINERARY", 40, y);
    y += 20;

    for (let d = 0; d < data.days.length; d++) {
      const day = data.days[d];
      const dayHeight = 36 + day.activities.length * 58;
      ensureSpace(dayHeight);

      // Day header
      doc.rect(40, y, W - 80, 28).fill(NAVY);
      doc
        .fillColor(GOLD)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(`DAY ${d + 1}  —  ${day.date}  ·  ${day.city}`, 56, y + 9);
      y += 32;

      for (const act of day.activities) {
        ensureSpace(56);
        doc.rect(40, y, 4, 48).fill(GOLD);
        doc
          .fillColor(TEAL)
          .font("Helvetica-Bold")
          .fontSize(9)
          .text(act.time, 52, y + 4);
        doc
          .fillColor(DARK)
          .font("Helvetica-Bold")
          .fontSize(10)
          .text(act.name, 52, y + 16);
        doc
          .fillColor(MID_GRAY)
          .font("Helvetica")
          .fontSize(8)
          .text(act.description, 52, y + 29, { width: W - 200 });
        doc
          .fillColor(MID_GRAY)
          .fontSize(8)
          .text(`📍 ${act.location}  ·  ${act.duration}`, W - 200, y + 29, {
            width: 158,
            align: "right",
          });
        y += 56;
      }
      y += 8;
    }

    if (data.estimatedBudget) {
      ensureSpace(36);
      doc
        .fillColor(NAVY)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(`Estimated Budget: ${data.estimatedBudget}`, 40, y);
      y += 20;
    }

    drawFooter(doc);
    doc.end();
  });
}
