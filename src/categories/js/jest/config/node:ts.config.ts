import { readableMultilineString } from 'src/utils/string';
import { scripts } from './default.config';
import { Config } from './config.interface';

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
