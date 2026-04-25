import { RiskResult } from "../types.js";

export function calculateRisk(score: number, reasons: string[]): RiskResult {
  let level: RiskResult["level"] = "low";

  if (score >= 70) level = "high";
  else if (score >= 40) level = "medium";

  return {
    score,
    level,
    reasons,
  };
}
