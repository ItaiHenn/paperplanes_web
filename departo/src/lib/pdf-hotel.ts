import PDFDocument from "pdfkit";
import type { HotelBookingData } from "@/types/documents";

const NAVY = "#1A2B5C";
const GOLD = "#D4AF37";
const LIGHT_GRAY = "#F5F5F5";
const MID_GRAY = "#888888";
const DARK = "#1A1A1A";
const WHITE = "#FFFFFF";
const GREEN = "#2D7D46";

const DISCLAIMER =
  "This document is a travel itinerary prepared for visa application and planning purposes only. " +
  "It is not a valid ticket for boarding or official immigration use.";

const CONF_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ";

export function generateHotelConfNum(): string {
  // Format: XXX-NNNNNNN  (3 letters dash 7 digits — looks like hotel systems)
  let prefix = "";
  for (let i = 0; i < 3; i++) prefix += CONF_CHARS[Math.floor(Math.random() * CONF_CHARS.length)];
  let digits = "";
  for (let i = 0; i < 7; i++) digits += Math.floor(Math.random() * 10);
  return `${prefix}-${digits}`;
}

export async function generateHotelBookingPdf(data: HotelBookingData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 0 });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const W = doc.page.width;
    const H = doc.page.height;

    // ── Header ────────────────────────────────────────────────────────────────
    doc.rect(0, 0, W, 90).fill(NAVY);
    doc.fillColor(GOLD).font("Helvetica-Bold").fontSize(26).text("DEPARTO", 40, 22);
    doc.fillColor(WHITE).font("Helvetica").fontSize(11).text("Hotel Booking Confirmation", 40, 54);
    doc
      .fillColor(WHITE)
      .font("Helvetica")
      .fontSize(8)
      .text("BOOKING REF", W - 200, 18, { width: 160, align: "right" });
    doc
      .fillColor(GOLD)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(data.bookingRef, W - 200, 29, { width: 160, align: "right" });
    doc
      .fillColor(WHITE)
      .font("Helvetica")
      .fontSize(8)
      .text(`Issued: ${data.issuedAt}`, W - 200, 46, { width: 160, align: "right" });
    doc.rect(0, 90, W, 4).fill(GOLD);

    let y = 114;

    // ── Confirmation number banner ────────────────────────────────────────────
    const confirmNum = data.hotelConfirmationNumber || generateHotelConfNum();
    doc.rect(40, y, W - 80, 48).fill(GREEN);
    doc
      .fillColor(WHITE)
      .font("Helvetica")
      .fontSize(9)
      .text("HOTEL CONFIRMATION NUMBER", 56, y + 8);
    doc
      .fillColor(WHITE)
      .font("Helvetica-Bold")
      .fontSize(24)
      .text(confirmNum, 56, y + 20);
    doc
      .fillColor("#ffffff99")
      .font("Helvetica")
      .fontSize(8)
      .text("Quote this number when contacting the hotel", W - 280, y + 26, {
        width: 224,
        align: "right",
      });
    y += 60;

    // ── Guest info ────────────────────────────────────────────────────────────
    doc.rect(40, y, W - 80, 60).fillAndStroke(LIGHT_GRAY, LIGHT_GRAY);
    doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(10).text("GUEST DETAILS", 56, y + 10);
    doc.fillColor(DARK).font("Helvetica-Bold").fontSize(14).text(data.guestName, 56, y + 26);
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(MID_GRAY)
      .text(`${data.guestEmail}  ·  ${data.guestPhone}`, 56, y + 44);
    y += 76;

    // ── Hotel card ────────────────────────────────────────────────────────────
    doc.rect(40, y, W - 80, 120).fillAndStroke(WHITE, "#E0E0E0");
    doc.rect(40, y, W - 80, 30).fill(NAVY);
    doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(11).text(data.hotelName, 56, y + 10);

    // Stars
    const stars = "★".repeat(data.hotelStars) + "☆".repeat(5 - data.hotelStars);
    doc
      .fillColor(GOLD)
      .font("Helvetica")
      .fontSize(10)
      .text(stars, W - 160, y + 10, { width: 120, align: "right" });

    doc
      .fillColor(DARK)
      .font("Helvetica")
      .fontSize(10)
      .text(data.hotelAddress, 56, y + 40);
    doc
      .fillColor(MID_GRAY)
      .fontSize(9)
      .text(`${data.hotelCity}, ${data.hotelCountry}`, 56, y + 56);
    if (data.hotelPhone) {
      doc.text(`Tel: ${data.hotelPhone}`, 56, y + 70);
    }

    // Room type
    doc
      .fillColor(NAVY)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text("ROOM TYPE", 56, y + 88);
    doc
      .fillColor(DARK)
      .font("Helvetica")
      .fontSize(10)
      .text(
        `${data.room.type}  ·  ${data.room.beds}${data.room.view ? "  ·  " + data.room.view : ""}`,
        56, y + 101
      );
    y += 136;

    // ── Check-in / Check-out ──────────────────────────────────────────────────
    const colW = (W - 80) / 2 - 5;
    // Check-in box
    doc.rect(40, y, colW, 70).fillAndStroke(LIGHT_GRAY, LIGHT_GRAY);
    doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(9).text("CHECK-IN", 56, y + 10);
    doc.fillColor(DARK).font("Helvetica-Bold").fontSize(18).text(data.checkIn, 56, y + 26);
    doc.fillColor(MID_GRAY).font("Helvetica").fontSize(9).text("from 14:00", 56, y + 50);

    // Check-out box
    const col2X = 40 + colW + 10;
    doc.rect(col2X, y, colW, 70).fillAndStroke(LIGHT_GRAY, LIGHT_GRAY);
    doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(9).text("CHECK-OUT", col2X + 16, y + 10);
    doc.fillColor(DARK).font("Helvetica-Bold").fontSize(18).text(data.checkOut, col2X + 16, y + 26);
    doc.fillColor(MID_GRAY).font("Helvetica").fontSize(9).text("until 12:00", col2X + 16, y + 50);
    y += 86;

    // Nights badge
    doc
      .fillColor(GREEN)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(`${data.nights} Night${data.nights !== 1 ? "s" : ""}`, 40, y, {
        width: W - 80,
        align: "center",
      });
    y += 20;

    // ── Amenities ─────────────────────────────────────────────────────────────
    if (data.amenities.length > 0) {
      doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(11).text("INCLUDED AMENITIES", 40, y);
      y += 18;
      const amenityText = data.amenities.map((a) => `✓  ${a}`).join("    ");
      doc
        .fillColor(DARK)
        .font("Helvetica")
        .fontSize(9)
        .text(amenityText, 56, y, { width: W - 96 });
      y += 28;
    }

    // ── Price table ───────────────────────────────────────────────────────────
    y += 4;
    doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(11).text("PRICE SUMMARY", 40, y);
    y += 18;

    const rows = [
      [`Per Night (${data.price.currency})`, data.price.perNight.toFixed(2)],
      [`× ${data.nights} Night${data.nights !== 1 ? "s" : ""}`, (data.price.perNight * data.nights).toFixed(2)],
      ["Taxes & Fees", data.price.taxes.toFixed(2)],
    ];
    for (const [label, val] of rows) {
      doc.fillColor(DARK).font("Helvetica").fontSize(10).text(label, 56, y);
      doc.text(`${data.price.currency} ${val}`, W - 200, y, { width: 160, align: "right" });
      y += 18;
    }
    doc.rect(40, y, W - 80, 1).fill(NAVY);
    y += 8;
    doc.fillColor(NAVY).font("Helvetica-Bold").fontSize(11).text("Total", 56, y);
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
