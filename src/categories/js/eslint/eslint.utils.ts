import { isInstalledAndInRootCheck } from 'src/utils/installed';
import { isPrettierInstalled } from '../prettier/prettier.utils';
import { Config } from './config/config.interface';
import { CONFIG_FILE_NAME, SCRIPT_NAME } from './eslint.const';

export const prettierMutation = async (config: Config) => {
  if (await isPrettierInstalled()) {
    addPrettierToConfig(config);
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
