import { jsCategoryState } from '#src/states/categories.ts';
import { defaultConfig } from '#src/categories/js/release-workflow/config/default.config.ts';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});
