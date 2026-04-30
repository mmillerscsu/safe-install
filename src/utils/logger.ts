import chalk from "chalk";
import { JsonOutput, RiskResult } from "../types.js";

export function printResult(result: RiskResult) {
  const cached = result.cached ? "(cached)" : "";
  if (result.level === "low") {
    console.log(
      chalk.green(`✔ ${result.name} → score: ${result.score} → SAFE ${cached}`),
    );
  } else if (result.level === "medium") {
    console.log(
      chalk.yellow(
        `⚠ ${result.name} → score: ${result.score} → WARNING ${cached}`,
      ),
    );
  } else {
    console.log(
      chalk.red(
        `❌ ${result.name} → score: ${result.score} → BLOCKED ${cached}`,
      ),
    );
  }

  result.reasons.forEach((r) => {
    console.log(`- ${r}`);
  });
}

export function outputResults(results: RiskResult[], jsonMode: boolean) {
  if (jsonMode) {
    const payload: JsonOutput = {
      success: !results.some((result) => result.level === "high"),
      results,
    };

    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  // pretty printed default
  results.forEach(printResult);
}
