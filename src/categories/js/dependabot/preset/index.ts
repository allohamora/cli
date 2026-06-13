import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/dependabot/preset/default.preset.ts';

export const getDependabotPreset = jsCategory.usePreset({
  default: defaultPreset,
});
