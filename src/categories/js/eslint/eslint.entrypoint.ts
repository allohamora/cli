import { getConfig } from './eslint.config';
import { addFileToRoot, addJsonFileToRoot } from 'src/utils/fs';
import { addScripts, installDevelopmentDependencies } from 'src/utils/npm';
import { CONFIG_FILE_NAME, CONFIG_IGNORE_FILE_NAME, PACKAGE_NAME } from './eslint.const';
import { applyMutations } from 'src/utils/mutation';

export const eslint = async () => {
  const config = getConfig();
  await applyMutations(config, config.mutations);

  const { dependencies, eslintConfig, scripts, ignore } = config;

  await installDevelopmentDependencies(PACKAGE_NAME, ...dependencies);
  await addJsonFileToRoot(CONFIG_FILE_NAME, eslintConfig);
  await addFileToRoot(CONFIG_IGNORE_FILE_NAME, ignore.join('\n'));
  await addScripts(...scripts);
};
