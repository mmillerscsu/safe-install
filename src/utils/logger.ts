import chalk from "chalk";
import { RiskResult } from "../types.js";

export function printResult(pkg: string, result: RiskResult) {
  if (result.level === "low") {
    console.log(chalk.green(`✔ ${pkg} → score: ${result.score} → SAFE`));
  } else if (result.level === "medium") {
    console.log(chalk.yellow(`⚠ ${pkg} → score: ${result.score} → WARNING`));
  } else {
    console.log(chalk.red(`❌ ${pkg} → score: ${result.score} → BLOCKED`));
  }

  result.reasons.forEach((r) => {
    console.log(`- ${r}`);
  });
}
