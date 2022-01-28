import { addJsonFileToRoot } from 'src/utils/fs';
import { addScripts, addToPackageJson, getPackageJson, installDevelopmentDependencies } from 'src/utils/npm';
import { CONFIG_FILE_NAME, getConfig, PACKAGE_NAME } from './standard-version.config';

export const standardVersion = async () => {
  const { createConfig, packageJsonConfig, scripts } = getConfig();

  await installDevelopmentDependencies(PACKAGE_NAME);

  const packageJson = await getPackageJson();
  const repositoryUrl = packageJson.homepage?.replace(/#.+$/, '') ?? '<repository url>';
  const config = createConfig(repositoryUrl);

  await addJsonFileToRoot(CONFIG_FILE_NAME, config);
  await addToPackageJson(PACKAGE_NAME, packageJsonConfig);
  await addScripts(...scripts);
};
