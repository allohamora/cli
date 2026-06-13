import dedent from 'dedent';
import { scripts } from '#src/categories/js/jest/preset/default.preset.ts';
import type { Preset } from '#src/categories/js/jest/preset/preset.type.ts';

const configFileContent = dedent`
  /** @type {import('ts-jest').JestConfigWithTsJest} */
  module.exports = {
    roots: ['<rootDir>'],
    testEnvironment: 'jsdom',
    testRegex: '.*\\.(spec|test)\\.ts$',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleDirectories: ['<rootDir>', 'node_modules'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
    moduleNameMapper: {
      '\.(css|less|sass|scss|gif|ttf|eot|svg|png)$': 'identity-obj-proxy'
    },
    passWithNoTests: true,
  };
`;

export const reactTsPreset: Preset = {
  devDependencies: [
    'jest',
    '@types/jest',
    'ts-jest',
    'jest-environment-jsdom',
    '@testing-library/react',
    'identity-obj-proxy',
  ],
  configFileContent,
  scripts,
};
