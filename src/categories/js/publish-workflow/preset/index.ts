import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/publish-workflow/preset/default.preset.ts';

export const getPublishWorkflowPreset = jsCategory.usePreset({
  default: defaultPreset,
});
