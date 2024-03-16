import { jestMutation, prettierMutation } from '../eslint.utils';
import { Config } from './config.interface';

export const nodeTsConfig: Config = {
  dependencies: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint-plugin-beautiful-sort',
    'eslint-plugin-deprecation',
  ],
  eslintConfig: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'beautiful-sort'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:deprecation/recommended'],
    root: true,
    env: {
      node: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      'no-use-before-define': 'error',
      'object-shorthand': 'warn',

      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
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
  ignore: ['node_modules', 'dist'],
  scripts: [
    { name: 'lint', script: 'eslint "**/*.ts"' },
    { name: 'lint:fix', script: 'eslint "**/*.ts" --fix' },
  ],
  mutations: [prettierMutation, jestMutation],
};
