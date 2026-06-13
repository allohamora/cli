import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/eslint/preset/default.preset.ts';
import { nodeTsPreset } from '#src/categories/js/eslint/preset/node-ts.preset.ts';
import { reactTsPreset } from '#src/categories/js/eslint/preset/react-ts.preset.ts';

export const [getEslintPreset] = jsCategory.usePreset({
  default: defaultPreset,
  'node:ts': nodeTsPreset,
  'react:ts': reactTsPreset,
});
