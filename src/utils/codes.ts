import { EXIT_CODES } from "../constants.js";
import { RiskLevel } from "../types.js";

export function getExitCode(level: RiskLevel): number {
  return EXIT_CODES[level] ?? EXIT_CODES.error;
}
