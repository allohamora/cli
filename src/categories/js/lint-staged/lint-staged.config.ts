import { jsCategoryState } from '#src/services/state.service.ts';
import { defaultConfig } from '#src/categories/js/lint-staged/config/default.config.ts';
import { nodeTsConfig } from '#src/categories/js/lint-staged/config/node-ts.config.ts';
import { reactTsConfig } from '#src/categories/js/lint-staged/config/react-ts.config.ts';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
  'node:ts': nodeTsConfig,
  'react:ts': reactTsConfig,
});
