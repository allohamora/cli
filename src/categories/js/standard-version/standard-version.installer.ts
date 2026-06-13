import { writeRootJsonFile } from '#src/services/root.service.ts';
import { addNpmScripts, installDevDependencies, readPackageJson } from '#src/services/npm.service.ts';
import { getConfig } from '#src/categories/js/standard-version/config/index.ts';
import {
  STANDARD_VERSION_CONFIG_FILE_NAME,
  STANDARD_VERSION_PACKAGE_NAME,
} from '#src/categories/js/standard-version/standard-version.const.ts';

export const standardVersion = async () => {
  const { createConfig, scripts } = getConfig();

  await installDevDependencies(STANDARD_VERSION_PACKAGE_NAME);

  const packageJson = await readPackageJson();
  const repositoryUrl = packageJson.homepage?.replace(/#.+$/, '') ?? '<repository url>';
  const config = createConfig(repositoryUrl);

  await writeRootJsonFile(STANDARD_VERSION_CONFIG_FILE_NAME, config);
  await addNpmScripts(...scripts);
};
