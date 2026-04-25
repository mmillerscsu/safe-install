import { PackageInfo } from "../types.js";

export function analyzeScripts(pkg: PackageInfo) {
  const risks: string[] = [];
  let score = 0;

  if (pkg.scripts?.postinstall) {
    risks.push("Uses postinstall script");
    score += 40;
  }

  if (pkg.scripts?.preinstall) {
    risks.push("Uses preinstall script");
    score += 30;
  }

  return { score, risks };
}
