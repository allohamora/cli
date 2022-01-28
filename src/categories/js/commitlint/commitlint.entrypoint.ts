import { addJsonFileToRoot } from 'src/utils/fs';
import { installDevelopmentDependencies } from 'src/utils/npm';
import { getConfig } from './commitlint.config';
import { CONFIG_FILE_NAME, SCRIPT_NAME } from './commitlint.const';
import { huskyIntegration } from './commitlint.utils';

export const commitlint = async () => {
  const { config, rules } = getConfig();

  await installDevelopmentDependencies(SCRIPT_NAME, rules);
  await addJsonFileToRoot(CONFIG_FILE_NAME, config);
  await huskyIntegration();
};
