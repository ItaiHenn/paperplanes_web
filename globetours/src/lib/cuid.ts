import { randomBytes } from "crypto";

export function createId(): string {
  const timestamp = Date.now().toString(36);
  const random = randomBytes(8).toString("base64url").slice(0, 10);
  return `c${timestamp}${random}`;
}
