import Redis from "ioredis";

const globalForRedis = globalThis as unknown as { redis?: Redis };

function getRedis(): Redis {
  if (globalForRedis.redis) return globalForRedis.redis;
  const client = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
    maxRetriesPerRequest: 3,
    lazyConnect: true,
    enableOfflineQueue: false,
  });
  client.on("error", (err) => {
    // Suppress connection errors during build/test; they surface at runtime
    if (process.env.NODE_ENV !== "production") return;
    console.error("[redis]", err.message);
  });
  if (process.env.NODE_ENV !== "production") globalForRedis.redis = client;
  return client;
}

export const redis = getRedis();
