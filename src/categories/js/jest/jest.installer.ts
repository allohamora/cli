import { writeRootFile } from '#src/services/root.service.ts';
import { addNpmScripts, installDevDependencies } from '#src/services/npm.service.ts';
import { getConfig } from '#src/categories/js/jest/config/index.ts';
import { JEST_CONFIG_FILE_NAME } from '#src/categories/js/jest/jest.const.ts';

export const jest = async () => {
  const { devDependencies, configFileContent, scripts } = getConfig();

  await installDevDependencies(...devDependencies);
  await writeRootFile(JEST_CONFIG_FILE_NAME, configFileContent);
  await addNpmScripts(...scripts);
};
