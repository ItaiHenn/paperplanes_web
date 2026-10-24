import { redis } from "./redis";
import { db } from "./db";
import { flightCache } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface FlightOffer {
  id: string;
  airline: { code: string; name: string };
  flightNumber: string;
  origin: { iata: string; city: string; country: string };
  destination: { iata: string; city: string; country: string };
  departure: string;
  arrival: string;
  duration: string;
  price: { total: string; base: string; taxes: string; currency: string };
  segments: number;
}

export interface ItineraryRecord {
  id: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  flightJson: FlightOffer;
  locale: string;
  createdAt: Date;
}

// ─── Airline name lookup ───────────────────────────────────────────────────────
const AIRLINE_NAMES: Record<string, string> = {
  AA: "American Airlines", UA: "United Airlines", DL: "Delta Air Lines",
  BA: "British Airways", LH: "Lufthansa", AF: "Air France",
  KL: "KLM", EK: "Emirates", QR: "Qatar Airways", EY: "Etihad Airways",
  TK: "Turkish Airlines", SQ: "Singapore Airlines", CX: "Cathay Pacific",
  JL: "Japan Airlines", NH: "ANA", OZ: "Asiana Airlines", KE: "Korean Air",
  LY: "El Al", FR: "Ryanair", VY: "Vueling", IB: "Iberia",
  AZ: "ITA Airways", LX: "SWISS", OS: "Austrian Airlines", SK: "SAS",
  AY: "Finnair", TP: "TAP Air Portugal", AC: "Air Canada", QF: "Qantas",
  NZ: "Air New Zealand", MH: "Malaysia Airlines", AI: "Air India",
};

function airlineName(code: string): string {
  return AIRLINE_NAMES[code] ?? code;
}

// ─── IATA city name lookup (common airports) ───────────────────────────────────
const CITY_NAMES: Record<string, { city: string; country: string }> = {
  TLV: { city: "Tel Aviv", country: "Israel" },
  JFK: { city: "New York", country: "USA" },
  LHR: { city: "London", country: "UK" },
  CDG: { city: "Paris", country: "France" },
  FRA: { city: "Frankfurt", country: "Germany" },
  AMS: { city: "Amsterdam", country: "Netherlands" },
  MAD: { city: "Madrid", country: "Spain" },
  FCO: { city: "Rome", country: "Italy" },
  DXB: { city: "Dubai", country: "UAE" },
  DOH: { city: "Doha", country: "Qatar" },
  SIN: { city: "Singapore", country: "Singapore" },
  BKK: { city: "Bangkok", country: "Thailand" },
  NRT: { city: "Tokyo", country: "Japan" },
  ICN: { city: "Seoul", country: "South Korea" },
  PEK: { city: "Beijing", country: "China" },
  PVG: { city: "Shanghai", country: "China" },
  HKG: { city: "Hong Kong", country: "China" },
  SYD: { city: "Sydney", country: "Australia" },
  LAX: { city: "Los Angeles", country: "USA" },
  ORD: { city: "Chicago", country: "USA" },
  MIA: { city: "Miami", country: "USA" },
  EWR: { city: "Newark", country: "USA" },
  YYZ: { city: "Toronto", country: "Canada" },
  GRU: { city: "Sao Paulo", country: "Brazil" },
  BOG: { city: "Bogota", country: "Colombia" },
  CAI: { city: "Cairo", country: "Egypt" },
  NBO: { city: "Nairobi", country: "Kenya" },
  JNB: { city: "Johannesburg", country: "South Africa" },
  MUC: { city: "Munich", country: "Germany" },
  ZRH: { city: "Zurich", country: "Switzerland" },
  VIE: { city: "Vienna", country: "Austria" },
  CPH: { city: "Copenhagen", country: "Denmark" },
  OSL: { city: "Oslo", country: "Norway" },
  ARN: { city: "Stockholm", country: "Sweden" },
  HEL: { city: "Helsinki", country: "Finland" },
  IST: { city: "Istanbul", country: "Turkey" },
  MXP: { city: "Milan", country: "Italy" },
  BCN: { city: "Barcelona", country: "Spain" },
};

function cityInfo(iata: string): { city: string; country: string } {
  return CITY_NAMES[iata] ?? { city: iata, country: "" };
}

// ─── Mock flights ──────────────────────────────────────────────────────────────
export const MOCK_FLIGHTS: FlightOffer[] = [
  {
    id: "mock-1",
    airline: { code: "LH", name: "Lufthansa" },
    flightNumber: "LH 687",
    origin: { iata: "TLV", city: "Tel Aviv", country: "Israel" },
    destination: { iata: "FRA", city: "Frankfurt", country: "Germany" },
    departure: "2026-09-15T06:30:00",
    arrival: "2026-09-15T09:15:00",
    duration: "PT2H45M",
    price: { total: "420.00", base: "320.00", taxes: "100.00", currency: "EUR" },
    segments: 1,
  },
  {
    id: "mock-2",
    airline: { code: "EK", name: "Emirates" },
    flightNumber: "EK 931",
    origin: { iata: "TLV", city: "Tel Aviv", country: "Israel" },
    destination: { iata: "DXB", city: "Dubai", country: "UAE" },
    departure: "2026-09-15T14:00:00",
    arrival: "2026-09-15T19:45:00",
    duration: "PT3H45M",
    price: { total: "380.00", base: "280.00", taxes: "100.00", currency: "USD" },
    segments: 1,
  },
  {
    id: "mock-3",
    airline: { code: "AA", name: "American Airlines" },
    flightNumber: "AA 100",
    origin: { iata: "JFK", city: "New York", country: "USA" },
    destination: { iata: "LHR", city: "London", country: "UK" },
    departure: "2026-09-15T21:00:00",
    arrival: "2026-09-16T09:05:00",
    duration: "PT7H05M",
    price: { total: "820.00", base: "640.00", taxes: "180.00", currency: "USD" },
    segments: 1,
  },
  {
    id: "mock-4",
    airline: { code: "QR", name: "Qatar Airways" },
    flightNumber: "QR 007",
    origin: { iata: "DOH", city: "Doha", country: "Qatar" },
    destination: { iata: "JFK", city: "New York", country: "USA" },
    departure: "2026-09-15T02:00:00",
    arrival: "2026-09-15T08:30:00",
    duration: "PT14H30M",
    price: { total: "950.00", base: "720.00", taxes: "230.00", currency: "USD" },
    segments: 1,
  },
  {
    id: "mock-5",
    airline: { code: "BA", name: "British Airways" },
    flightNumber: "BA 116",
    origin: { iata: "LHR", city: "London", country: "UK" },
    destination: { iata: "SIN", city: "Singapore", country: "Singapore" },
    departure: "2026-09-15T11:30:00",
    arrival: "2026-09-16T06:35:00",
    duration: "PT13H05M",
    price: { total: "1100.00", base: "850.00", taxes: "250.00", currency: "GBP" },
    segments: 1,
  },
];

// ─── Amadeus token cache ───────────────────────────────────────────────────────
const TOKEN_CACHE_KEY = "amadeus:token";

async function getAmadeusToken(): Promise<string> {
  const cached = await redis.get(TOKEN_CACHE_KEY);
  if (cached) return cached;

  const res = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_CLIENT_ID!,
      client_secret: process.env.AMADEUS_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) throw new Error(`Amadeus auth failed: ${res.status}`);
  const data = await res.json();
  const ttl = (data.expires_in as number) - 60;
  await redis.setex(TOKEN_CACHE_KEY, ttl, data.access_token);
  return data.access_token as string;
}

// ─── Normalize Amadeus response ────────────────────────────────────────────────
function normalizeAmadeusOffer(offer: Record<string, unknown>): FlightOffer {
  const itinerary = (offer.itineraries as Record<string, unknown>[])[0];
  const segment = (itinerary.segments as Record<string, unknown>[])[0];
  const departure = segment.departure as Record<string, string>;
  const arrival = segment.arrival as Record<string, string>;
  const price = offer.price as Record<string, string>;
  const carrierCode = segment.carrierCode as string;
  const base = parseFloat(price.base ?? "0");
  const total = parseFloat(price.grandTotal ?? price.total ?? "0");

  return {
    id: offer.id as string,
    airline: { code: carrierCode, name: airlineName(carrierCode) },
    flightNumber: `${carrierCode} ${segment.number as string}`,
    origin: { iata: departure.iataCode, ...cityInfo(departure.iataCode) },
    destination: { iata: arrival.iataCode, ...cityInfo(arrival.iataCode) },
    departure: departure.at,
    arrival: arrival.at,
    duration: itinerary.duration as string,
    price: {
      total: total.toFixed(2),
      base: base.toFixed(2),
      taxes: (total - base).toFixed(2),
      currency: price.currency ?? "USD",
    },
    segments: (itinerary.segments as unknown[]).length,
  };
}

// ─── Main search function ──────────────────────────────────────────────────────
const USE_MOCK =
  !process.env.AMADEUS_CLIENT_ID ||
  process.env.AMADEUS_CLIENT_ID === "mock";

export async function searchFlights(params: {
  origin: string;
  destination: string;
  date: string;
}): Promise<FlightOffer[]> {
  if (USE_MOCK) {
    // Return mock data — filter loosely so any origin/dest pair returns results
    return MOCK_FLIGHTS.slice(0, 3);
  }

  const cacheKey = `${params.origin}-${params.destination}-${params.date}`;
  const redisCached = await redis.get(`flights:${cacheKey}`);
  if (redisCached) return JSON.parse(redisCached) as FlightOffer[];

  const dbRows = await db
    .select()
    .from(flightCache)
    .where(eq(flightCache.cacheKey, cacheKey))
    .limit(1);
  const dbCached = dbRows[0];
  if (dbCached && dbCached.expiresAt > new Date()) {
    const offers = dbCached.data as unknown as FlightOffer[];
    await redis.setex(`flights:${cacheKey}`, 3600, JSON.stringify(offers));
    return offers;
  }

  const token = await getAmadeusToken();
  const url = new URL("https://test.api.amadeus.com/v2/shopping/flight-offers");
  url.searchParams.set("originLocationCode", params.origin);
  url.searchParams.set("destinationLocationCode", params.destination);
  url.searchParams.set("departureDate", params.date);
  url.searchParams.set("adults", "1");
  url.searchParams.set("max", "10");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Amadeus search failed: ${res.status}`);

  const json = await res.json();
  const offers = ((json.data ?? []) as Record<string, unknown>[]).map(normalizeAmadeusOffer);

  await redis.setex(`flights:${cacheKey}`, 3600, JSON.stringify(offers));
  const expiresAt = new Date(Date.now() + 3_600_000);
  await db
    .insert(flightCache)
    .values({ cacheKey, data: offers, expiresAt })
    .onConflictDoUpdate({
      target: flightCache.cacheKey,
      set: { data: offers, expiresAt },
    });

  return offers;
}
