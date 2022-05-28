import { readableMultilineString } from 'src/utils/string';
import { scripts } from './default.config';
import { Config } from './config.interface';

const configFileContent = readableMultilineString`
  /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
  module.exports = {
    roots: ['<rootDir>'],
    testEnvironment: 'jsdom',
    testRegex: '.*\\.(spec|test)\\.ts$',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleDirectories: ['<rootDir>', 'node_modules'],
    testRegex: '.*\\.(spec|test)\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
    moduleNameMapper: {
      '\.(css|less|sass|scss|gif|ttf|eot|svg|png)$': 'identity-obj-proxy'
    },
  };
`;

export const reactTsConfig: Config = {
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
