import dedent from 'dedent';
import { scripts } from '#src/categories/js/jest/preset/default.preset.ts';
import type { Preset } from '#src/categories/js/jest/preset/preset.type.ts';

const configFileContent = dedent`
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

export const nodeTsPreset: Preset = {
  devDependencies: ['jest', '@types/jest', 'ts-jest'],
  configFileContent,
  scripts,
};
