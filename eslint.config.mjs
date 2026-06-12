// @ts-check
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import beautifulSort from 'eslint-plugin-beautiful-sort';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  beautifulSort.configs.recommended,
  eslintPluginPrettierRecommended,
  { ignores: ['node_modules', 'dist', 'bin'] },
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
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
      '@typescript-eslint/no-this-alias': 'warn',
    },
  },
);
