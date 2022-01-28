import { LintStagedConfig } from './config/config.interface';
import { isPrettierInstalled } from '../prettier/prettier.utils';
import { addHook, isHuskyInstalled } from '../husky/husky.utils';
import { CLI_NAME } from './lint-staged.const';
import { CLI_NAME as PRETTIER_CLI_NAME } from '../prettier/prettier.const';

export const huskyIntegration = async () => {
  if (await isHuskyInstalled()) {
    await addHook('pre-commit', `npx --no-install ${CLI_NAME}`);
  }
};

export const prettierMutator = async (config: LintStagedConfig) => {
  if (await isPrettierInstalled()) {
    config['*.{js,json,yml,md}'] = `${PRETTIER_CLI_NAME} --write`;
  }
};
