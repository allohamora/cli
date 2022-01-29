import { addFileToRoot } from 'src/utils/fs';
import { addScripts, installDevelopmentDependencies } from 'src/utils/npm';
import { getConfig } from './jest.config';
import { CONFIG_FILE_NAME } from './jest.const';

export const jestEntrypoint = async () => {
  const { devDependencies, configFileContent, scripts } = getConfig();

  await installDevelopmentDependencies(...devDependencies);
  await addFileToRoot(CONFIG_FILE_NAME, configFileContent);
  await addScripts(...scripts);
};
