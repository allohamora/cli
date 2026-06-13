import { createRootInstalledCheck } from '#src/services/installation.service.ts';
import { isJestInstalled } from '#src/categories/js/jest/jest.service.ts';
import { isPrettierInstalled } from '#src/categories/js/prettier/prettier.service.ts';
import type { Preset } from '#src/categories/js/eslint/preset/preset.type.ts';
import { ESLINT_CONFIG_FILE_NAME, ESLINT_SCRIPT_NAME } from '#src/categories/js/eslint/eslint.const.ts';

export const jestMutation = async (preset: Preset) => {
  if (await isJestInstalled()) {
    if (!preset.eslintConfig.languageOptions) {
      preset.eslintConfig.languageOptions = { globals: [] };
    }

    preset.eslintConfig.languageOptions?.globals?.push('jest');
  }
};

const addPrettierToPreset = (preset: Preset) => {
  const dependenciesSet = new Set([...preset.dependencies, 'eslint-plugin-prettier', 'eslint-config-prettier']);
  preset.dependencies = Array.from(dependenciesSet);

  const importsSet = new Set([
    ...preset.imports,
    "import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'",
  ]);
  preset.imports = Array.from(importsSet);

  const configsSet = new Set([...preset.configs, 'eslintPluginPrettierRecommended']);
  preset.configs = Array.from(configsSet);
};

export const prettierMutation = async (preset: Preset) => {
  if (await isPrettierInstalled()) {
    addPrettierToPreset(preset);
  }
};

export const isEslintInstalled = createRootInstalledCheck(ESLINT_SCRIPT_NAME, ESLINT_CONFIG_FILE_NAME);
