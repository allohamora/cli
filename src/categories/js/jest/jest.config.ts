import { jsCategoryState } from 'src/states/categories';
import { defaultConfig } from './config/default.config';
import { nodeTsConfig } from './config/node:ts.config';

export const CONFIG_FILE_NAME = 'jest.config.cjs';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
  'node:ts': nodeTsConfig,
});
