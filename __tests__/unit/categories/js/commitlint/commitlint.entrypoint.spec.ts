import { presetState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { commitlint } from '#src/categories/js/commitlint/commitlint.entrypoint.ts';

describe('commitlint.entrypoint', () => {
  beforeEach(() => {
    presetState.setJsPreset('default');
    fileSystem.seed({ dirs: ['.husky'] });
  });

  describe('commitlint', () => {
    it('installs commitlint packages, writes config, and adds husky hook', async () => {
      await commitlint();

      expect(terminal.getCommands()).toEqual([
        ['npm', ['i', '-D', '@commitlint/cli', '@commitlint/config-conventional']],
      ]);
      expect(fileSystem.readJson('.commitlintrc.json')).toEqual({
        extends: ['@commitlint/config-conventional'],
      });
      expect(fileSystem.readFile('.husky/commit-msg')).toBe('npx --no-install -- commitlint --edit "$1"\n');
    });
  });
});
