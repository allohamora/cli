import { presetState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { lintStaged } from '#src/categories/js/lint-staged/lint-staged.entrypoint.ts';
import { beforeEach, describe, expect, it } from 'vitest';

describe('lint-staged.entrypoint', () => {
  beforeEach(() => {
    presetState.setJsPreset('default');
  });

  describe('lintStaged', () => {
    it('installs lint-staged, writes package config, and adds husky hook', async () => {
      fileSystem.seed({
        dirs: ['.husky'],
        files: {
          '.prettierrc': '{}',
          '.stylelintrc': '{}',
          'eslint.config.mjs': '',
          'jest.config.cjs': '',
        },
        packageJson: { scripts: { test: 'vitest' } },
      });

      await lintStaged();

      expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', 'lint-staged']]]);
      expect(fileSystem.readJson('package.json')).toEqual({
        scripts: { test: 'vitest' },
        'lint-staged': {
          '*.{js,cjs,mjs,json,yml,md}': 'prettier --write',
          '*.css': 'stylelint --fix',
          '*.js': ['eslint --fix', 'jest --findRelatedTests'],
        },
      });
      expect(fileSystem.readFile('.husky/pre-commit')).toBe('npx --no-install lint-staged\n');
    });
  });
});
