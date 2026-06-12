import { presetState } from '#__tests__/setup-test-context.ts';
import { getConfig } from '#src/categories/js/eslint/config/index.ts';
import { describe, expect, it } from 'vitest';

describe('eslint/config', () => {
  it('returns the default javascript eslint config', () => {
    expect(getConfig()).toMatchObject({
      dependencies: ['globals', '@eslint/js'],
      imports: [`import globals from 'globals'`, `import eslint from '@eslint/js'`],
      configs: ['eslint.configs.recommended'],
      ignores: ['node_modules', 'dist'],
      eslintConfig: {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
          globals: ['node'],
        },
      },
      scripts: [
        { name: 'lint', script: 'eslint "**/*.js"' },
        { name: 'lint:fix', script: 'eslint "**/*.js" --fix' },
      ],
    });
  });

  it('returns the node typescript eslint config', () => {
    presetState.setJsPreset('node:ts');

    expect(getConfig()).toMatchObject({
      dependencies: ['globals', '@eslint/js', 'typescript-eslint', 'eslint-plugin-beautiful-sort'],
      imports: [
        `import globals from 'globals'`,
        `import eslint from '@eslint/js'`,
        `import tseslint from 'typescript-eslint'`,
        `import beautifulSort from 'eslint-plugin-beautiful-sort'`,
      ],
      configs: ['eslint.configs.recommended', '...tseslint.configs.recommended', 'beautifulSort.configs.recommended'],
      ignores: ['node_modules', 'dist'],
      eslintConfig: {
        files: ['**/*.ts'],
        languageOptions: {
          globals: ['node'],
          parserOptions: { project: true },
        },
        rules: {
          'no-use-before-define': 'error',
          'object-shorthand': 'warn',
          'no-async-promise-executor': 'warn',
          '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
          '@typescript-eslint/no-explicit-any': 'warn',
          '@typescript-eslint/no-misused-promises': 'warn',
          '@typescript-eslint/no-deprecated': 'error',
        },
      },
      typescript: true,
      scripts: [
        { name: 'lint', script: 'eslint "**/*.ts"' },
        { name: 'lint:fix', script: 'eslint "**/*.ts" --fix' },
      ],
    });
  });

  it('returns the react typescript eslint config', () => {
    presetState.setJsPreset('react:ts');

    expect(getConfig()).toMatchObject({
      dependencies: [
        'globals',
        '@eslint/js',
        'typescript-eslint',
        'eslint-plugin-react',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-beautiful-sort',
      ],
      configs: [
        'eslint.configs.recommended',
        '...tseslint.configs.recommended',
        'beautifulSort.configs.recommended',
        `pluginReact.configs.flat['jsx-runtime']`,
        `// @ts-expect-error types are not compatible`,
        'pluginJsxA11y.flatConfigs.recommended',
      ],
      ignores: ['node_modules', 'dist'],
      eslintConfig: {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
          globals: ['browser'],
          parserOptions: { project: true },
        },
      },
      typescript: true,
      scripts: [
        { name: 'lint', script: 'eslint "**/*.{ts,tsx}"' },
        { name: 'lint:fix', script: 'eslint "**/*.{ts,tsx}" --fix' },
      ],
    });
  });
});
