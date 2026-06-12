import { jsCategoryState } from '#src/services/state.service.ts';
import { defaultConfig } from '#src/categories/js/stylelint/config/default.config.ts';
import { reactTsConfig } from '#src/categories/js/stylelint/config/react-ts.config.ts';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
  'react:ts': reactTsConfig,
});
