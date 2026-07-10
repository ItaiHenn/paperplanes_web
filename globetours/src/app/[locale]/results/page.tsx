"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { FlightOffer } from "@/lib/amadeus";

function parseDuration(iso: string) {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!m) return iso;
  return [m[1] ? `${m[1]}h` : "", m[2] ? `${m[2]}m` : ""].filter(Boolean).join(" ");
}

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function ResultsPage() {
  const t = useTranslations("results");
  const et = useTranslations("errors");
  const { locale } = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const origin = searchParams.get("origin") ?? "";
  const destination = searchParams.get("destination") ?? "";
  const date = searchParams.get("date") ?? "";

  useEffect(() => {
    if (!origin || !destination || !date) return;
    setLoading(true);
    setError("");
    fetch(`/api/flights/search?origin=${origin}&destination=${destination}&date=${date}`)
      .then((r) => {
        if (r.status === 429) throw new Error(et("rateLimited"));
        if (!r.ok) throw new Error(et("searchFailed"));
        return r.json();
      })
      .then((d) => setFlights(d.flights ?? []))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [origin, destination, date, et]);

  function selectFlight(flight: FlightOffer) {
    const encoded = encodeURIComponent(JSON.stringify(flight));
    router.push(`/${locale}/passenger?flight=${encoded}`);
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1A2B5C", marginBottom: 4 }}>
        {t("title")}
      </h1>
      <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 24 }}>
        {origin} → {destination} · {date}
      </p>

      {loading && (
        <div style={{ textAlign: "center", padding: 40, color: "#6B7280" }}>
          Searching...
        </div>
      )}

      {error && (
        <div style={{ background: "#FEE2E2", color: "#DC2626", padding: 16, borderRadius: 8, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {!loading && !error && flights.length === 0 && (
        <div style={{ textAlign: "center", padding: 40, color: "#6B7280" }}>
          {t("noResults")}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {flights.map((flight) => (
          <div key={flight.id} style={{
            background: "#fff",
            borderRadius: 12,
            padding: "20px 24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}>
            {/* Airline logo */}
            <div style={{ width: 60, flexShrink: 0, textAlign: "center" }}>
              <img
                src={`https://www.gstatic.com/flights/airline_logos/70px/dark/${flight.airline.code}.png`}
                alt={flight.airline.code}
                style={{ width: 48, height: 34, objectFit: "contain" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>{flight.airline.name}</div>
            </div>

            {/* Route */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#1A2B5C" }}>{flight.origin.iata}</span>
                <span style={{ color: "#D4AF37", fontSize: 18 }}>→</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: "#1A2B5C" }}>{flight.destination.iata}</span>
                <span style={{ fontSize: 12, color: "#6B7280", marginLeft: 8 }}>
                  {fmtTime(flight.departure)} – {fmtTime(flight.arrival)}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#6B7280" }}>
                {flight.flightNumber} · {parseDuration(flight.duration)} · {t("stops")}
              </div>
            </div>

            {/* Price + select */}
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#1A2B5C", marginBottom: 8 }}>
                {flight.price.currency} {flight.price.total}
              </div>
              <button
                onClick={() => selectFlight(flight)}
                style={{
                  background: "#D4AF37",
                  color: "#1A2B5C",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: 8,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 13,
                }}
              >
                {t("selectBtn")}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <a href={`/${locale}`} style={{ color: "#1A2B5C", fontSize: 13, textDecoration: "underline" }}>
          ← Back to search
        </a>
      </div>
    </div>
  );
}
