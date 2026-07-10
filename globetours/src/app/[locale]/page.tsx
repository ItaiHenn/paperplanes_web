"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function SearchPage() {
  const t = useTranslations("search");
  const et = useTranslations("errors");
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!origin || origin.length !== 3) e.origin = et("required");
    if (!destination || destination.length !== 3) e.destination = et("required");
    if (!date) e.date = et("required");
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const params = new URLSearchParams({ origin: origin.toUpperCase(), destination: destination.toUpperCase(), date });
    router.push(`/${locale}/results?${params.toString()}`);
  }

  return (
    <div>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1A2B5C", marginBottom: 8 }}>
        {t("title")}
      </h1>
      <p style={{ color: "#6B7280", marginBottom: 32, fontSize: 14 }}>{t("example")}</p>

      <form onSubmit={handleSearch} style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 24 }}>
          <Field label={t("origin")} error={errors.origin}>
            <input
              type="text"
              maxLength={3}
              placeholder={t("placeholder_origin")}
              value={origin}
              onChange={(e) => setOrigin(e.target.value.toUpperCase())}
              style={inputStyle}
            />
          </Field>
          <Field label={t("destination")} error={errors.destination}>
            <input
              type="text"
              maxLength={3}
              placeholder={t("placeholder_destination")}
              value={destination}
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
              style={inputStyle}
            />
          </Field>
          <Field label={t("date")} error={errors.date}>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />
          </Field>
        </div>

        <button type="submit" style={btnStyle}>
          {t("searchBtn")}
        </button>
      </form>
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
