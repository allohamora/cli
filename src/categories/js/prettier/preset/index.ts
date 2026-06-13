import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/prettier/preset/default.preset.ts';

export const [getPrettierPreset] = jsCategory.usePreset({
  default: defaultPreset,
});
