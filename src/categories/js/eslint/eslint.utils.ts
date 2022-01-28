import { getInstalling } from 'src/states/context';
import { isExistsInRoot } from 'src/utils/fs';
import { isPrettierInstalled } from '../prettier/prettier.utils';
import { Config } from './config/config.interface';
import { CONFIG_FILE_NAME, SCRIPT_NAME } from './eslint.config';

export const prettierIntegrationHandler = async (config: Config) => {
  if (await isPrettierInstalled()) {
    addPrettierToConfig(config);
  }
};

export const addPrettierToConfig = (config: Config) => {
  const dependenciesSet = new Set([...config.dependencies, 'eslint-plugin-prettier', 'eslint-config-prettier']);
  const dependencies = Array.from(dependenciesSet);

  const eslintExtendsSet = new Set([...(config.eslintConfig.extends || []), 'plugin:prettier/recommended']);
  const eslintExtends = Array.from(eslintExtendsSet);

  config.dependencies = dependencies;
  config.eslintConfig.extends = eslintExtends;
};

export const isEslintInstalled = async () => {
  const installing = getInstalling();

  if (installing.includes(SCRIPT_NAME)) {
    return true;
  }

  return await isExistsInRoot(CONFIG_FILE_NAME);
};
