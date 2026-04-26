import chalk from "chalk";
import { RiskResult } from "../types.js";

export function printResult(pkg: string, result: RiskResult) {
  const cached = result.cached ? "(cached)" : "";
  if (result.level === "low") {
    console.log(
      chalk.green(`✔ ${pkg} → score: ${result.score} → SAFE ${cached}`),
    );
  } else if (result.level === "medium") {
    console.log(
      chalk.yellow(`⚠ ${pkg} → score: ${result.score} → WARNING ${cached}`),
    );
  } else {
    console.log(
      chalk.red(`❌ ${pkg} → score: ${result.score} → BLOCKED ${cached}`),
    );
  }

  result.reasons.forEach((r) => {
    console.log(`- ${r}`);
  });
}
