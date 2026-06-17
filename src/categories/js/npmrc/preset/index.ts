import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/npmrc/preset/default.preset.ts';

export const getNpmrcPreset = jsCategory.usePreset({
  default: defaultPreset,
});
