import { Config } from './config.interface';

export const defaultConfig: Config = {
  dependencies: [],
  eslintConfig: {
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    env: {
      es6: true,
      node: true,
      browser: true,
      jest: true,
    },
    root: true,
    extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  },
  scripts: [
    { name: 'lint', script: 'eslint "src/**/*.js"' },
    { name: 'lint:fix', script: 'eslint "src/**/*.js" --fix' },
  ],
};