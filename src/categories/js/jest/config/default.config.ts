import { NpmScript } from 'src/utils/npm';
import { prettyMultilineFormat } from 'src/utils/string';
import { Config } from './config.interfrace';

export const scripts: NpmScript[] = [
  { name: 'test', script: 'jest' },
  { name: 'test:watch', script: 'jest --watch' },
  { name: 'test:coverage', script: 'jest --coverage' },
];

const configFileContent = prettyMultilineFormat`
  module.exports = {
    testEnvironment: 'node',
    testRegex: '.*\\.(spec|test)\\.js$',
  };
`;

export const defaultConfig: Config = {
  devDependencies: ['jest', '@types/jest'],
  configFileContent,
  scripts,
};
