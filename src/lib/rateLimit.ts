/**
 * Sliding-window rate limiter.
 *
 * In-memory by design: it protects a single serverless instance and is the
 * correct default for a portfolio-scale workload. The interface is intentionally
 * async so a distributed backend (Upstash/Redis) can be dropped in without
 * touching call sites.
 */

interface Bucket {
  /** Epoch-ms timestamps of requests inside the current window. */
  hits: number[];
}

const buckets = new Map<string, Bucket>();

/** Prevents unbounded growth on long-lived instances. */
const MAX_TRACKED_KEYS = 10_000;

export interface RateLimitOptions {
  /** Max requests allowed per window. */
  limit: number;
  /** Window size in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  /** Epoch-ms when the window frees up. */
  reset: number;
  /** Seconds the client should wait, for the Retry-After header. */
  retryAfterSeconds: number;
}

export async function rateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (buckets.size > MAX_TRACKED_KEYS) {
    // Cheap eviction: drop everything; windows are short so impact is minimal.
    buckets.clear();
  }

  const bucket = buckets.get(key) ?? { hits: [] };
  // Drop hits that fell out of the sliding window.
  bucket.hits = bucket.hits.filter((t) => t > windowStart);

  const oldest = bucket.hits[0];
  const reset = oldest ? oldest + windowMs : now + windowMs;

  if (bucket.hits.length >= limit) {
    buckets.set(key, bucket);
    return {
      success: false,
      limit,
      remaining: 0,
      reset,
      retryAfterSeconds: Math.max(1, Math.ceil((reset - now) / 1000)),
    };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  return {
    success: true,
    limit,
    remaining: Math.max(0, limit - bucket.hits.length),
    reset,
    retryAfterSeconds: 0,
  };
}

/** Best-effort client identity for rate limiting. */
export function clientKey(request: Request, scope: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown";
  return `${scope}:${ip}`;
}

/** Standard rate-limit response headers. */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.reset / 1000)),
  };
  if (!result.success) {
    headers["Retry-After"] = String(result.retryAfterSeconds);
  }
  return headers;
}
