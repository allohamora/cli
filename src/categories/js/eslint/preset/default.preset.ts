import { jestMutation, prettierMutation } from '#src/categories/js/eslint/eslint.service.ts';
import type { Preset } from '#src/categories/js/eslint/preset/preset.type.ts';

export const defaultPreset: Preset = {
  dependencies: ['globals', '@eslint/js'],
  imports: [`import globals from 'globals'`, `import eslint from '@eslint/js'`],
  configs: [`eslint.configs.recommended`],
  ignores: ['node_modules', 'dist'],
  eslintConfig: {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: ['node'],
    },
  },
  scripts: [
    { name: 'lint', script: 'eslint "**/*.js"' },
    { name: 'lint:fix', script: 'eslint "**/*.js" --fix' },
  ],
  mutations: [prettierMutation, jestMutation],
};
