"use client";

import { useState } from "react";

interface DocCard {
  id: "flight" | "hotel" | "visa";
  title: string;
  description: string;
  price: string;
  color: string;
  icon: string;
  details: string[];
}

const docs: DocCard[] = [
  {
    id: "flight",
    title: "Flight Ticket",
    description: "Professional flight itinerary confirmation with multi-segment support.",
    price: "$9",
    color: "#1A2B5C",
    icon: "✈️",
    details: [
      "Passenger details & passport info",
      "Multi-leg flight segments with airline logo",
      "Origin → Destination with times & duration",
      "Full fare breakdown (base + taxes)",
      "Booking reference & issue date",
    ],
  },
  {
    id: "hotel",
    title: "Hotel Booking",
    description: "Official-looking hotel booking confirmation for visa applications.",
    price: "$9",
    color: "#2D7D46",
    icon: "🏨",
    details: [
      "Guest details & contact info",
      "Hotel name, address, star rating",
      "Check-in / check-out dates with times",
      "Room type and amenities",
      "Full price summary (per night + taxes)",
    ],
  },
  {
    id: "visa",
    title: "Visa Trip Plan",
    description: "Day-by-day AI-generated itinerary for visa consulate submissions.",
    price: "$9",
    color: "#1A6B6B",
    icon: "🗺️",
    details: [
      "Applicant details & passport info",
      "Trip summary with purpose & dates",
      "Day-by-day schedule (3–5 activities/day)",
      "Activities validated via Google Places",
      "Multi-page auto-layout, estimated budget",
    ],
  },
];

export default function DevPreviewPage() {
  const [loading, setLoading] = useState<string | null>(null);

  async function openPdf(id: string) {
    setLoading(id);
    try {
      const res = await fetch(`/api/preview-pdf/${id}`);
      if (!res.ok) throw new Error(await res.text());
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      alert(`PDF generation failed: ${err}`);
    } finally {
      setLoading(null);
    }
  }

  async function downloadPdf(id: string) {
    setLoading(id + "-dl");
    try {
      const res = await fetch(`/api/preview-pdf/${id}`);
      if (!res.ok) throw new Error(await res.text());
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `departo-preview-${id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Download failed: ${err}`);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#0f1724", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "#1A2B5C",
          borderBottom: "4px solid #D4AF37",
          padding: "24px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ color: "#D4AF37", fontWeight: 700, fontSize: 28 }}>DEPARTO</div>
          <div style={{ color: "#ffffff99", fontSize: 13, marginTop: 4 }}>
            Design Preview — Internal Only
          </div>
        </div>
        <div
          style={{
            background: "#D4AF3722",
            border: "1px solid #D4AF37",
            color: "#D4AF37",
            padding: "6px 16px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          ⚠ DEV PREVIEW — Not for users
        </div>
      </div>

      {/* Intro */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px 32px" }}>
        <h1 style={{ color: "#ffffff", fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
          PDF Design Review
        </h1>
        <p style={{ color: "#ffffff80", fontSize: 15, lineHeight: 1.6, maxWidth: 640 }}>
          Three document types with dummy data. Click any card to preview the PDF in a new tab,
          or download it. Once you approve the designs, set{" "}
          <code style={{ background: "#1A2B5C", padding: "2px 8px", borderRadius: 4, color: "#D4AF37" }}>
            DESIGN_APPROVED=true
          </code>{" "}
          to unlock production generation.
        </p>
      </div>

      {/* Document cards */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "0 24px 64px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {docs.map((doc) => (
          <div
            key={doc.id}
            style={{
              background: "#1a2535",
              border: "1px solid #2a3a50",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {/* Card header */}
            <div
              style={{
                background: doc.color,
                padding: "20px 24px",
                borderBottom: "3px solid #D4AF37",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>{doc.icon}</div>
              <div style={{ color: "#ffffff", fontWeight: 700, fontSize: 18 }}>{doc.title}</div>
              <div style={{ color: "#ffffff99", fontSize: 13, marginTop: 4 }}>
                {doc.description}
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: "20px 24px" }}>
              <div style={{ color: "#D4AF37", fontWeight: 700, fontSize: 22, marginBottom: 16 }}>
                {doc.price}
                <span style={{ color: "#ffffff40", fontWeight: 400, fontSize: 13 }}> / document</span>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                {doc.details.map((d, i) => (
                  <li
                    key={i}
                    style={{
                      color: "#ffffffcc",
                      fontSize: 13,
                      padding: "5px 0",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                    }}
                  >
                    <span style={{ color: "#D4AF37", flexShrink: 0 }}>✓</span>
                    {d}
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => openPdf(doc.id)}
                  disabled={loading !== null}
                  style={{
                    flex: 1,
                    background: loading === doc.id ? "#2a3a50" : doc.color,
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 8,
                    padding: "10px 0",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: loading !== null ? "not-allowed" : "pointer",
                    transition: "opacity 0.15s",
                    opacity: loading !== null && loading !== doc.id ? 0.5 : 1,
                  }}
                >
                  {loading === doc.id ? "Generating…" : "Preview PDF"}
                </button>
                <button
                  onClick={() => downloadPdf(doc.id)}
                  disabled={loading !== null}
                  style={{
                    flex: 1,
                    background: "transparent",
                    color: "#D4AF37",
                    border: "1px solid #D4AF37",
                    borderRadius: 8,
                    padding: "10px 0",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: loading !== null ? "not-allowed" : "pointer",
                    opacity: loading !== null && loading !== doc.id + "-dl" ? 0.5 : 1,
                  }}
                >
                  {loading === doc.id + "-dl" ? "Downloading…" : "Download"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dummy data note */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto 64px",
          padding: "0 24px",
          background: "#1a2535",
          border: "1px solid #2a3a50",
          borderRadius: 12,
        }}
      >
        <div style={{ padding: "24px" }}>
          <div style={{ color: "#D4AF37", fontWeight: 700, marginBottom: 12 }}>
            Dummy data used in previews
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            <div>
              <div style={{ color: "#ffffff80", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                Flight
              </div>
              <div style={{ color: "#ffffffcc", fontSize: 13 }}>
                JFK → DXB → BKK<br />
                Emirates EK201 + EK521<br />
                15–17 Sep 2026, Economy<br />
                USD 709.50 total
              </div>
            </div>
            <div>
              <div style={{ color: "#ffffff80", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                Hotel
              </div>
              <div style={{ color: "#ffffffcc", fontSize: 13 }}>
                Mandarin Oriental Bangkok ★★★★★<br />
                17–24 Sep 2026 (7 nights)<br />
                Deluxe River View, King Bed<br />
                USD 2,352 total
              </div>
            </div>
            <div>
              <div style={{ color: "#ffffff80", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
                Visa Trip Plan
              </div>
              <div style={{ color: "#ffffffcc", fontSize: 13 }}>
                Thailand, 7 days<br />
                Bangkok × 3 days + Ayutthaya day trip<br />
                4 days, 13 activities total<br />
                Est. budget USD 3,500
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing reference */}
      <div style={{ maxWidth: 900, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ color: "#ffffff60", fontSize: 12, textAlign: "center", marginBottom: 16 }}>
          Planned pricing tiers (for reference)
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
          }}
        >
          {[
            { label: "Single document", price: "$9" },
            { label: "Flight + Hotel bundle", price: "$12" },
            { label: "3-credit pack", price: "$19.90" },
            { label: "3+ hotel pack", price: "$22" },
            { label: "Monthly membership", price: "$25/mo" },
            { label: "Annual plan", price: "$59/yr" },
          ].map((tier) => (
            <div
              key={tier.label}
              style={{
                background: "#1a2535",
                border: "1px solid #2a3a50",
                borderRadius: 8,
                padding: "12px 16px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#D4AF37", fontWeight: 700, fontSize: 18 }}>{tier.price}</div>
              <div style={{ color: "#ffffff60", fontSize: 11, marginTop: 4 }}>{tier.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
