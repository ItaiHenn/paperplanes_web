"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { FlightOffer } from "@/lib/amadeus";

interface Itinerary {
  id: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  flightJson: FlightOffer;
  locale: string;
  createdAt: string;
}

function parseDuration(iso: string) {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!m) return iso;
  return [m[1] ? `${m[1]}h` : "", m[2] ? `${m[2]}m` : ""].filter(Boolean).join(" ");
}

export default function ItineraryPage() {
  const t = useTranslations("itinerary");
  const et = useTranslations("errors");
  const { locale, id } = useParams<{ locale: string; id: string }>();

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetch(`/api/itinerary/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error(et("notFound"));
        return r.json();
      })
      .then(setItinerary)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, et]);

  async function downloadPdf() {
    setDownloading(true);
    try {
      const res = await fetch(`/api/itinerary/${id}/pdf`);
      if (!res.ok) throw new Error("PDF generation failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `GlobeTours-${id.slice(0, 8)}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }

  if (loading) return <div style={{ textAlign: "center", padding: 60, color: "#6B7280" }}>Loading...</div>;

  if (error) return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <p style={{ color: "#DC2626", marginBottom: 16 }}>{error}</p>
      <a href={`/${locale}`} style={{ color: "#1A2B5C", textDecoration: "underline" }}>{t("newSearch")}</a>
    </div>
  );

  if (!itinerary) return null;

  const flight = itinerary.flightJson;

  return (
    <div>
      {/* Success banner */}
      <div style={{
        background: "#ECFDF5",
        border: "1px solid #A7F3D0",
        borderRadius: 10,
        padding: "16px 24px",
        marginBottom: 28,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <span style={{ fontSize: 22 }}>✅</span>
        <div>
          <div style={{ fontWeight: 700, color: "#065F46", fontSize: 15 }}>{t("title")}</div>
          <div style={{ color: "#6B7280", fontSize: 12 }}>
            {t("bookingRef")}: <strong style={{ fontFamily: "monospace", letterSpacing: 2 }}>
              {itinerary.id.toUpperCase().slice(0, 12)}
            </strong>
          </div>
        </div>
        <button
          onClick={downloadPdf}
          disabled={downloading}
          style={{
            marginLeft: "auto",
            background: "#1A2B5C",
            color: "#D4AF37",
            border: "none",
            padding: "10px 24px",
            borderRadius: 8,
            fontWeight: 700,
            cursor: downloading ? "not-allowed" : "pointer",
            fontSize: 14,
            opacity: downloading ? 0.7 : 1,
          }}
        >
          {downloading ? t("downloading") : t("downloadBtn")}
        </button>
      </div>

      {/* Itinerary card */}
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ background: "#1A2B5C", padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#D4AF37", fontWeight: 800, fontSize: 20, letterSpacing: 3 }}>GLOBETOURS</div>
            <div style={{ color: "#9BA8C4", fontSize: 10, letterSpacing: 2, marginTop: 2 }}>FLIGHT ITINERARY</div>
          </div>
          <div style={{ color: "#9BA8C4", fontSize: 11, textAlign: "right" }}>
            {t("generatedAt")}: {new Date(itinerary.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}
          </div>
        </div>

        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Passenger */}
          <Section title="Passenger Details">
            <Grid cols={3}>
              <Info label="Full Name" value={itinerary.passengerName} />
              <Info label="Email" value={itinerary.passengerEmail} />
              <Info label="Phone" value={itinerary.passengerPhone} />
            </Grid>
          </Section>

          {/* Flight */}
          <Section title="Flight Summary">
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <img
                  src={`https://www.gstatic.com/flights/airline_logos/70px/dark/${flight.airline.code}.png`}
                  alt={flight.airline.code}
                  style={{ width: 50, height: 35, objectFit: "contain" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>{flight.airline.name}</div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 26, fontWeight: 800, color: "#1A2B5C" }}>{flight.origin.iata}</span>
                  <span style={{ color: "#D4AF37", fontSize: 16 }}>→</span>
                  <span style={{ fontSize: 26, fontWeight: 800, color: "#1A2B5C" }}>{flight.destination.iata}</span>
                </div>
                <div style={{ fontSize: 12, color: "#374151" }}>
                  {flight.origin.city} → {flight.destination.city}
                </div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
                  {new Date(flight.departure).toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}
                  {" · "}
                  {new Date(flight.departure).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })}
                  {" → "}
                  {new Date(flight.arrival).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })}
                  {" · "}{parseDuration(flight.duration)}
                </div>
                <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{flight.flightNumber} · Non-stop</div>
              </div>
            </div>
          </Section>

          {/* Price */}
          <Section title="Price Breakdown">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <tbody>
                <PriceRow label="Base Fare" value={`${flight.price.currency} ${flight.price.base}`} />
                <PriceRow label="Taxes & Fees" value={`${flight.price.currency} ${flight.price.taxes}`} />
                <PriceRow label="Total" value={`${flight.price.currency} ${flight.price.total}`} bold />
              </tbody>
            </table>
          </Section>
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
        <a href={`/${locale}`} style={{ color: "#1A2B5C", fontSize: 13, textDecoration: "underline" }}>
          {t("newSearch")}
        </a>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #E5E7EB", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ background: "#1A2B5C", padding: "8px 16px" }}>
        <span style={{ color: "#D4AF37", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>{title}</span>
      </div>
      <div style={{ padding: 16 }}>{children}</div>
    </div>
  );
}

function Grid({ cols, children }: { cols: number; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }}>
      {children}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: 1, color: "#9CA3AF", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#1A2B5C" }}>{value}</div>
    </div>
  );
}

function PriceRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <tr style={{ borderTop: bold ? "2px solid #D4AF37" : "1px solid #F3F4F6" }}>
      <td style={{ padding: "8px 0", color: bold ? "#1A2B5C" : "#374151", fontWeight: bold ? 700 : 400, fontSize: bold ? 15 : 13 }}>{label}</td>
      <td style={{ padding: "8px 0", textAlign: "right", color: bold ? "#1A2B5C" : "#374151", fontWeight: bold ? 700 : 600, fontSize: bold ? 15 : 13 }}>{value}</td>
    </tr>
  );
}
