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
  score: number;
  level: RiskLevel;
  reasons: string[];
};

export type RiskLevel = "low" | "medium" | "high";

export type Config = {
  threshold: RiskLevel;
  allow: string[];
  blockScripts: boolean;
};
