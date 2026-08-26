import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/personal-devcontainer/preset/default.preset.ts';

export const getPersonalDevcontainerPreset = jsCategory.usePreset({
  default: defaultPreset,
});
