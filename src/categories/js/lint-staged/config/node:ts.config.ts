import { isEslintInstalled } from '../../eslint/eslint.utils';
import { prettierMutator } from '../lint-staged.utils';
import { Config, LintStagedConfig } from './config.interface';

const eslintNodeTsConfigMutator = async (config: LintStagedConfig) => {
  if (await isEslintInstalled()) {
    config['*.ts'] = 'eslint --fix';
  }
};

export const nodeTsConfig: Config = {
  config: {},
  mutators: [prettierMutator, eslintNodeTsConfigMutator],
};
