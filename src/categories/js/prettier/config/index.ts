import { jsCategory } from '#src/services/state.service.ts';
import { defaultConfig } from '#src/categories/js/prettier/config/default.config.ts';

export const [getPrettierConfig] = jsCategory.useConfig({
  default: defaultConfig,
});
