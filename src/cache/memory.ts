import { CacheEntry, RiskResult } from "../types.js";

const cache = new Map<string, any>();

export function getCache(key: string, ttl: number): RiskResult | null {
  const entry = cache.get(key) as CacheEntry<RiskResult> | undefined;

  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > ttl;

  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function setCache(key: string, value: RiskResult) {
  cache.set(key, {
    data: value,
    timestamp: Date.now(),
  });
}
