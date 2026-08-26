import { jsCategory } from '#src/services/state.service.ts';
import { defaultPreset } from '#src/categories/js/review-comments-skill/preset/default.preset.ts';

export const getReviewCommentsSkillPreset = jsCategory.usePreset({
  default: defaultPreset,
});
