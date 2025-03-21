/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    rootDir: "./",
    coverageDirectory: "<rootDir>/coverage",
    collectCoverageFrom: [
      "<rootDir>/**/*.ts"
    ],
    setupFiles:['dotenv/config'],
    testPathIgnorePatterns: ["<rootDir>/node_modules"],
    collectCoverage: true,
    coverageReporters: ["text", "html"],
    testMatch: ["<rootDir>/**/*.spec.ts"],
  };