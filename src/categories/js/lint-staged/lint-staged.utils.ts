import { Mutator } from './config/config.interface';
import { isPrettierInstalled } from '../prettier/prettier.utils';
import { addHook, isHuskyInstalled } from '../husky/husky.utils';
import { CLI_NAME } from './lint-staged.config';
import { CLI_NAME as PRETTIER_CLI_NAME } from '../prettier/prettier.config';

export const huskyIntegration = async () => {
  if (await isHuskyInstalled()) {
    await addHook('pre-commit', `npx --no-install ${CLI_NAME}`);
  }
};

export const prettierMutator: Mutator = async (config) => {
  if (await isPrettierInstalled()) {
    config['*.{js,json,yml,md}'] = `${PRETTIER_CLI_NAME} --write`;
  }
};
