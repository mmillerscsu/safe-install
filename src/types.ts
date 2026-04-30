export type PackageInfo = {
  name: string;
  version: string;
  time?: { [version: string]: string };
  scripts?: Record<string, string>;
  maintainers?: { name: string }[];
};

export type NpmRegistryResponse = {
  name: string;
  time: Record<string, string>;
  versions: Record<string, NpmPackageVersion>;
  maintainers?: { name: string }[];
  "dist-tags": { latest: string };
};

export type NpmPackageVersion = {
  name: string;
  version: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

export type RiskResult = {
  name: string;
  score: number;
  level: RiskLevel;
  reasons: string[];
  cached?: boolean;
};

export type RiskLevel = "low" | "medium" | "high";
export type PackageResult = "safe" | "warning" | "blocked";

export type Config = {
  threshold: RiskLevel;
  allow: string[];
  blockScripts: boolean;
  cacheTTL: number;
};

export type CacheEntry<RiskResult> = {
  data: RiskResult;
  timestamp: number;
};

export type JsonOutput = {
  success: boolean;
  results: RiskResult[];
};
