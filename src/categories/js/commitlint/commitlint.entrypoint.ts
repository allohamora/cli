import { addJsonFileToRoot } from 'src/utils/fs';
import { installDevelopmentDependencies } from 'src/utils/npm';
import { getConfig } from './commitlint.config';
import { CONFIG_FILE_NAME, PACKAGE_NAME } from './commitlint.const';
import { huskyIntegration } from './commitlint.utils';

export const commitlint = async () => {
  const { config, rules } = getConfig();

  await installDevelopmentDependencies(PACKAGE_NAME, rules);
  await addJsonFileToRoot(CONFIG_FILE_NAME, config);
  await huskyIntegration();
};
