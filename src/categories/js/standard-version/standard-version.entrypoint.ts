import { addJsonFileToRoot } from '#src/utils/fs.ts';
import { addScripts, getPackageJson, installDevelopmentDependencies } from '#src/utils/npm.ts';
import { getConfig } from '#src/categories/js/standard-version/standard-version.config.ts';
import { CONFIG_FILE_NAME, PACKAGE_NAME } from '#src/categories/js/standard-version/standard-version.const.ts';

export const standardVersion = async () => {
  const { createConfig, scripts } = getConfig();

  await installDevelopmentDependencies(PACKAGE_NAME);

  const packageJson = await getPackageJson();
  const repositoryUrl = packageJson.homepage?.replace(/#.+$/, '') ?? '<repository url>';
  const config = createConfig(repositoryUrl);

  await addJsonFileToRoot(CONFIG_FILE_NAME, config);
  await addScripts(...scripts);
};
