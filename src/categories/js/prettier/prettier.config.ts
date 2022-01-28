import { jsCategoryState } from 'src/states/categories';
import { defaultConfig } from './config/default.config';

export const PACKAGE_NAME = 'prettier';
export const CLI_NAME = PACKAGE_NAME;
export const CONFIG_FILE_NAME = '.prettierrc';
export const CONFIG_IGNORE_FILE_NAME = '.prettierignore';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});
