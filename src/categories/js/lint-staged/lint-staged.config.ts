import { jsCategoryState } from 'src/states/categories';
import { defaultConfig } from './config/default.config';
import { nodeTsConfig } from './config/node:ts.config';

export const PACKAGE_NAME = 'lint-staged';
export const CLI_NAME = PACKAGE_NAME;

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
  'node:ts': nodeTsConfig,
});
