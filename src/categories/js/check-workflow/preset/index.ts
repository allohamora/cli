import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/check-workflow/preset/default.preset.ts';

export const getCheckWorkflowPreset = jsCategory.usePreset({
  default: defaultPreset,
});
