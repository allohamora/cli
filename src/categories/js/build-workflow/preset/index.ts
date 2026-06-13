import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/build-workflow/preset/default.preset.ts';

export const getBuildWorkflowPreset = jsCategory.usePreset({
  default: defaultPreset,
});
