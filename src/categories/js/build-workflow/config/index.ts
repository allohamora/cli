import { jsCategory } from '#src/services/state.service.ts';
import { defaultConfig } from '#src/categories/js/build-workflow/config/default.config.ts';

export const [getBuildWorkflowConfig] = jsCategory.useConfig({
  default: defaultConfig,
});
