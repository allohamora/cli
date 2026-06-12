import { writeRootFile } from '#src/services/root.service.ts';
import { addNpmScripts, installDevDependencies } from '#src/services/npm.service.ts';
import { getConfig } from '#src/categories/js/jest/jest.config.ts';
import { CONFIG_FILE_NAME } from '#src/categories/js/jest/jest.const.ts';

// named jestEntrypoint because in test environment jest name is reserved
export const jestEntrypoint = async () => {
  const { devDependencies, configFileContent, scripts } = getConfig();

  await installDevDependencies(...devDependencies);
  await writeRootFile(CONFIG_FILE_NAME, configFileContent);
  await addNpmScripts(...scripts);
};
