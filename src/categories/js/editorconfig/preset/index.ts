import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/editorconfig/preset/default.preset.ts';

export const getEditorconfigPreset = jsCategory.usePreset({
  default: defaultPreset,
});
