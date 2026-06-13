import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/codecov-workflow/preset/default.preset.ts';

export const [getCodecovWorkflowPreset] = jsCategory.usePreset({
  default: defaultPreset,
});
