import { addJsonFileToRoot } from 'src/utils/fs';
import { addScripts, addToPackageJson, getPackageJson, installDevelopmentDependencies } from 'src/utils/npm';
import { getConfig } from './standard-version.config';

export const standardVersion = async () => {
  const { createConfig, packageJsonConfig, scripts } = getConfig();

  await installDevelopmentDependencies('standard-version');

  const packageJson = await getPackageJson();
  const repositoryUrl = packageJson.homepage?.replace(/#.+$/, '') ?? '<repository url>';
  const config = createConfig(repositoryUrl);

  await addJsonFileToRoot('.versionrc.json', config);
  await addToPackageJson('standard-version', packageJsonConfig);
  await addScripts(...scripts);
};
