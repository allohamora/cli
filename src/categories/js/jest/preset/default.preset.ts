import dedent from 'dedent';
import type { NpmScript } from '#src/services/npm.service.ts';
import type { Preset } from '#src/categories/js/jest/preset/preset.type.ts';

export const scripts: NpmScript[] = [
  { name: 'test', script: 'jest' },
  { name: 'test:watch', script: 'jest --watch' },
  { name: 'test:coverage', script: 'jest --coverage' },
];

const configFileContent = dedent`
  /** @type {import('jest').Config} */
  module.exports = {
    testEnvironment: 'node',
    testRegex: '.*\\.(spec|test)\\.js$',
    collectCoverageFrom: ['src/**/*.js'],
    passWithNoTests: true,
  };
`;

export const defaultPreset: Preset = {
  devDependencies: ['jest', '@types/jest'],
  configFileContent,
  scripts,
};
