import { fileSystem } from '#__tests__/setup-test-context.ts';
import { agentsMd } from '#src/categories/js/agents-md/agents-md.installer.ts';
import { content } from '#src/categories/js/agents-md/preset/default.preset.ts';
import { describe, expect, it } from 'vitest';

describe('agents-md.installer', () => {
  describe('agentsMd', () => {
    it('writes AGENTS.md with the default content and a CLAUDE.md symlink to it', async () => {
      await agentsMd();

      expect(fileSystem.readFile('AGENTS.md')).toBe(`${content}\n`);
      expect(fileSystem.readSymlink('CLAUDE.md')).toBe('AGENTS.md');
    });
  });
});
