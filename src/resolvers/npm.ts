import fetch from "node-fetch";
import { PackageInfo, NpmRegistryResponse } from "../types.js";
import { parsePackage } from "../utils/package.js";

export async function fetchPackage(pkg: string): Promise<PackageInfo> {
  const { name, version } = parsePackage(pkg);

  const res = await fetch(`https://registry.npmjs.org/${name}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch package: ${name}`);
  }

  const data = (await res.json()) as NpmRegistryResponse;

  const resolvedVersion = version || data["dist-tags"].latest;
  const versionData = data.versions?.[resolvedVersion];

  if (!versionData) {
    throw new Error(`Version ${resolvedVersion} not found for ${name}`);
  }

  return {
    name: data.name,
    version: resolvedVersion,
    time: data.time,
    scripts: versionData?.scripts,
    maintainers: data.maintainers,
  };
}
