import { jsCategoryState } from 'src/states/categories';
import { addFileToRoot } from 'src/utils/fs';
import { addScripts, installDevelopmentDependencies, NpmScript } from 'src/utils/npm';
import { prettyMultilineFormat } from 'src/utils/string';

interface Config {
  devDependencies: string[];
  scripts: NpmScript[];
  configFileContent: string;
}

const CONFIG_FILENAME = 'jest.config.cjs';

const scripts: NpmScript[] = [
  { name: 'test', script: 'jest' },
  { name: 'test:watch', script: 'jest --watch' },
  { name: 'test:coverage', script: 'jest --coverage' },
];

const defaultConfigFileContent = prettyMultilineFormat`
  module.exports = {
    testEnvironment: 'node',
    testRegex: '.*\\.(spec|test)\\.js$',
  };
`;

const defaultConfig: Config = {
  devDependencies: ['jest', '@types/jest'],
  configFileContent: defaultConfigFileContent,
  scripts,
};

const nodeTsConfigFileContent = prettyMultilineFormat`
  /** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
  module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['<rootDir>', 'node_modules'],
    testRegex: '.*\\.(spec|test)\\.ts$',

    // for esm modules
    moduleNameMapper: {
      '^(.+?)\\.js$': '$1',
    },
  };
`;

const nodeTsConfig: Config = {
  devDependencies: ['jest', '@types/jest', 'ts-jest'],
  configFileContent: nodeTsConfigFileContent,
  scripts,
};

const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
  'node:ts': nodeTsConfig,
});

export const jest = async () => {
  const { devDependencies, configFileContent, scripts } = getConfig();

  await installDevelopmentDependencies(...devDependencies);
  await addFileToRoot(CONFIG_FILENAME, configFileContent);
  await addScripts(...scripts);
};
