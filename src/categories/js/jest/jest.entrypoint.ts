import { addFileToRoot } from 'src/utils/fs';
import { addScripts, installDevelopmentDependencies } from 'src/utils/npm';
import { CONFIG_FILE_NAME, getConfig } from './jest.config';

export const jest = async () => {
  const { devDependencies, configFileContent, scripts } = getConfig();

  await installDevelopmentDependencies(...devDependencies);
  await addFileToRoot(CONFIG_FILE_NAME, configFileContent);
  await addScripts(...scripts);
};
