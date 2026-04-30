import { describe, it, expect, afterEach } from "vitest";
import { setCache, getCache, clearCache } from "../../cache/memory.js";
import { RiskResult } from "../../types.js";
import { clearFileCache } from "../../cache/file.js";

describe("cache", () => {
  afterEach(() => {
    // clear cache
    clearCache();
    clearFileCache();
  });

  it("stores and retrieves value", () => {
    const expected: RiskResult = {
      name: "test-pkg",
      score: 0,
      level: "low",
      reasons: [],
    };

    setCache("test", expected);

    const cached: RiskResult | null = getCache("test", 0);

    expect(cached).not.toBeNull();
    expect(cached?.score).toEqual(expected.score);
    expect(cached?.level).toEqual(expected.level);
    expect(cached?.reasons.length).toEqual(expected.reasons.length);
  });

  it("expires after TTL", async () => {
    const expected: RiskResult = {
      name: "test-pkg",
      score: 0,
      level: "low",
      reasons: [],
    };

    setCache("ttl-test", expected);
    const timestamp = 1100;

    await new Promise((r) => setTimeout(r, timestamp));

    const cached: RiskResult | null = getCache("test", timestamp);

    expect(cached).toBeNull();
  });
});
