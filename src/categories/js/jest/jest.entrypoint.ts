import { addFileToRoot } from '#src/utils/fs.ts';
import { addScripts, installDevelopmentDependencies } from '#src/utils/npm.ts';
import { getConfig } from '#src/categories/js/jest/jest.config.ts';
import { CONFIG_FILE_NAME } from '#src/categories/js/jest/jest.const.ts';

// named jestEntrypoint because in test environment jest name is reserved
export const jestEntrypoint = async () => {
  const { devDependencies, configFileContent, scripts } = getConfig();

  await installDevelopmentDependencies(...devDependencies);
  await addFileToRoot(CONFIG_FILE_NAME, configFileContent);
  await addScripts(...scripts);
};
