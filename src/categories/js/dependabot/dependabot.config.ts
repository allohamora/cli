import { jsCategoryState } from '#src/services/state.service.ts';
import { defaultConfig } from '#src/categories/js/dependabot/config/default.config.ts';

export const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});
