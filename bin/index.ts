#!/usr/bin/env node

import { Command } from "commander";
import { analyzeMetadata } from "../src/core/analyze.js";
import { printResult } from "../src/utils/logger.js";

const program = new Command();

program
  .argument("<package>", "package to analyze")
  .option("--install", "install if safe")
  .parse(process.argv);

const pkg = program.args[0];
const options = program.opts();

(async () => {
  const metaRisk = await analyzeMetadata(pkg);

  printResult(pkg, metaRisk);

  if (options.install && metaRisk.level !== "high") {
    console.log("\nInstalling...");
    const { spawn } = await import("child_process");

    const child = spawn("npm", ["install", pkg], {
      stdio: "inherit",
    });

    child.on("close", (code) => process.exit(code ?? 0));
  } else if (metaRisk.level === "high") {
    console.log("\n❌ Installation blocked due to high risk");
    process.exit(1);
  }
})();
