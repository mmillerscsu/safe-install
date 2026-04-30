import { RiskResult } from "../types.js";

export async function installPackages(
  packages: RiskResult[],
  jsonMode: boolean,
) {
  if (packages.length) {
    if (!jsonMode) {
      console.log("\nInstalling...");
    }

    const { spawn } = await import("child_process");

    const child = spawn(
      "npm",
      ["install", ...packages.map((pkg) => pkg.name)],
      {
        stdio: "inherit",
        shell: true,
      },
    );

    child.on("close", (code) => process.exit(code ?? 0));
  }
}
