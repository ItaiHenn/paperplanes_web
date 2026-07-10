import type { ItineraryRecord } from "./amadeus";
import type { FlightOffer } from "./amadeus";
import QRCode from "qrcode";

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const h = match[1] ? `${match[1]}h` : "";
  const m = match[2] ? `${match[2]}m` : "";
  return [h, m].filter(Boolean).join(" ");
}

function formatDateTime(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }),
  };
}

function buildHtml(itinerary: ItineraryRecord, qrDataUrl: string): string {
  const flight = itinerary.flightJson as FlightOffer;
  const dep = formatDateTime(flight.departure);
  const arr = formatDateTime(flight.arrival);
  const duration = parseDuration(flight.duration);
  const generatedAt = new Date(itinerary.createdAt).toLocaleDateString("en-GB", {
    day: "2-digit", month: "long", year: "numeric",
  });
  const logoUrl = `https://www.gstatic.com/flights/airline_logos/70px/dark/${flight.airline.code}.png`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const itineraryUrl = `${baseUrl}/en/itinerary/${itinerary.id}`;

  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700;800&display=swap');

  :root {
    --navy: #1A2B5C;
    --gold: #D4AF37;
    --gold-light: #F5E88A;
    --white: #FFFFFF;
    --gray: #F7F8FA;
    --text: #1A1A2E;
    --muted: #6B7280;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Noto Sans', Arial, sans-serif;
    color: var(--text);
    background: var(--white);
    font-size: 12px;
    line-height: 1.5;
  }

  /* ── Header ── */
  .header {
    background: var(--navy);
    padding: 24px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .brand-name {
    font-size: 28px;
    font-weight: 800;
    color: var(--gold);
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .brand-tagline {
    font-size: 10px;
    color: #9BA8C4;
    letter-spacing: 2px;
    margin-top: 2px;
  }
  .header-meta {
    text-align: right;
    color: #9BA8C4;
    font-size: 10px;
  }
  .header-meta strong {
    display: block;
    color: var(--gold);
    font-size: 13px;
    letter-spacing: 1px;
  }

  /* ── Gold divider ── */
  .gold-bar {
    height: 4px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold));
  }

  /* ── Main content ── */
  .content { padding: 24px 32px; }

  /* ── Section ── */
  .section {
    margin-bottom: 20px;
    background: var(--gray);
    border-radius: 8px;
    overflow: hidden;
  }
  .section-header {
    background: var(--navy);
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .section-title {
    color: var(--gold);
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .section-body { padding: 16px; }

  /* ── Passenger row ── */
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
  }
  .info-label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--muted);
    margin-bottom: 2px;
  }
  .info-value {
    font-size: 13px;
    font-weight: 600;
    color: var(--navy);
  }

  /* ── Flight card ── */
  .flight-card {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 16px;
    background: var(--white);
    border-radius: 8px;
    border: 1px solid #E5E7EB;
  }
  .airline-logo-wrap {
    width: 60px;
    flex-shrink: 0;
    text-align: center;
  }
  .airline-logo {
    width: 50px;
    height: 35px;
    object-fit: contain;
  }
  .airline-fallback {
    font-size: 18px;
    font-weight: 800;
    color: var(--navy);
  }
  .airline-name {
    font-size: 9px;
    color: var(--muted);
    margin-top: 2px;
  }
  .route-col {
    flex: 1;
  }
  .route-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }
  .city-block { text-align: center; }
  .iata-code {
    font-size: 22px;
    font-weight: 800;
    color: var(--navy);
    line-height: 1;
  }
  .city-name {
    font-size: 9px;
    color: var(--muted);
    margin-top: 1px;
  }
  .route-arrow {
    flex: 1;
    text-align: center;
    position: relative;
  }
  .route-arrow::before {
    content: '';
    display: block;
    height: 1px;
    background: var(--gold);
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
  }
  .arrow-icon {
    position: relative;
    display: inline-block;
    background: var(--white);
    padding: 0 4px;
    color: var(--gold);
    font-size: 14px;
  }
  .duration-badge {
    font-size: 9px;
    color: var(--muted);
    text-align: center;
    margin-top: 2px;
  }
  .times-row {
    display: flex;
    gap: 12px;
  }
  .time-block { }
  .time-label {
    font-size: 9px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .time-value {
    font-size: 15px;
    font-weight: 700;
    color: var(--text);
  }
  .time-date {
    font-size: 9px;
    color: var(--muted);
  }
  .time-sep {
    padding: 0 4px;
    color: #D1D5DB;
    line-height: 40px;
    font-size: 18px;
  }
  .flight-meta {
    font-size: 9px;
    color: var(--muted);
    margin-top: 6px;
  }

  /* ── Price table ── */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  thead th {
    background: var(--navy);
    color: var(--gold);
    padding: 8px 12px;
    text-align: left;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  tbody td {
    padding: 8px 12px;
    border-bottom: 1px solid #E5E7EB;
    color: var(--text);
  }
  tbody tr:nth-child(even) td { background: var(--white); }
  .total-row td {
    font-weight: 700;
    font-size: 14px;
    color: var(--navy);
    border-top: 2px solid var(--gold);
    border-bottom: none;
    padding-top: 10px;
  }
  .amount { text-align: right; font-weight: 600; }

  /* ── QR + booking ref ── */
  .qr-section {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 16px;
    background: var(--gray);
    border-radius: 8px;
    border: 1px dashed #D1D5DB;
  }
  .qr-image { width: 90px; height: 90px; }
  .booking-info .label {
    font-size: 9px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .booking-ref {
    font-size: 18px;
    font-weight: 800;
    color: var(--navy);
    letter-spacing: 2px;
    font-family: monospace;
  }
  .booking-url {
    font-size: 9px;
    color: var(--muted);
    margin-top: 4px;
    word-break: break-all;
  }

  /* ── Footer ── */
  .footer {
    background: var(--navy);
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }
  .footer-brand {
    color: var(--gold);
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 2px;
  }
  .footer-contact {
    color: #9BA8C4;
    font-size: 9px;
    text-align: center;
  }
  .footer-disclaimer {
    color: #6B7280;
    font-size: 8px;
    text-align: right;
    max-width: 200px;
  }
</style>
</head>
<body>

<!-- HEADER -->
<div class="header">
  <div>
    <div class="brand-name">GlobeTours</div>
    <div class="brand-tagline">YOUR WORLD · YOUR JOURNEY</div>
  </div>
  <div class="header-meta">
    <strong>FLIGHT ITINERARY</strong>
    Generated ${generatedAt}
  </div>
</div>
<div class="gold-bar"></div>

<div class="content">

  <!-- BOOKING REFERENCE -->
  <div class="section" style="margin-bottom: 20px;">
    <div class="section-header">
      <span class="section-title">Booking Reference</span>
    </div>
    <div class="section-body">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <div class="info-label">Reference Number</div>
          <div style="font-size: 20px; font-weight: 800; color: var(--navy); letter-spacing: 3px; font-family: monospace;">${itinerary.id.toUpperCase().slice(0, 12)}</div>
        </div>
        <div style="text-align: right;">
          <div class="info-label">Status</div>
          <div style="color: #059669; font-weight: 700; font-size: 13px;">&#10003; CONFIRMED</div>
        </div>
      </div>
    </div>
  </div>

  <!-- PASSENGER -->
  <div class="section">
    <div class="section-header">
      <span class="section-title">Passenger Details</span>
    </div>
    <div class="section-body">
      <div class="info-grid">
        <div>
          <div class="info-label">Full Name</div>
          <div class="info-value">${itinerary.passengerName}</div>
        </div>
        <div>
          <div class="info-label">Email</div>
          <div class="info-value" style="font-size: 11px;">${itinerary.passengerEmail}</div>
        </div>
        <div>
          <div class="info-label">Phone</div>
          <div class="info-value">${itinerary.passengerPhone}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- FLIGHT -->
  <div class="section">
    <div class="section-header">
      <span class="section-title">Flight Summary</span>
    </div>
    <div class="section-body">
      <div class="flight-card">
        <div class="airline-logo-wrap">
          <img class="airline-logo" src="${logoUrl}"
               onerror="this.style.display='none';this.nextSibling.style.display='block'"
               alt="${flight.airline.code}" />
          <div class="airline-fallback" style="display:none">${flight.airline.code}</div>
          <div class="airline-name">${flight.airline.name}</div>
        </div>

        <div class="route-col">
          <div class="route-row">
            <div class="city-block">
              <div class="iata-code">${flight.origin.iata}</div>
              <div class="city-name">${flight.origin.city}</div>
              <div class="city-name">${flight.origin.country}</div>
            </div>
            <div class="route-arrow">
              <span class="arrow-icon">&#9992;</span>
              <div class="duration-badge">${duration}</div>
            </div>
            <div class="city-block">
              <div class="iata-code">${flight.destination.iata}</div>
              <div class="city-name">${flight.destination.city}</div>
              <div class="city-name">${flight.destination.country}</div>
            </div>
          </div>

          <div class="times-row">
            <div class="time-block">
              <div class="time-label">Departure</div>
              <div class="time-value">${dep.time}</div>
              <div class="time-date">${dep.date}</div>
            </div>
            <div class="time-sep">–</div>
            <div class="time-block">
              <div class="time-label">Arrival</div>
              <div class="time-value">${arr.time}</div>
              <div class="time-date">${arr.date}</div>
            </div>
          </div>

          <div class="flight-meta">
            Flight ${flight.flightNumber} &nbsp;·&nbsp; ${flight.segments === 1 ? "Non-stop" : `${flight.segments} stops`}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- PRICE BREAKDOWN -->
  <div class="section">
    <div class="section-header">
      <span class="section-title">Price Breakdown</span>
    </div>
    <div class="section-body" style="padding: 0;">
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th class="amount">Amount (${flight.price.currency})</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Base Fare</td>
            <td class="amount">${flight.price.currency} ${flight.price.base}</td>
          </tr>
          <tr>
            <td>Taxes &amp; Fees</td>
            <td class="amount">${flight.price.currency} ${flight.price.taxes}</td>
          </tr>
          <tr class="total-row">
            <td>Total</td>
            <td class="amount">${flight.price.currency} ${flight.price.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- QR CODE -->
  <div class="qr-section">
    <img class="qr-image" src="${qrDataUrl}" alt="QR Code" />
    <div class="booking-info">
      <div class="label">Scan to view online</div>
      <div class="booking-ref">${itinerary.id.toUpperCase().slice(0, 12)}</div>
      <div class="booking-url">${itineraryUrl}</div>
    </div>
  </div>

</div>

<!-- FOOTER -->
<div class="gold-bar"></div>
<div class="footer">
  <div class="footer-brand">GLOBETOURS</div>
  <div class="footer-contact">
    contact@globetours.com &nbsp;|&nbsp; +1 800 GLOBE
  </div>
  <div class="footer-disclaimer">
    This document is for reference only and does not constitute a ticket.
  </div>
</div>

</body>
</html>`;
}

export async function generateItineraryPdf(itinerary: ItineraryRecord): Promise<Buffer> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const qrDataUrl = await QRCode.toDataURL(
    `${baseUrl}/en/itinerary/${itinerary.id}`,
    { width: 180, margin: 1 }
  );

  const html = buildHtml(itinerary, qrDataUrl);

  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.default.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
    headless: true,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0", timeout: 30_000 });
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
  });
  await browser.close();

  return Buffer.from(pdf);
}
