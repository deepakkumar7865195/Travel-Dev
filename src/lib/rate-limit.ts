type Bucket = number[];

const store = new Map<string, Bucket>();

const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 3;
const MAX_KEYS = 5000;

export type LimitResult = { ok: boolean; retryAfterSeconds: number };

/**
 * Best-effort in-memory sliding-window limiter.
 * Per warm serverless instance — enough to blunt burst bot spam.
 */
export function rateLimit(key: string, max = MAX_HITS, windowMs = WINDOW_MS): LimitResult {
  const now = Date.now();
  const hits = (store.get(key) ?? []).filter((t) => now - t < windowMs);

  if (hits.length >= max) {
    const retryAfterSeconds = Math.max(1, Math.ceil((windowMs - (now - hits[0])) / 1000));
    store.set(key, hits);
    return { ok: false, retryAfterSeconds };
  }

  hits.push(now);
  store.set(key, hits);

  if (store.size > MAX_KEYS) {
    for (const [k, v] of store) {
      if (v.every((t) => now - t >= windowMs)) store.delete(k);
    }
  }

  return { ok: true, retryAfterSeconds: 0 };
}
