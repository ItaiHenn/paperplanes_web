import PDFDocument from "pdfkit";
import type { FlightTicketData } from "@/types/documents";

const NAVY = "#1A2B5C";
const GOLD = "#D4AF37";
const LIGHT_GRAY = "#F5F5F5";
const MID_GRAY = "#888888";
const DARK = "#1A1A1A";
const WHITE = "#FFFFFF";

const DISCLAIMER =
  "This document is a travel itinerary prepared for visa application and planning purposes only. " +
  "It is not a valid ticket for boarding or official immigration use.";

function randomDigits(n: number): string {
  let s = "";
  for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10);
  return s;
}

export function pdfFilename(passengerName: string): string {
  const name = passengerName.replace(/\s+/g, "");
  return `itinerary-${randomDigits(12)}-${name}.pdf`;
}

export async function generateFlightTicketPdf(data: FlightTicketData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 0 });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const W = doc.page.width;
    const H = doc.page.height;

    // ── Header band ──────────────────────────────────────────────────────────
    doc.rect(0, 0, W, 90).fill(NAVY);
    doc
      .fillColor(GOLD)
      .font("Helvetica-Bold")
      .fontSize(26)
      .text("DEPARTO", 40, 22);
    doc
      .fillColor(WHITE)
      .font("Helvetica")
      .fontSize(11)
      .text("Flight Ticket Confirmation", 40, 54);

    // Booking ref (top right)
    doc
      .fillColor(GOLD)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(`REF: ${data.bookingRef}`, W - 200, 30, { width: 160, align: "right" });
    doc
      .fillColor(WHITE)
      .font("Helvetica")
      .fontSize(9)
      .text(`Issued: ${data.issuedAt}`, W - 200, 48, { width: 160, align: "right" });

    // Gold accent line
    doc.rect(0, 90, W, 4).fill(GOLD);

    let y = 114;

    // ── Passenger section ─────────────────────────────────────────────────────
    doc.rect(40, y, W - 80, 70).fillAndStroke(LIGHT_GRAY, LIGHT_GRAY);
    doc
      .fillColor(NAVY)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text("PASSENGER DETAILS", 56, y + 10);
    doc
      .fillColor(DARK)
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(data.passengerName, 56, y + 26);
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(MID_GRAY)
      .text(`${data.passengerEmail}  ·  ${data.passengerPhone}`, 56, y + 46);
    if (data.passengerPassport) {
      doc.text(`Passport: ${data.passengerPassport}`, 56, y + 58);
    }

    y += 86;

    // ── Flight segments ───────────────────────────────────────────────────────
    for (const seg of data.segments) {
      // Segment card
      doc.rect(40, y, W - 80, 110).fillAndStroke(WHITE, "#E0E0E0");

      // Airline + flight number bar
      doc.rect(40, y, W - 80, 28).fill(NAVY);
      doc
        .fillColor(WHITE)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text(`${seg.airline}  ·  ${seg.flightNumber}`, 56, y + 9);
      doc
        .fillColor(GOLD)
        .font("Helvetica")
        .fontSize(9)
        .text(seg.cabin, W - 120, y + 9, { width: 80, align: "right" });

      // Origin → Destination layout
      const midY = y + 52;

      doc
        .fillColor(DARK)
        .font("Helvetica-Bold")
        .fontSize(28)
        .text(seg.origin, 56, y + 32);
      doc
        .fillColor(MID_GRAY)
        .font("Helvetica")
        .fontSize(9)
        .text(seg.originCity, 56, y + 64);
      doc.fontSize(8).text(seg.departureDate, 56, y + 76);
      doc
        .fillColor(DARK)
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(seg.departureTime, 56, y + 88);

      // Arrow + duration
      const centerX = W / 2 - 20;
      doc
        .fillColor(GOLD)
        .moveTo(centerX, midY)
        .lineTo(centerX + 100, midY)
        .lineWidth(1.5)
        .stroke();
      doc
        .fillColor(MID_GRAY)
        .font("Helvetica")
        .fontSize(8)
        .text(seg.duration, centerX, midY - 12, { width: 100, align: "center" });
      // arrowhead
      doc
        .fillColor(GOLD)
        .moveTo(centerX + 100, midY - 4)
        .lineTo(centerX + 110, midY)
        .lineTo(centerX + 100, midY + 4)
        .fill();

      const destX = W - 180;
      doc
        .fillColor(DARK)
        .font("Helvetica-Bold")
        .fontSize(28)
        .text(seg.destination, destX, y + 32);
      doc
        .fillColor(MID_GRAY)
        .font("Helvetica")
        .fontSize(9)
        .text(seg.destinationCity, destX, y + 64);
      doc.fontSize(8).text(seg.arrivalDate, destX, y + 76);
      doc
        .fillColor(DARK)
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(seg.arrivalTime, destX, y + 88);

      if (seg.seatNumber) {
        doc
          .fillColor(NAVY)
          .font("Helvetica-Bold")
          .fontSize(9)
          .text(`Seat: ${seg.seatNumber}`, W - 120, y + 88, { width: 80, align: "right" });
      }

      y += 126;
    }

    // ── Price table ───────────────────────────────────────────────────────────
    y += 8;
    doc
      .fillColor(NAVY)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("FARE BREAKDOWN", 40, y);
    y += 18;

    const priceRows = [
      ["Base Fare", `${data.price.currency} ${data.price.baseFare.toFixed(2)}`],
      ["Taxes & Fees", `${data.price.currency} ${data.price.taxes.toFixed(2)}`],
    ];
    for (const [label, val] of priceRows) {
      doc
        .fillColor(DARK)
        .font("Helvetica")
        .fontSize(10)
        .text(label, 56, y);
      doc.text(val, W - 200, y, { width: 160, align: "right" });
      y += 18;
    }
    // total line
    doc.rect(40, y, W - 80, 1).fill(NAVY);
    y += 8;
    doc
      .fillColor(NAVY)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("Total", 56, y);
    doc.text(
      `${data.price.currency} ${data.price.total.toFixed(2)}`,
      W - 200, y, { width: 160, align: "right" }
    );

    // ── Footer ────────────────────────────────────────────────────────────────
    const footerY = H - 60;
    doc.rect(0, footerY - 10, W, 70).fill(NAVY);
    doc
      .fillColor(WHITE)
      .font("Helvetica")
      .fontSize(7)
      .text(DISCLAIMER, 40, footerY, { width: W - 80, align: "center" });
    doc
      .fillColor(GOLD)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text("Departo — premium travel documents, simplified.", 40, footerY + 20, {
        width: W - 80,
        align: "center",
      });

    doc.end();
  });
}
