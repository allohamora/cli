import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/commitlint/preset/default.preset.ts';

export const [getCommitlintPreset] = jsCategory.usePreset({
  default: defaultPreset,
});
