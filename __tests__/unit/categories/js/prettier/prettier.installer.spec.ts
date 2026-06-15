import { presetState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { prettier } from '#src/categories/js/prettier/prettier.installer.ts';
import { beforeEach, describe, expect, it } from 'vitest';

describe('prettier.installer', () => {
  beforeEach(() => {
    presetState.setJsPreset('default');
  });

  describe('prettier', () => {
    it('installs prettier and writes the default config files', async () => {
      await prettier();

      expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', 'prettier']]]);
      expect(fileSystem.readJson('.prettierrc')).toEqual({
        semi: true,
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
      });
      expect(fileSystem.readFile('.prettierignore')).toBe(
        ['dist', 'node_modules', 'public', '.husky', 'package-lock.json', 'coverage', ''].join('\n'),
      );
    });

    it('adds prettier scripts to package.json', async () => {
      fileSystem.seed({ packageJson: { scripts: { test: 'vitest' } } });

      await prettier();

      expect(fileSystem.readJson('package.json')).toEqual({
        scripts: {
          test: 'vitest',
          format: 'prettier . --check',
          'format:fix': 'prettier --write .',
        },
      });
    });
  });
});
