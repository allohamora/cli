import dedent from 'dedent';
import type { NpmScript } from '#src/services/npm.service.ts';
import type { Config } from '#src/categories/js/jest/config/config.interface.ts';

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

export const defaultConfig: Config = {
  devDependencies: ['jest', '@types/jest'],
  configFileContent,
  scripts,
};
