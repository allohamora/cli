import { jsCategory } from '#src/services/state.service.ts';
import { defaultConfig } from '#src/categories/js/release-workflow/config/default.config.ts';

export const [getReleaseWorkflowConfig] = jsCategory.useConfig({
  default: defaultConfig,
});
