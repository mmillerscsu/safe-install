import { vi, describe, it, expect } from "vitest";

vi.mock("node-fetch", () => {
  return {
    default: vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: "test-pkg",
            "dist-tags": { latest: "1.0.0" },
            versions: {
              "1.0.0": {
                scripts: {},
              },
            },
            time: { "1.0.0": new Date().toISOString() },
          }),
      }),
    ),
  };
});

import { fetchPackage } from "../../resolvers/npm.js";

describe("fetchPackage", () => {
  it("resolves latest version", async () => {
    const result = await fetchPackage("test-pkg");

    expect(result.version).toBe("1.0.0");
  });

  it("respects version-specific input", async () => {
    const result = await fetchPackage("test-pkg@1.0.0");
    expect(result.version).toBe("1.0.0");
  });

  //   it("respects typed package input", async () => {
  //     const result = await fetchPackage("@types/test-pkg@1.2.0");
  //     expect(result.version).toBe("1.2.0");
  //   })
});
