import { readableMultilineString } from '#src/utils/string.ts';
import { scripts } from '#src/categories/js/jest/config/default.config.ts';
import type { Config } from '#src/categories/js/jest/config/config.interface.ts';

const configFileContent = readableMultilineString`
  /** @type {import('ts-jest').JestConfigWithTsJest} */
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['<rootDir>', 'node_modules'],
    testRegex: '.*\\.(spec|test)\\.ts$',
    collectCoverageFrom: ['src/**/*.ts'],
    passWithNoTests: true,
  };
`;

export const nodeTsConfig: Config = {
  devDependencies: ['jest', '@types/jest', 'ts-jest'],
  configFileContent,
  scripts,
};
