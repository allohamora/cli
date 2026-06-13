import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/test-workflow/preset/default.preset.ts';

export const getTestWorkflowPreset = jsCategory.usePreset({
  default: defaultPreset,
});
