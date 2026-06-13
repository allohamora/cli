import prettier from 'prettier';
import { getPrettierPreset } from '#src/categories/js/prettier/preset/index.ts';
import { PRETTIER_CONFIG_FILE_NAME, PRETTIER_PACKAGE_NAME } from '#src/categories/js/prettier/prettier.const.ts';
import { createRootInstalledCheck } from '#src/services/installation.service.ts';

export const isPrettierInstalled = createRootInstalledCheck(PRETTIER_PACKAGE_NAME, PRETTIER_CONFIG_FILE_NAME);

export const formatJavascript = async (input: string) => {
  const { config } = getPrettierPreset();

  return await prettier.format(input, {
    parser: 'typescript',
    ...config,
  } as prettier.Options);
};
