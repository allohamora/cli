import { Context } from 'src/types/context';
import { isExistsInRoot } from 'src/utils/fs';

export const PACKAGE_NAME = 'prettier';
export const CONFIG_FILE_NAME = '.prettierrc';
export const CONFIG_IGNORE_FILE_NAME = '.prettierignore';

export const isPrettierInstalled = async ({ installing }: Context) => {
  if (installing.includes(PACKAGE_NAME)) {
    return true;
  }

  return await isExistsInRoot(CONFIG_FILE_NAME);
};
