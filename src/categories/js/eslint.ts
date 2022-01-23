import { jsCategoryState } from 'src/libs/categories';
import { addJsonFileToRoot } from 'src/libs/fs';
import { addScripts, installDevelopmentDependencies } from 'src/libs/npm';

interface Config {
  dependencies: string[];
  config: Record<string, unknown>;
  scripts: { name: string; script: string }[];
}

const nodeTsConfig: Config = {
  dependencies: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'eslint-config-prettier',
    'eslint-plugin-beautiful-sort',
    'eslint-plugin-prettier',
  ],
  config: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'beautiful-sort'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
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
};

const defaultConfig: Config = {
  dependencies: ['eslint-plugin-prettier', 'eslint-config-prettier'],
  config: {
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

const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
  'node:ts': nodeTsConfig,
});

export const eslint = async () => {
  const { config, dependencies, scripts } = getConfig();

  await installDevelopmentDependencies('eslint', ...dependencies);
  await addJsonFileToRoot('.eslintrc.json', config);
  await addScripts(...scripts);
};
