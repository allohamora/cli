import { isInstalledAndInRootCheck } from 'src/utils/installed';
import { isJestInstalled } from '../jest/jest.utils';
import { isPrettierInstalled } from '../prettier/prettier.utils';
import { Config } from './config/config.interface';
import { CONFIG_FILE_NAME, SCRIPT_NAME } from './eslint.const';

export const prettierMutation = async (config: Config) => {
  if (await isPrettierInstalled()) {
    addPrettierToConfig(config);
  }
};

export const jestMutation = async (config: Config) => {
  if (await isJestInstalled()) {
    config.eslintConfig.env = { ...config.eslintConfig.env, jest: true };
  }
};

const addPrettierToConfig = (config: Config) => {
  const dependenciesSet = new Set([...config.dependencies, 'eslint-plugin-prettier', 'eslint-config-prettier']);
  const dependencies = Array.from(dependenciesSet);

  const eslintExtendsSet = new Set([...(config.eslintConfig.extends || []), 'plugin:prettier/recommended']);
  const eslintExtends = Array.from(eslintExtendsSet);

  config.dependencies = dependencies;
  config.eslintConfig.extends = eslintExtends;
};

export const isEslintInstalled = isInstalledAndInRootCheck(SCRIPT_NAME, CONFIG_FILE_NAME);
