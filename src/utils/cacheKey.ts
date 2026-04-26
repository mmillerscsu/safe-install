import { parsePackage } from "./package.js";

export function getCacheKey(input: string): string {
  const { name, version } = parsePackage(input);
  return `${name}@${version || "latest"}`;
}
