import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing, rtlLocales, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();
  const isRTL = (rtlLocales as readonly string[]).includes(locale);

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f8f9fa" }}>
        <NextIntlClientProvider messages={messages}>
          <header style={{
            background: "#1A2B5C",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <a href={`/${locale}`} style={{ textDecoration: "none" }}>
              <span style={{ color: "#D4AF37", fontWeight: 800, fontSize: 22, letterSpacing: 3 }}>
                GLOBETOURS
              </span>
            </a>
            <nav style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <a href={`/${locale}`} style={{ color: "#9BA8C4", fontSize: 13, textDecoration: "none" }}>
                Search
              </a>
              <LanguageSwitcherInline locale={locale} />
            </nav>
          </header>
          <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
            {children}
          </main>
          <footer style={{
            background: "#1A2B5C",
            color: "#6B7A99",
            textAlign: "center",
            padding: "16px",
            fontSize: 12,
            marginTop: 48,
          }}>
            GlobeTours &copy; {new Date().getFullYear()} — Flight Itinerary Generator
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

function LanguageSwitcherInline({ locale }: { locale: string }) {
  const langs = [
    { code: "en", label: "EN" },
    { code: "he", label: "עב" },
    { code: "es", label: "ES" },
    { code: "zh", label: "中" },
    { code: "ar", label: "عر" },
    { code: "ko", label: "한" },
    { code: "ja", label: "日" },
  ];
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {langs.map((l) => (
        <a
          key={l.code}
          href={`/${l.code}`}
          style={{
            color: l.code === locale ? "#D4AF37" : "#6B7A99",
            fontWeight: l.code === locale ? 700 : 400,
            fontSize: 12,
            textDecoration: "none",
            padding: "2px 6px",
            borderRadius: 4,
            background: l.code === locale ? "rgba(212,175,55,0.15)" : "transparent",
          }}
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
