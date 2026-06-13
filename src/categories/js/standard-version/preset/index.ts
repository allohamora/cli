import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/standard-version/preset/default.preset.ts';

export const getStandardVersionPreset = jsCategory.usePreset({
  default: defaultPreset,
});
