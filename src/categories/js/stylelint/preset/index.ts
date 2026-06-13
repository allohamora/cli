import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/stylelint/preset/default.preset.ts';
import { reactTsPreset } from '#src/categories/js/stylelint/preset/react-ts.preset.ts';

export const [getStylelintPreset] = jsCategory.usePreset({
  default: defaultPreset,
  'react:ts': reactTsPreset,
});
