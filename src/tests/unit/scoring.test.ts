import { describe, it, expect } from "vitest";
import { scorePackage } from "../../scorers/score.js";
import { PackageInfo } from "../../types.js";

describe("scoring", () => {
  it("flags postinstall and no maintainer as high risk", () => {
    const pkgInfo: PackageInfo = {
      name: "high-risk-pkg",
      version: "1.0.0",
      time: { "1.0.0": new Date().toISOString() },
      scripts: { postinstall: "malicious" },
      maintainers: [],
    };

    const result = scorePackage(pkgInfo);

    expect(result.score).toBeGreaterThan(70);
  });

  it("flags preinstall and no maintainer as high risk", () => {
    const pkgInfo: PackageInfo = {
      name: "high-risk-pkg",
      version: "1.0.0",
      time: { "1.0.0": new Date().toISOString() },
      scripts: { preinstall: "malicious" },
      maintainers: [],
    };

    const result = scorePackage(pkgInfo);

    expect(result.score).toBeGreaterThan(70);
  });

  it("flags preinstall as medium risk", () => {
    const pkgInfo: PackageInfo = {
      name: "medium-risk-pkg",
      version: "1.0.0",
      time: { "1.0.0": new Date().toISOString() },
      scripts: { preinstall: "malicious" },
      maintainers: [{ name: "dev1" }],
    };

    const result = scorePackage(pkgInfo);

    expect(result.score).toBe(60);
  });

  it("flags postinstall as high risk", () => {
    const pkgInfo: PackageInfo = {
      name: "high-risk-pkg",
      version: "1.0.0",
      time: { "1.0.0": new Date().toISOString() },
      scripts: { postinstall: "malicious" },
      maintainers: [{ name: "dev1" }],
    };

    const result = scorePackage(pkgInfo);

    expect(result.score).toBe(70);
  });
});
