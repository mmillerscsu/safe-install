import { PackageInfo } from "../types.js";

export function analyzeAge(pkg: PackageInfo) {
  const risks: string[] = [];
  let score = 0;

  const publishDate = pkg.time?.[pkg.version];
  if (!publishDate) return { score, risks };

  const ageHours =
    (Date.now() - new Date(publishDate).getTime()) / (1000 * 60 * 60);

  if (ageHours < 24) {
    risks.push("Very recently published (<24h)");
    score += 30;
  }

  return { score, risks };
}
