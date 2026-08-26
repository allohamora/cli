import path from 'node:path';
import { fileSystem } from '#__tests__/setup-test-context.ts';
import { describe, expect, it } from 'vitest';
import { writeAgentsSkill, writeClaudeSkillSymlink, writeSkill } from '#src/services/skill.service.ts';

describe('skill.service', () => {
  const name = 'foo';
  const skillPath = path.join('.agents', 'skills', name);
  const claudeSkillPath = path.join('.claude', 'skills', name);

  describe('writeAgentsSkill', () => {
    it('writes SKILL.md to .agents/skills/<name>', async () => {
      const content = '__test__';

      await writeAgentsSkill(name, content);

      expect(fileSystem.readFile(path.join(skillPath, 'SKILL.md'))).toBe(`${content}\n`);
    });
  });

  describe('writeClaudeSkillSymlink', () => {
    it('symlinks .claude/skills/<name> to .agents/skills/<name>', async () => {
      await writeClaudeSkillSymlink(name);

      expect(fileSystem.readSymlink(claudeSkillPath)).toBe(path.join('..', '..', skillPath));
      expect(fileSystem.readSymlinkType(claudeSkillPath)).toBe('dir');
    });
  });

  describe('writeSkill', () => {
    it('writes SKILL.md to .agents/skills/<name> and symlinks it from .claude/skills/<name>', async () => {
      const content = '__test__';

      await writeSkill(name, content);

      expect(fileSystem.readFile(path.join(skillPath, 'SKILL.md'))).toBe(`${content}\n`);
      expect(fileSystem.readSymlink(claudeSkillPath)).toBe(path.join('..', '..', skillPath));
      expect(fileSystem.readSymlinkType(claudeSkillPath)).toBe('dir');
    });
  });
});
