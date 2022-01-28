import { getConfig as eslintGetConfig } from './eslint.config';
import { addJsonFileToRoot } from 'src/utils/fs';
import { addScripts, installDevelopmentDependencies } from 'src/utils/npm';
import { prettierIntegrationHandler } from './eslint.utils';
import { CONFIG_FILE_NAME, PACKAGE_NAME } from './eslint.const';

export const getConfig = async () => {
  const config = eslintGetConfig();

  await prettierIntegrationHandler(config);

  return config;
};

export const eslint = async () => {
  const { dependencies, eslintConfig, scripts } = await getConfig();

  await installDevelopmentDependencies(PACKAGE_NAME, ...dependencies);
  await addJsonFileToRoot(CONFIG_FILE_NAME, eslintConfig);
  await addScripts(...scripts);
};
