import { addFileToRoot, addJsonFileToRoot } from 'src/utils/fs';
import { addScripts, installDevelopmentDependencies } from 'src/utils/npm';
import { getConfig } from './prettier.config';
import { PACKAGE_NAME, CONFIG_FILE_NAME, CONFIG_IGNORE_FILE_NAME } from './prettier.const';

export const prettier = async () => {
  const { config, ignore, scripts } = getConfig();

  await installDevelopmentDependencies(PACKAGE_NAME);
  await addJsonFileToRoot(CONFIG_FILE_NAME, config);
  await addFileToRoot(CONFIG_IGNORE_FILE_NAME, ignore.join('\n'));
  await addScripts(...scripts);
};
