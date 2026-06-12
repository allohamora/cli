import { jsCategory } from '#src/services/state.service.ts';
import { defaultConfig } from '#src/categories/js/eslint/config/default.config.ts';
import { nodeTsConfig } from '#src/categories/js/eslint/config/node-ts.config.ts';
import { reactTsConfig } from '#src/categories/js/eslint/config/react-ts.config.ts';

export const { getConfig } = jsCategory.useConfig({
  default: defaultConfig,
  'node:ts': nodeTsConfig,
  'react:ts': reactTsConfig,
});
