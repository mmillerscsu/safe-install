#!/usr/bin/env node

import { Command } from "commander";
import { analyzeMetadata } from "../src/core/analyze.js";
import { printResult } from "../src/utils/logger.js";

const program = new Command();

program
  .argument("<package>", "package to analyze")
  .option("-i, --install", "install if safe")
  .option("-f, --force-install", "install regardless of risk")
  .option("-v, --verbose", "verbose risk reasoning")
  .parse(process.argv);

const pkgs = program.args;
const options = program.opts();

async function installPackages(packages: string[]) {
  if (packages.length) {
    console.log("\nInstalling...");
    const { spawn } = await import("child_process");

    const child = spawn("npm", ["install", ...packages], {
      stdio: "inherit",
      shell: true,
    });

    child.on("close", (code) => process.exit(code ?? 0));
  }
}

async function main() {
  const installs: string[] = [];
  // analyze package risks
  for (const pkg of pkgs) {
    const metaRisk = await analyzeMetadata(pkg);
    printResult(pkg, metaRisk, options.verbose);

    if (
      (options.forceInstall || options.install) &&
      metaRisk.level !== "high"
    ) {
      installs.push(pkg);
    }
  }

  // finally install safe or forced packages
  await installPackages(installs);
}

main();
