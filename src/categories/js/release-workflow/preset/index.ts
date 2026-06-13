import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/release-workflow/preset/default.preset.ts';

export const [getReleaseWorkflowPreset] = jsCategory.usePreset({
  default: defaultPreset,
});
