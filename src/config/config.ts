import fs from "fs";
import path from "path";
import { Config } from "../types.js";

export function loadConfig(): Config {
  const configPath = path.resolve(process.cwd(), ".safeinstallrc");

  if (!fs.existsSync(configPath)) {
    return {
      threshold: "high",
      allow: [],
      blockScripts: false,
    };
  }

  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}
