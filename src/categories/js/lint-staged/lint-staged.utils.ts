import { LintStagedConfig } from './config/config.interface';
import { isPrettierInstalled } from '../prettier/prettier.utils';
import { addHook, isHuskyInstalled } from '../husky/husky.utils';
import { CLI_NAME } from './lint-staged.const';
import { CLI_NAME as PRETTIER_CLI_NAME } from '../prettier/prettier.const';
import { CLI_NAME as JEST_CLI_NAME } from '../jest/jest.const';
import { CLI_NAME as ESLINT_CLI_NAME } from '../eslint/eslint.const';
import { isJestInstalled } from '../jest/jest.utils';
import { isEslintInstalled } from '../eslint/eslint.utils';
import { isStylelintInstalled } from '../stylelint/stylelint.utils';
import { CLI_NAME as STYLELINT_CLI_NAME } from '../stylelint/stylelint.const';

type ScriptFileExtension = '*.js' | '*.ts' | '*.css' | '*.{ts,tsx}' | '*.{css,ts,tsx}';

interface OptionMutation {
  check: (config: LintStagedConfig, key: string, value: string) => boolean;
  mutate: (config: LintStagedConfig, key: string, value: string) => void;
}

const arrayOptionMutation: OptionMutation = {
  check: (config, key) => Array.isArray(config[key]),
  mutate: (config, key, value) => {
    config[key] = Array.from(new Set([...(config[key] as unknown[]), value]));
  },
};

const stringOptionMutation: OptionMutation = {
  check: (config, key) => typeof config[key] === 'string',
  mutate: (config, key, value) => {
    const array = Array.from(new Set([config[key], value]));
    config[key] = array.length === 1 ? array[0] : array;
  },
};

const undefinedOptionMutation: OptionMutation = {
  check: (config, key) => typeof config[key] === 'undefined',
  mutate: (config, key, value) => {
    config[key] = value;
  },
};

const optionMutations: OptionMutation[] = [arrayOptionMutation, stringOptionMutation, undefinedOptionMutation];

export const addOptionToLintStagedConfig = (config: LintStagedConfig, key: string, value: string) => {
  const found = optionMutations.find(({ check }) => check(config, key, value));

  if (!found) {
    throw new Error('option mutator is not found!');
  }

  found.mutate(config, key, value);
};

export const huskyIntegration = async () => {
  if (await isHuskyInstalled()) {
    await addHook('pre-commit', `npx --no-install ${CLI_NAME}`);
  }
};

export const jestMutation = (fileExtension: ScriptFileExtension) => async (config: LintStagedConfig) => {
  if (await isJestInstalled()) {
    addOptionToLintStagedConfig(config, fileExtension, `${JEST_CLI_NAME} --findRelatedTests`);
  }
};

export const eslintMutation = (fileExtension: ScriptFileExtension) => async (config: LintStagedConfig) => {
  if (await isEslintInstalled()) {
    addOptionToLintStagedConfig(config, fileExtension, `${ESLINT_CLI_NAME} --fix`);
  }
};

export const prettierMutation = async (config: LintStagedConfig) => {
  if (await isPrettierInstalled()) {
    addOptionToLintStagedConfig(config, '*.{js,json,yml,md}', `${PRETTIER_CLI_NAME} --write`);
  }
};

export const stylelintMutation = (fileExtension: ScriptFileExtension) => {
  return async (config: LintStagedConfig) => {
    if (await isStylelintInstalled()) {
      addOptionToLintStagedConfig(config, fileExtension, `${STYLELINT_CLI_NAME} --fix`);
    }
  };
};
