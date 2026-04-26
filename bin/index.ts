#!/usr/bin/env node

import { Command } from "commander";
import { analyzeMetadata } from "../src/core/analyze.js";
import { printResult } from "../src/utils/logger.js";
import { Config } from "../src/types.js";
import { loadConfig } from "../src/config/config.js";

const program = new Command();

program
  .argument("<package>", "package to analyze")
  .option("-i, --install", "install if safe")
  .option("-f, --force-install", "install regardless of risk")
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
  const config: Config = loadConfig();

  // analyze package risks
  for (const pkg of pkgs) {
    const metaRisk = await analyzeMetadata(pkg, config);
    printResult(pkg, metaRisk);

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
