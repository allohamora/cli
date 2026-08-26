import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/agents-md/preset/default.preset.ts';

export const getAgentsMdPreset = jsCategory.usePreset({
  default: defaultPreset,
});
