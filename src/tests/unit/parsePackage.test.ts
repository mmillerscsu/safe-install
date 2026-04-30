import { describe, it, expect } from "vitest";
import { parsePackage } from "../../utils/package.js";

describe("parsePackage", () => {
  it("parses simple package", () => {
    expect(parsePackage("react")).toEqual({
      name: "react",
      version: null,
    });
  });

  it("parses versioned package", () => {
    expect(parsePackage("react-dom@19.2.5")).toEqual({
      name: "react-dom",
      version: "19.2.5",
    });
  });

  it("parses scoped package", () => {
    expect(parsePackage("@types/node@20.0.0")).toEqual({
      name: "@types/node",
      version: "20.0.0",
    });
  });
});
