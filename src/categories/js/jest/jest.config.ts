import { jsCategoryState } from '#src/states/categories.ts';
import { defaultConfig } from '#src/categories/js/jest/config/default.config.ts';
import { nodeTsConfig } from '#src/categories/js/jest/config/node:ts.config.ts';
import { reactTsConfig } from '#src/categories/js/jest/config/react:ts.config.ts';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
  'node:ts': nodeTsConfig,
  'react:ts': reactTsConfig,
});
