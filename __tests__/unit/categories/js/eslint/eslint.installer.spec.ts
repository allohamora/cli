import { presetState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { createConfig } from '#__tests__/utils/eslint.utils.ts';
import { buildConfig, eslint } from '#src/categories/js/eslint/eslint.installer.ts';
import { beforeEach, describe, expect, it } from 'vitest';

describe('eslint.installer', () => {
  beforeEach(() => {
    presetState.setJsPreset('default');
  });

  describe('eslint', () => {
    it('builds config with shared configs and parser options', () => {
      expect(
        buildConfig(
          createConfig({
            configs: ['beautifulSort.configs.recommended'],
            eslintConfig: {
              languageOptions: {
                parserOptions: {
                  project: true,
                },
              },
            },
          }),
        ),
      ).toBe(
        [
          `import { defineConfig } from 'eslint/config';`,
          '',
          `export default defineConfig(`,
          `beautifulSort.configs.recommended,`,
          `{languageOptions: {parserOptions: {"project":true}}}`,
          `);`,
        ].join('\n'),
      );
    });

    it('builds typescript config with rules', () => {
      expect(
        buildConfig(
          createConfig({
            eslintConfig: {
              rules: {
                'object-shorthand': 'warn',
                '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
              },
            },
            typescript: true,
          }),
        ),
      ).toBe(
        [
          '// @ts-check',
          `import { defineConfig } from 'eslint/config';`,
          '',
          `export default defineConfig(`,
          `{rules: {"object-shorthand":"warn","@typescript-eslint/consistent-type-definitions":["error","type"]}}`,
          `);`,
        ].join('\n'),
      );
    });

    it('builds config with ignores between shared configs and main config', () => {
      expect(
        buildConfig(
          createConfig({
            configs: ['eslint.configs.recommended', '...tseslint.configs.recommended'],
            ignores: ['node_modules', 'dist'],
            eslintConfig: {
              files: ['**/*.ts'],
            },
          }),
        ),
      ).toBe(
        [
          `import { defineConfig } from 'eslint/config';`,
          '',
          `export default defineConfig(`,
          `eslint.configs.recommended,`,
          `...tseslint.configs.recommended,`,
          `{ignores: ["node_modules","dist"]},`,
          `{files: ["**/*.ts"]}`,
          `);`,
        ].join('\n'),
      );
    });

    it('installs default eslint dependencies and writes formatted config', async () => {
      await eslint();

      expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', 'eslint', 'globals', '@eslint/js']]]);
      expect(fileSystem.readFile('eslint.config.mjs')).toBe(
        [
          `import globals from 'globals';`,
          `import eslint from '@eslint/js';`,
          `import { defineConfig } from 'eslint/config';`,
          '',
          'export default defineConfig(',
          '  eslint.configs.recommended,',
          `  { ignores: ['node_modules', 'dist'] },`,
          `  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: { ...globals.node } } },`,
          ');',
          '',
        ].join('\n'),
      );
    });

    it('adds default lint scripts to package.json', async () => {
      fileSystem.seed({ packageJson: { scripts: { test: 'vitest' } } });

      await eslint();

      expect(fileSystem.readJson('package.json')).toEqual({
        scripts: {
          test: 'vitest',
          lint: 'eslint "**/*.js"',
          'lint:fix': 'eslint "**/*.js" --fix',
        },
      });
    });
  });
});
