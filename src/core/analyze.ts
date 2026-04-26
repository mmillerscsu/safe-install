import { fetchPackage } from "../resolvers/npm.js";
import { analyzeScripts } from "../analyzers/scripts.js";
import { analyzeAge } from "../analyzers/age.js";
import { analyzeMaintainers } from "../analyzers/maintainers.js";
import { calculateRisk } from "../scorers/score.js";
import { loadConfig } from "../config/config.js";
import { Config } from "../types.js";
import { applyPolicy } from "../config/policy.js";

export async function analyzeMetadata(pkgName: string, config: Config) {
  const pkg = await fetchPackage(pkgName);

  const results = [
    analyzeScripts(pkg),
    analyzeAge(pkg),
    analyzeMaintainers(pkg),
  ];

  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const reasons = results.flatMap((r) => r.risks);
  const calculatedRisk = calculateRisk(totalScore, reasons);

  return applyPolicy(pkgName, calculatedRisk, config);
}
