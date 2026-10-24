import { redis } from "./redis";

const WINDOW_MS = 60_000;
const LIMIT = 10;

export async function checkRateLimit(
  ip: string
): Promise<{ allowed: boolean; remaining: number }> {
  const key = `rl:search:${ip}`;
  const now = Date.now();

  const pipe = redis.pipeline();
  pipe.zremrangebyscore(key, 0, now - WINDOW_MS);
  pipe.zadd(key, now, `${now}-${Math.random()}`);
  pipe.zcard(key);
  pipe.expire(key, 60);

  const results = await pipe.exec();
  if (!results) return { allowed: false, remaining: 0 };

  const count = results[2][1] as number;
  return {
    allowed: count <= LIMIT,
    remaining: Math.max(0, LIMIT - count),
  };
}
