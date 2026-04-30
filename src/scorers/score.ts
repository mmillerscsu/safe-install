import { analyzeAge } from "../analyzers/age.js";
import { analyzeMaintainers } from "../analyzers/maintainers.js";
import { analyzeScripts } from "../analyzers/scripts.js";
import { PackageInfo, RiskResult } from "../types.js";

export function calculateRisk(
  name: string,
  score: number,
  reasons: string[],
): RiskResult {
  let level: RiskResult["level"] = "low";

  if (score >= 70) level = "high";
  else if (score >= 40) level = "medium";

  return {
    name,
    score,
    level,
    reasons,
  };
}

export function scorePackage(pkg: PackageInfo): RiskResult {
  const results = [
    analyzeScripts(pkg),
    analyzeAge(pkg),
    analyzeMaintainers(pkg),
  ];

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const reasons = results.flatMap((r) => r.risks);
  return calculateRisk(pkg.name, totalScore, reasons);
}
