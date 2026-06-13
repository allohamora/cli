import { jestMutation, prettierMutation } from '#src/categories/js/eslint/eslint.service.ts';
import type { Preset } from '#src/categories/js/eslint/preset/preset.type.ts';

export const reactTsPreset: Preset = {
  dependencies: [
    'globals',
    '@eslint/js',
    'typescript-eslint',
    'eslint-plugin-react',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-beautiful-sort',
  ],
  imports: [
    `import globals from 'globals'`,
    `import eslint from '@eslint/js'`,
    `import tseslint from 'typescript-eslint'`,
    `import pluginReact from 'eslint-plugin-react'`,
    `import pluginJsxA11y from 'eslint-plugin-jsx-a11y'`,
    `import beautifulSort from 'eslint-plugin-beautiful-sort'`,
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
      parserOptions: {
        project: true,
      },
    },
    rules: {
      'no-use-before-define': 'error',
      'object-shorthand': 'warn',
      'no-async-promise-executor': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/no-deprecated': 'error',
    },
  },
  typescript: true,
  scripts: [
    { name: 'lint', script: 'eslint "**/*.{ts,tsx}"' },
    { name: 'lint:fix', script: 'eslint "**/*.{ts,tsx}" --fix' },
  ],
  mutations: [prettierMutation, jestMutation],
};
