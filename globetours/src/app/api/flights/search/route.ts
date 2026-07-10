import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { searchFlights } from "@/lib/amadeus";
import { checkRateLimit } from "@/lib/rate-limit";

const schema = z.object({
  origin: z.string().min(3).max(3).toUpperCase(),
  destination: z.string().min(3).max(3).toUpperCase(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "127.0.0.1";

  try {
    const { allowed, remaining } = await checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Wait a minute and try again." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const params = schema.safeParse({
      origin: req.nextUrl.searchParams.get("origin"),
      destination: req.nextUrl.searchParams.get("destination"),
      date: req.nextUrl.searchParams.get("date"),
    });

    if (!params.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: params.error.flatten() },
        { status: 400 }
      );
    }

    const flights = await searchFlights(params.data);
    return NextResponse.json(
      { flights },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (err) {
    console.error("[flights/search]", err);
    return NextResponse.json({ error: "Flight search failed" }, { status: 500 });
  }
}
