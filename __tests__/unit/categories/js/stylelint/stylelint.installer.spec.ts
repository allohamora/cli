import { presetState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { stylelint } from '#src/categories/js/stylelint/stylelint.installer.ts';
import { beforeEach, describe, expect, it } from 'vitest';

describe('stylelint.installer', () => {
  beforeEach(() => {
    presetState.setJsPreset('default');
  });

  describe('stylelint', () => {
    it('installs default dependencies and writes stylelint files', async () => {
      await stylelint();

      expect(terminal.getCommands()).toEqual([
        ['npm', ['i', '-D', 'stylelint', 'stylelint-config-standard', 'stylelint-config-clean-order']],
      ]);
      expect(fileSystem.readFile('.stylelintrc')).toBe(
        [
          '{',
          '  "extends": [',
          '    "stylelint-config-standard",',
          '    "stylelint-config-clean-order"',
          '  ]',
          '}',
          '',
        ].join('\n'),
      );
      expect(fileSystem.readFile('.stylelintignore')).toBe(['node_modules', 'build', 'dist', ''].join('\n'));
    });

    it('adds default scripts to package.json', async () => {
      fileSystem.seed({ packageJson: { scripts: { test: 'vitest' } } });

      await stylelint();

      expect(fileSystem.readJson('package.json')).toEqual({
        scripts: {
          test: 'vitest',
          csslint: 'stylelint "src/**/*.css"',
          'csslint:fix': 'stylelint "src/**/*.css" --fix',
        },
      });
    });

    it('installs react typescript dependencies and writes stylelint files', async () => {
      presetState.setJsPreset('react:ts');

      await stylelint();

      expect(terminal.getCommands()).toEqual([
        [
          'npm',
          [
            'i',
            '-D',
            'stylelint',
            'stylelint-config-standard',
            'stylelint-config-clean-order',
            'postcss-styled-syntax',
          ],
        ],
      ]);
      expect(fileSystem.readFile('.stylelintrc')).toBe(
        [
          '{',
          '  "extends": [',
          '    "stylelint-config-standard",',
          '    "stylelint-config-clean-order"',
          '  ],',
          '  "overrides": [',
          '    {',
          '      "files": [',
          '        "**/*.{js,jsx,ts,tsx}"',
          '      ],',
          '      "customSyntax": "postcss-styled-syntax"',
          '    }',
          '  ]',
          '}',
          '',
        ].join('\n'),
      );
      expect(fileSystem.readFile('.stylelintignore')).toBe(['node_modules', '.next', 'build', 'dist', ''].join('\n'));
    });

    it('adds react typescript scripts to package.json', async () => {
      presetState.setJsPreset('react:ts');
      fileSystem.seed({ packageJson: { scripts: { test: 'vitest' } } });

      await stylelint();

      expect(fileSystem.readJson('package.json')).toEqual({
        scripts: {
          test: 'vitest',
          csslint: 'stylelint "src/**/*.{css,ts,tsx}"',
          'csslint:fix': 'stylelint "src/**/*.{css,ts,tsx}" --fix',
        },
      });
    });
  });
});
