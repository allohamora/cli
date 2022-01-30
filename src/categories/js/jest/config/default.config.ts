import { NpmScript } from 'src/utils/npm';
import { readableString } from 'src/utils/string';
import { Config } from './config.interfrace';

export const scripts: NpmScript[] = [
  { name: 'test', script: 'jest' },
  { name: 'test:watch', script: 'jest --watch' },
  { name: 'test:coverage', script: 'jest --coverage' },
];

const configFileContent = readableString`
  module.exports = {
    testEnvironment: 'node',
    testRegex: '.*\\.(spec|test)\\.js$',
    collectCoverageFrom: ['src/**/*.js'],
  };
`;

export const defaultConfig: Config = {
  devDependencies: ['jest', '@types/jest'],
  configFileContent,
  scripts,
};
