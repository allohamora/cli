import { LintStagedConfig, Mutator } from './config/config.interface';
import { isPrettierInstalled } from '../prettier/prettier.utils';
import { addHook, isHuskyInstalled } from '../husky/husky.utils';

export const huskyIntegrationHandler = async () => {
  if (await isHuskyInstalled()) {
    await addHook('pre-commit', 'npx --no-install lint-staged');
  }
};

export const prettierConfigMutator: Mutator = async (config) => {
  if (await isPrettierInstalled()) {
    return addPrettierToConfig(config);
  }
};

export const addPrettierToConfig = (config: LintStagedConfig) => {
  config['*.{js,json,yml,md}'] = 'prettier --write';
};
