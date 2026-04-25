import { PackageInfo } from "../types.js";

export function analyzeMaintainers(pkg: PackageInfo) {
  const risks: string[] = [];
  let score = 0;

  if (!pkg.maintainers || pkg.maintainers.length === 0) {
    risks.push("No maintainers listed");
    score += 20;
  }

  return { score, risks };
}
