import { jsCategoryState } from '#src/services/state.service.ts';
import { defaultConfig } from '#src/categories/js/commitlint/config/default.config.ts';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});
