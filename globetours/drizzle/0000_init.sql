CREATE TABLE IF NOT EXISTS "itineraries" (
  "id" text PRIMARY KEY,
  "passenger_name" text NOT NULL,
  "passenger_email" text NOT NULL,
  "passenger_phone" text NOT NULL,
  "flight_json" json NOT NULL,
  "locale" text NOT NULL DEFAULT 'en',
  "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "flight_cache" (
  "cache_key" text PRIMARY KEY,
  "data" json NOT NULL,
  "expires_at" timestamp NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL
);
