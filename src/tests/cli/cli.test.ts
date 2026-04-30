import { execSync } from "child_process";
import { vi, describe, it, expect } from "vitest";
import { installPackages } from "../../core/installer.js";
import { RiskResult } from "../../types.js";

const clibin = "node dist/bin/index.js";

describe("CLI", () => {
  it("runs safe-install scan single package", () => {
    const output = execSync(`${clibin} react-router`, {
      encoding: "utf-8",
    });

    expect(output).toContain("react-router");
  });

  it("runs safe-install scan multiple packages", () => {
    const output = execSync(`${clibin} react-router react tar`, {
      encoding: "utf-8",
    });

    expect(output).toContain("react-router");
    expect(output).toContain("react");
    expect(output).toContain("tar");
  });

  it("returns exit code 0 when safe", async () => {
    try {
      execSync(`${clibin} lodash`);
    } catch (error: any) {
      expect(error.status).toBe(0);
    }
  });
});
