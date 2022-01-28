import { prettyMultilineFormat } from 'src/utils/string';
import { scripts } from './default.config';
import { Config } from './config.interfrace';

const configFileContent = prettyMultilineFormat`
  /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['<rootDir>', 'node_modules'],
    testRegex: '.*\\.(spec|test)\\.ts$',
    collectCoverageFrom: ['src/**/*.ts'],
  };
`;

export const nodeTsConfig: Config = {
  devDependencies: ['jest', '@types/jest', 'ts-jest'],
  configFileContent,
  scripts,
};
