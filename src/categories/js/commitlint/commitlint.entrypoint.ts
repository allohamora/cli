import { addJsonFileToRoot } from 'src/utils/fs';
import { installDevelopmentDependencies } from 'src/utils/npm';
import { getConfig } from './commitlint.config';
import { huskyHandler } from './commitlint.utils';

export const commitlint = async () => {
  const { config, rules } = getConfig();

  await installDevelopmentDependencies('@commitlint/cli', rules);
  await addJsonFileToRoot('.commitlintrc.json', config);
  await huskyHandler();
};
