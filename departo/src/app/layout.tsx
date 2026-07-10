import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Departo — Travel Document Generator",
  description: "Generate professional travel documents for visa applications and trip planning.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
