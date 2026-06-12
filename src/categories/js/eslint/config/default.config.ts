import { jestMutation, prettierMutation } from '#src/categories/js/eslint/eslint.service.ts';
import type { Config } from '#src/categories/js/eslint/config/config.interface.ts';

export const defaultConfig: Config = {
  dependencies: ['globals', '@eslint/js'],
  imports: [`import globals from 'globals'`, `import eslint from '@eslint/js'`],
  configs: [`eslint.configs.recommended`],
  eslintConfig: {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: ['node'],
    },
    ignores: ['node_modules', 'dist'],
  },
  scripts: [
    { name: 'lint', script: 'eslint "**/*.js"' },
    { name: 'lint:fix', script: 'eslint "**/*.js" --fix' },
  ],
  mutations: [prettierMutation, jestMutation],
};
