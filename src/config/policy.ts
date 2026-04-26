import { Config, RiskResult } from "../types.js";

export function applyPolicy(
  pkg: string,
  result: RiskResult,
  config: Config,
): RiskResult {
  if (config.allow.includes(pkg)) {
    return { ...result, level: "low" };
  }

  if (
    config.blockScripts &&
    result.reasons.some((r) => r.includes("install script"))
  ) {
    return { ...result, level: "high" };
  }

  return result;
}
