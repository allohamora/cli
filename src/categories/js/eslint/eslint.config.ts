import { jsCategoryState } from 'src/states/categories';
import { defaultConfig } from './config/default.config';
import { nodeTsConfig } from './config/node:ts.config';

export const SCRIPT_NAME = 'eslint';
export const PACKAGE_NAME = SCRIPT_NAME;
export const CONFIG_FILE_NAME = '.eslintrc.json';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
  'node:ts': nodeTsConfig,
});
