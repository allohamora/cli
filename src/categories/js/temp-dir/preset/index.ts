import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/temp-dir/preset/default.preset.ts';

export const getTempDirPreset = jsCategory.usePreset({
  default: defaultPreset,
});
