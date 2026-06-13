import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/jest/preset/default.preset.ts';
import { nodeTsPreset } from '#src/categories/js/jest/preset/node-ts.preset.ts';
import { reactTsPreset } from '#src/categories/js/jest/preset/react-ts.preset.ts';

export const getJestPreset = jsCategory.usePreset({
  default: defaultPreset,
  'node:ts': nodeTsPreset,
  'react:ts': reactTsPreset,
});
