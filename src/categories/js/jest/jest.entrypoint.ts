import { addFileToRoot } from 'src/utils/fs';
import { addScripts, installDevelopmentDependencies } from 'src/utils/npm';
import { getConfig } from './jest.config';

const CONFIG_FILENAME = 'jest.config.cjs';

export const jest = async () => {
  const { devDependencies, configFileContent, scripts } = getConfig();

  await installDevelopmentDependencies(...devDependencies);
  await addFileToRoot(CONFIG_FILENAME, configFileContent);
  await addScripts(...scripts);
};
