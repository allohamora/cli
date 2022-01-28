import { prettierMutator } from '../eslint.utils';
import { Config } from './config.interface';

export const nodeTsConfig: Config = {
  dependencies: ['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser', 'eslint-plugin-beautiful-sort'],
  eslintConfig: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'beautiful-sort'],
    extends: ['plugin:@typescript-eslint/recommended'],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',

      'beautiful-sort/import': [
        'error',
        {
          special: [],
          order: ['special', 'namespace', 'default', 'defaultObj', 'obj', 'none'],
        },
      ],
    },
  },
  scripts: [
    { name: 'lint', script: 'eslint "src/**/*.ts"' },
    { name: 'lint:fix', script: 'eslint "src/**/*.ts" --fix' },
  ],
  mutators: [prettierMutator],
};
