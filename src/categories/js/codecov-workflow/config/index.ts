import { jsCategory } from '#src/services/state.service.ts';
import { defaultConfig } from '#src/categories/js/codecov-workflow/config/default.config.ts';

export const [getCodecovWorkflowConfig] = jsCategory.useConfig({
  default: defaultConfig,
});
