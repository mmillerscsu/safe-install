import { fetchPackage } from "../resolvers/npm.js";
import { analyzeScripts } from "../analyzers/scripts.js";
import { analyzeAge } from "../analyzers/age.js";
import { analyzeMaintainers } from "../analyzers/maintainers.js";
import { calculateRisk, scorePackage } from "../scorers/score.js";
import { Config, RiskResult } from "../types.js";
import { applyPolicy } from "../config/policy.js";
import { getCacheKey } from "../utils/cacheKey.js";
import { getCache, setCache } from "../cache/memory.js";
import { getFileCache, setFileCache } from "../cache/file.js";

export async function analyzeMetadata(
  pkgName: string,
  config: Config,
): Promise<RiskResult> {
  const pkg = await fetchPackage(pkgName);
  const key = getCacheKey(pkgName);

  const mem = getCache(key, config.cacheTTL);
  if (mem) {
    return { ...mem, cached: true };
  }

  const fc = getFileCache(key, config.cacheTTL);
  if (fc) {
    setCache(key, fc);
    return { ...fc, cached: true };
  }

  const calculatedRisk = scorePackage(pkg);

  setCache(key, calculatedRisk);
  setFileCache(key, calculatedRisk);

  return applyPolicy(pkgName, calculatedRisk, config);
}
