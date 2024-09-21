import { isInstalledAndInRootCheck } from 'src/utils/installed';
import { isJestInstalled } from '../jest/jest.utils';
import { isPrettierInstalled } from '../prettier/prettier.utils';
import { Config } from './config/config.interface';
import { CONFIG_FILE_NAME, SCRIPT_NAME } from './eslint.const';

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

export const isEslintInstalled = isInstalledAndInRootCheck(SCRIPT_NAME, CONFIG_FILE_NAME);
