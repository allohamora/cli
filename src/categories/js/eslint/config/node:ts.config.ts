import { jestMutation, prettierMutation } from '../eslint.utils';
import { Config } from './config.interface';

export const nodeTsConfig: Config = {
  dependencies: [
    'globals',
    '@eslint/js',
    'typescript-eslint',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint-plugin-beautiful-sort',
  ],
  imports: [
    `import globals from 'globals'`,
    `import eslint from '@eslint/js'`,
    `import tseslint from 'typescript-eslint'`,
    `import tsPlugin from '@typescript-eslint/eslint-plugin'`,
    `import beautifulSort from 'eslint-plugin-beautiful-sort'`,
  ],
  configs: ['eslint.configs.recommended', '...tseslint.configs.recommended'],
  eslintConfig: {
    files: ['**/*.ts'],
    languageOptions: {
      globals: ['node'],
      parserOptions: {
        project: true,
      },
    },
    ignores: ['node_modules', 'dist'],
    plugins: {
      '@typescript-eslint': 'tsPlugin',
      'beautiful-sort': 'beautifulSort',
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
      'beautiful-sort/import': [
        'error',
        {
          special: [],
          order: ['special', 'namespace', 'default', 'defaultObj', 'obj', 'none'],
        },
      ],
    },
  },
  typescript: true,
  scripts: [
    { name: 'lint', script: 'eslint "**/*.ts"' },
    { name: 'lint:fix', script: 'eslint "**/*.ts" --fix' },
  ],
  mutations: [prettierMutation, jestMutation],
};
