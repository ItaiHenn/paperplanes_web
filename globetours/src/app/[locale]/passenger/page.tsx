"use client";

import { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { FlightOffer } from "@/lib/amadeus";

export default function PassengerPage() {
  const t = useTranslations("passenger");
  const et = useTranslations("errors");
  const { locale } = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const flightParam = searchParams.get("flight");
  const flight: FlightOffer | null = flightParam ? JSON.parse(decodeURIComponent(flightParam)) : null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  if (!flight) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <p>No flight selected.</p>
        <a href={`/${locale}`}>← Back to search</a>
      </div>
    );
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = et("required");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = et("invalidEmail");
    if (!phone.trim()) e.phone = et("required");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError("");

    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passengerName: name.trim(),
          passengerEmail: email.trim(),
          passengerPhone: phone.trim(),
          flightOffer: flight,
          locale,
        }),
      });

      if (!res.ok) throw new Error(et("createFailed"));
      const { id } = await res.json();
      router.push(`/${locale}/itinerary/${id}`);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : et("createFailed"));
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1A2B5C", marginBottom: 4 }}>
        {t("title")}
      </h1>
      <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 24 }}>{t("subtitle")}</p>

      {/* Selected flight summary */}
      <div style={{
        background: "#EEF2FF",
        borderRadius: 8,
        padding: "14px 20px",
        marginBottom: 28,
        fontSize: 14,
        color: "#1A2B5C",
        display: "flex",
        gap: 20,
        alignItems: "center",
      }}>
        <span style={{ fontWeight: 800, fontSize: 18 }}>
          {flight.origin.iata} → {flight.destination.iata}
        </span>
        <span>{flight.flightNumber}</span>
        <span>{new Date(flight.departure).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
        <span style={{ marginLeft: "auto", fontWeight: 700 }}>
          {flight.price.currency} {flight.price.total}
        </span>
      </div>

      {apiError && (
        <div style={{ background: "#FEE2E2", color: "#DC2626", padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 13 }}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 28 }}>
          <Field label={t("name")} error={errors.name}>
            <input type="text" placeholder={t("placeholder_name")} value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          </Field>
          <Field label={t("email")} error={errors.email}>
            <input type="email" placeholder={t("placeholder_email")} value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          </Field>
          <Field label={t("phone")} error={errors.phone}>
            <input type="tel" placeholder={t("placeholder_phone")} value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
          </Field>
        </div>

        <button type="submit" disabled={submitting} style={{ ...btnStyle, opacity: submitting ? 0.7 : 1 }}>
          {submitting ? t("generating") : t("generateBtn")}
        </button>
      </form>

      <div style={{ marginTop: 20 }}>
        <a href={`/${locale}`} style={{ color: "#1A2B5C", fontSize: 13, textDecoration: "underline" }}>
          ← Back to search
        </a>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
        {label}
      </label>
      {children}
      {error && <p style={{ color: "#DC2626", fontSize: 11, marginTop: 4 }}>{error}</p>}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #D1D5DB",
  borderRadius: 8,
  fontSize: 15,
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
};

const btnStyle: React.CSSProperties = {
  background: "#1A2B5C",
  color: "#D4AF37",
  border: "none",
  padding: "14px 40px",
  borderRadius: 8,
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
  letterSpacing: 1,
};
