import { jestMutation, prettierMutation } from '../eslint.utils';
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
    },
    root: true,
    extends: ['eslint:recommended'],
  },
  ignore: ['node_modules', 'dist'],
  scripts: [
    { name: 'lint', script: 'eslint "**/*.js"' },
    { name: 'lint:fix', script: 'eslint "**/*.js" --fix' },
  ],
  mutations: [prettierMutation, jestMutation],
};
