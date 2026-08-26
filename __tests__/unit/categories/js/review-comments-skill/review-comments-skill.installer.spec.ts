import path from 'node:path';
import { fileSystem } from '#__tests__/setup-test-context.ts';
import { reviewCommentsSkill } from '#src/categories/js/review-comments-skill/review-comments-skill.installer.ts';
import { content } from '#src/categories/js/review-comments-skill/preset/default.preset.ts';
import { describe, expect, it } from 'vitest';

describe('review-comments-skill.installer', () => {
  describe('reviewCommentsSkill', () => {
    it('writes the review-comments skill with the default content and a .claude symlink to it', async () => {
      await reviewCommentsSkill();

      const skillPath = path.join('.agents', 'skills', 'review-comments');
      const claudeSkillPath = path.join('.claude', 'skills', 'review-comments');

      expect(fileSystem.readFile(path.join(skillPath, 'SKILL.md'))).toBe(`${content}\n`);
      expect(fileSystem.readSymlink(claudeSkillPath)).toBe(path.join('..', '..', skillPath));
      expect(fileSystem.readSymlinkType(claudeSkillPath)).toBe('dir');
    });
  });
});
