import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  modulePaths: [compilerOptions.baseUrl],
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testEnvironment: "node",
  verbose: true
};

export default config;
