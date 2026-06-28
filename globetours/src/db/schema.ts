import { pgTable, text, json, timestamp } from "drizzle-orm/pg-core";

export const itineraries = pgTable("itineraries", {
  id: text("id").primaryKey(),
  passengerName: text("passenger_name").notNull(),
  passengerEmail: text("passenger_email").notNull(),
  passengerPhone: text("passenger_phone").notNull(),
  flightJson: json("flight_json").notNull(),
  locale: text("locale").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const flightCache = pgTable("flight_cache", {
  cacheKey: text("cache_key").primaryKey(),
  data: json("data").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
