// jest doesn't work with esm dependencies like ora new es version
// jest-ts-esm presets don't work
// jest node --experimental-vm-modules node_modules/jest/bin/jest.js doesn't work
// "transformIgnorePatterns": ["node_modules/(?!(module-that-needs-to-be-transformed)/)"] doesn't work
// "transform": { "module-that-needs-to-be-transformed": "babel-jest" } with esm to commonjs plugin doesn't work

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['<rootDir>', 'node_modules'],
  testRegex: '.*.(spec|test).ts$',
  collectCoverageFrom: ['src/**/*.ts'],
  passWithNoTests: true,
  setupFilesAfterEnv: ['./__tests__/setup-after-env.ts'],
};
