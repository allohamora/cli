import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/docker/preset/default.preset.ts';

export const [getDockerPreset] = jsCategory.usePreset({
  default: defaultPreset,
});
