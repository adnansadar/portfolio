/**
 * Simple in-memory rate limiter for API routes
 * Limits requests per IP address within a time window
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Store rate limit data in memory (per IP)
const rateLimitMap = new Map<string, RateLimitEntry>();

// Configuration
const MAX_REQUESTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Checks if a request should be rate limited
 * @param ip - IP address of the requester
 * @returns Object with allowed status and remaining count
 */
export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // If no entry exists or window has expired, create new entry
  if (!entry || now > entry.resetTime) {
    const resetTime = now + WINDOW_MS;
    rateLimitMap.set(ip, { count: 1, resetTime });
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetTime,
    };
  }

  // Check if limit exceeded
  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;
  rateLimitMap.set(ip, entry);

  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Cleanup expired entries periodically to prevent memory leaks
 */
export function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}

// Run cleanup every 30 minutes
if (typeof setInterval !== "undefined") {
  setInterval(cleanupExpiredEntries, 30 * 60 * 1000);
}
