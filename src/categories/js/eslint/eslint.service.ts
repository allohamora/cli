import { createRootInstalledCheck } from '#src/services/installation.service.ts';
import { isJestInstalled } from '#src/categories/js/jest/jest.service.ts';
import { isPrettierInstalled } from '#src/categories/js/prettier/prettier.service.ts';
import type { Config } from '#src/categories/js/eslint/config/config.interface.ts';
import { ESLINT_CONFIG_FILE_NAME, ESLINT_SCRIPT_NAME } from '#src/categories/js/eslint/eslint.const.ts';

export const jestMutation = async (config: Config) => {
  if (await isJestInstalled()) {
    if (!config.eslintConfig.languageOptions) {
      config.eslintConfig.languageOptions = { globals: [] };
    }

    config.eslintConfig.languageOptions?.globals?.push('jest');
  }
};

const addPrettierToConfig = (config: Config) => {
  const dependenciesSet = new Set([...config.dependencies, 'eslint-plugin-prettier', 'eslint-config-prettier']);
  config.dependencies = Array.from(dependenciesSet);

  const importsSet = new Set([
    ...config.imports,
    "import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'",
  ]);
  config.imports = Array.from(importsSet);

  const configsSet = new Set([...config.configs, 'eslintPluginPrettierRecommended']);
  config.configs = Array.from(configsSet);
};

export const prettierMutation = async (config: Config) => {
  if (await isPrettierInstalled()) {
    addPrettierToConfig(config);
  }
};

export const isEslintInstalled = createRootInstalledCheck(ESLINT_SCRIPT_NAME, ESLINT_CONFIG_FILE_NAME);
