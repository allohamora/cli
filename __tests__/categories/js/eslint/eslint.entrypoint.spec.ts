import { configState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { createConfig } from '#__tests__/categories/js/eslint/eslint-test.utils.ts';
import { defaultConfig } from '#src/categories/js/eslint/config/default.config.ts';
import { buildConfig, eslint } from '#src/categories/js/eslint/eslint.entrypoint.ts';
import { format } from '#src/utils/javascript.ts';

describe('eslint.entrypoint', () => {
  beforeEach(() => {
    configState.setConfig('default');
  });

  describe('eslint', () => {
    it('builds config with plugins and parser options', () => {
      expect(
        buildConfig(
          createConfig({
            eslintConfig: {
              languageOptions: {
                parserOptions: {
                  project: true,
                },
              },
              plugins: {
                'beautiful-sort': 'beautifulSort',
              },
            },
          }),
        ),
      ).toBe(
        [
          `import { defineConfig } from 'eslint/config';`,
          '',
          `export default defineConfig(`,
          `{languageOptions: {parserOptions: {"project":true}},plugins: {'beautiful-sort': beautifulSort}}`,
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

    it('installs default eslint dependencies and writes formatted config', async () => {
      await eslint();

      expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', 'eslint', ...defaultConfig.dependencies]]]);
      expect(fileSystem.readFile('eslint.config.mjs')).toBe(`${await format(buildConfig(defaultConfig))}\n`);
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
