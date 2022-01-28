import { isEslintInstalled } from '../../eslint/eslint.utils';
import { prettierMutator } from '../lint-staged.utils';
import { Config, LintStagedConfig, Mutator } from './config.interface';

const eslintNodeTsConfigMutator: Mutator = async (config) => {
  if (await isEslintInstalled()) {
    return addEslintToConfig(config);
  }
};

const addEslintToConfig = (config: LintStagedConfig) => {
  config['*.ts'] = 'eslint --fix';
};

export const nodeTsConfig: Config = {
  config: {},
  mutators: [prettierMutator, eslintNodeTsConfigMutator],
};
