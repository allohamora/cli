import prettier from 'prettier';
import { getConfig } from '#src/categories/js/prettier/config/index.ts';
import { CONFIG_FILE_NAME, PACKAGE_NAME } from '#src/categories/js/prettier/prettier.const.ts';
import { createRootInstalledCheck } from '#src/services/installation.service.ts';

export const isPrettierInstalled = createRootInstalledCheck(PACKAGE_NAME, CONFIG_FILE_NAME);

export const formatJavascript = async (input: string) => {
  const { config } = getConfig();

  return await prettier.format(input, {
    parser: 'typescript',
    ...config,
  } as prettier.Options);
};
