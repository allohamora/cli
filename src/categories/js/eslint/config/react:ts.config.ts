import { jestMutation, prettierMutation } from '../eslint.utils';
import { Config } from './config.interface';

export const reactTsConfig: Config = {
  dependencies: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint-plugin-beautiful-sort',
    'eslint-config-airbnb',
    'eslint-config-airbnb-typescript',
    'eslint-plugin-react-refresh',
    'eslint-plugin-react-hooks',
    'eslint-plugin-deprecation',
  ],
  eslintConfig: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'beautiful-sort', 'react-refresh'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'airbnb',
      'airbnb-typescript',
      'plugin:deprecation/recommended',
    ],
    root: true,
    env: {
      es6: true,
      browser: true,
      es2020: true,
      node: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      'no-use-before-define': 'error',
      'object-shorthand': 'warn',

      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/ban-types': 'warn',

      // https://github.com/jsx-eslint/eslint-plugin-react/issues/3292
      'react/jsx-no-leaked-render': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': 'off',
      'react/no-invalid-html-attribute': 'warn',
      'react/display-name': 'warn',
      'import/prefer-default-export': 'off',
      'react/require-default-props': 'off',
      'react/no-array-index-key': 'warn',

      'import/order': 'off',
      'beautiful-sort/import': [
        'error',
        {
          special: ['react'],
          order: ['special', 'namespace', 'default', 'defaultObj', 'obj', 'none'],
        },
      ],

      'react-refresh/only-export-components': 'warn',
    },
  },
  ignore: ['node_modules', 'dist'],
  scripts: [
    { name: 'lint', script: 'eslint "**/*.{ts,tsx}"' },
    { name: 'lint:fix', script: 'eslint "**/*.{ts,tsx}" --fix' },
  ],
  mutations: [prettierMutation, jestMutation],
};
