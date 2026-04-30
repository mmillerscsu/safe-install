#!/usr/bin/env node

import { Command } from "commander";
import { analyzeMetadata } from "../src/core/analyze.js";
import { outputResults } from "../src/utils/logger.js";
import { Config } from "../src/types.js";
import { loadConfig } from "../src/config/config.js";
import { getExitCode } from "../src/utils/codes.js";
import { EXIT_CODES } from "../src/constants.js";
import { installPackages } from "../src/core/installer.js";

const program = new Command();

program
  .argument("<package>", "package to analyze")
  .option("-i, --install", "install if safe")
  .option("-f, --force-install", "install regardless of risk")
  .option("--json", "format result output to JSON")
  .parse(process.argv);

const pkgs = program.args;
const options = program.opts();

async function main() {
  let resultCode: number = 0;
  try {
    const config: Config = loadConfig();

    if (!pkgs) {
      console.error("No package specified");
      process.exit(EXIT_CODES.error);
    }

    // analyze package risks
    const results = await Promise.all(
      pkgs.map((pkg) => analyzeMetadata(pkg, config)),
    );

    outputResults(results, options.json);

    resultCode = results.reduce((curCode, result) => {
      return Math.max(curCode, getExitCode(result.level));
    }, 0);

    const shouldInstall = options.install && resultCode !== EXIT_CODES.high;

    if (shouldInstall) {
      // finally install safe or forced packages
      await installPackages(results, options.json);
    }
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    resultCode = Math.max(resultCode, EXIT_CODES.error);
  }

  process.exit(resultCode);
}

main();
