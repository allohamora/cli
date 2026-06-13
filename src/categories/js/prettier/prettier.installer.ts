import { getConfig } from '#src/categories/js/prettier/config/index.ts';
import {
  PRETTIER_CONFIG_FILE_NAME,
  PRETTIER_CONFIG_IGNORE_FILE_NAME,
  PRETTIER_PACKAGE_NAME,
} from '#src/categories/js/prettier/prettier.const.ts';
import { writeRootFile, writeRootJsonFile } from '#src/services/root.service.ts';
import { addNpmScripts, installDevDependencies } from '#src/services/npm.service.ts';

export const prettier = async () => {
  const { config, ignore, scripts } = getConfig();

  await installDevDependencies(PRETTIER_PACKAGE_NAME);
  await writeRootJsonFile(PRETTIER_CONFIG_FILE_NAME, config);
  await writeRootFile(PRETTIER_CONFIG_IGNORE_FILE_NAME, ignore.join('\n'));
  await addNpmScripts(...scripts);
};
