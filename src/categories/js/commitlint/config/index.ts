import { jsCategory } from '#src/services/state.service.ts';
import { defaultConfig } from '#src/categories/js/commitlint/config/default.config.ts';

export const [getCommitlintConfig] = jsCategory.useConfig({
  default: defaultConfig,
});
