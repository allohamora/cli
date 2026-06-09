import { jsCategoryState } from '#src/states/categories.ts';
import { defaultConfig } from '#src/categories/js/codecov-workflow/config/default.config.ts';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});
