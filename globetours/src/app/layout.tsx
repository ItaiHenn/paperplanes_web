import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GlobeTours — Flight Itinerary Generator",
  description: "Search flights and generate professional PDF itineraries instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
