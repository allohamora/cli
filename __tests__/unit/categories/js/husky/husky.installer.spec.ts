import { fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { husky } from '#src/categories/js/husky/husky.installer.ts';
import { describe, expect, it } from 'vitest';

describe('husky.installer', () => {
  describe('husky', () => {
    it('installs husky, adds prepare script, and runs prepare', async () => {
      await husky();

      expect(terminal.getCommands()).toEqual([
        ['npm', ['i', '-D', 'husky']],
        ['npm', ['run', 'prepare']],
      ]);
      expect(fileSystem.readJson('package.json')).toEqual({
        scripts: {
          prepare: 'husky',
        },
      });
    });
  });
});
