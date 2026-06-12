import { jsCategoryState } from '#src/services/state.service.ts';
import { defaultConfig } from '#src/categories/js/codecov-workflow/config/default.config.ts';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});
