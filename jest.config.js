module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.[jt]sx?$": "ts-jest"
  },
  moduleNameMapper: {},
  moduleDirectories: ["node_modules"],
  setupFiles: ["<rootDir>/jest/matchers.setup.ts"],
  snapshotSerializers: [],
  testEnvironment: "node",
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["json", "html", "lcov", "text", "clover"]
};
