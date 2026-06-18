import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/set-pr-title-workflow/preset/default.preset.ts';

export const getSetPrTitleWorkflowPreset = jsCategory.usePreset({
  default: defaultPreset,
});
