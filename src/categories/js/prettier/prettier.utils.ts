import { getInstalling } from 'src/states/context';
import { isExistsInRoot } from 'src/utils/fs';
import { CONFIG_FILE_NAME, PACKAGE_NAME } from './prettier.config';

export const isPrettierInstalled = async () => {
  const installing = getInstalling();

  if (installing.includes(PACKAGE_NAME)) {
    return true;
  }

  return await isExistsInRoot(CONFIG_FILE_NAME);
};
