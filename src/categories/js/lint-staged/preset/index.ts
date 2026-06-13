import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/lint-staged/preset/default.preset.ts';
import { nodeTsPreset } from '#src/categories/js/lint-staged/preset/node-ts.preset.ts';
import { reactTsPreset } from '#src/categories/js/lint-staged/preset/react-ts.preset.ts';

export const [getLintStagedPreset] = jsCategory.usePreset({
  default: defaultPreset,
  'node:ts': nodeTsPreset,
  'react:ts': reactTsPreset,
});
