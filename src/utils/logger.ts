import chalk from "chalk";
import { RiskResult } from "../types.js";

export function printResult(pkg: string, result: RiskResult) {
  if (result.level === "low") {
    console.log(chalk.green(`✔ ${pkg} → SAFE`));
  } else if (result.level === "medium") {
    console.log(chalk.yellow(`⚠ ${pkg} → MEDIUM RISK`));
  } else {
    console.log(chalk.red(`❌ ${pkg} → HIGH RISK`));
  }

  console.log(`Score: ${result.score}`);

  result.reasons.forEach((r) => {
    console.log(`- ${r}`);
  });
}
