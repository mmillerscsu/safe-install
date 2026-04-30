import fs from "fs";
import path from "path";
import os from "os";
import { RiskResult } from "../types.js";

const CACHE_DIR = path.join(os.homedir(), ".safe-install-cache");

function ensureDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

export function getFileCache(key: string, ttl: number) {
  ensureDir();

  const file = path.join(CACHE_DIR, `${key}.json`);
  if (!fs.existsSync(file)) return null;

  const entry = JSON.parse(fs.readFileSync(file, "utf-8"));

  const isExpired = Date.now() - entry.timestamp > ttl;

  if (isExpired) {
    fs.unlinkSync(file);
    return null;
  }

  return entry.data;
}

export function setFileCache(key: string, value: RiskResult) {
  ensureDir();

  const file = path.join(CACHE_DIR, `${key}.json`);
  fs.writeFileSync(
    file,
    JSON.stringify(
      {
        data: value,
        timestamp: Date.now(),
      },
      null,
      2,
    ),
  );
}

export function clearFileCache() {
  ensureDir();

  fs.truncate(CACHE_DIR, 0, () => console.log("File cache cleared"));
}
