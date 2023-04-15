import { jestMutation, prettierMutation } from '../eslint.utils';
import { Config } from './config.interface';

export const reactTsConfig: Config = {
  dependencies: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint-plugin-beautiful-sort',
    'eslint-config-airbnb',
    'eslint-config-airbnb-typescript',
  ],
  eslintConfig: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'beautiful-sort'],
    extends: ['plugin:@typescript-eslint/recommended', 'airbnb', 'airbnb-typescript'],
    root: true,
    env: {
      es6: true,
      browser: true,
      node: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      '@typescript-eslint/ban-types': 'warn',

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
    },
  },
  ignore: ['node_modules', 'dist'],
  scripts: [
    { name: 'lint', script: 'eslint "**/*.{ts,tsx}"' },
    { name: 'lint:fix', script: 'eslint "**/*.{ts,tsx}" --fix' },
  ],
  mutations: [prettierMutation, jestMutation],
};
