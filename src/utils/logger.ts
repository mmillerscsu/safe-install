import chalk from "chalk";
import { RiskResult } from "../types.js";

export function printResult(pkg: string, result: RiskResult, verbose: boolean) {
  if (result.level === "low") {
    console.log(chalk.green(`✔ ${pkg} → score: ${result.score} → SAFE`));
  } else if (result.level === "medium") {
    console.log(
      chalk.yellow(`⚠ ${pkg} → score: ${result.score} → MEDIUM RISK`),
    );
  } else {
    console.log(chalk.red(`❌ ${pkg} → score: ${result.score} → HIGH RISK`));
  }

  if (verbose) {
    result.reasons.forEach((r) => {
      console.log(`- ${r}`);
    });
  }
}
