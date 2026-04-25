import fetch from "node-fetch";
import { PackageInfo, NpmRegistryResponse } from "../types.js";

export async function fetchPackage(pkg: string): Promise<PackageInfo> {
  const res = await fetch(`https://registry.npmjs.org/${pkg}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch package: ${pkg}`);
  }

  const data = (await res.json()) as NpmRegistryResponse;

  const latest = data["dist-tags"].latest;
  const versionData = data.versions[latest];

  if (!versionData) {
    throw new Error(`Invalid version data for ${pkg}`);
  }

  return {
    name: data.name,
    version: latest,
    time: data.time,
    scripts: versionData?.scripts,
    maintainers: data.maintainers,
  };
}
