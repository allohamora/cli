import { REVIEW_COMMENTS_SKILL_NAME } from '#src/categories/js/review-comments-skill/review-comments-skill.const.ts';
import { getReviewCommentsSkillPreset } from '#src/categories/js/review-comments-skill/preset/index.ts';
import { writeSkill } from '#src/services/skill.service.ts';

export const reviewCommentsSkill = async () => {
  const { content } = getReviewCommentsSkillPreset();

  await writeSkill(REVIEW_COMMENTS_SKILL_NAME, content);
};
