module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"],
  testPathIgnorePatterns: ["dist"],
  globalSetup: "<rootDir>/node_modules/@databases/pg-test/jest/globalSetup",
  globalTeardown:
    "<rootDir>/node_modules/@databases/pg-test/jest/globalTeardown",
};
