import * as eslintConfig from './eslint.config';
import { Context } from 'src/types/context';
import { addJsonFileToRoot } from 'src/utils/fs';
import { addScripts, installDevelopmentDependencies } from 'src/utils/npm';
import { CONFIG_FILE_NAME, PACKAGE_NAME, prettierIntegrationHandler } from './eslint.utils';

export const getConfig = async (ctx: Context) => {
  const config = eslintConfig.getConfig();

  await prettierIntegrationHandler(ctx, config);

  return config;
};

export const eslint = async (ctx: Context) => {
  const { dependencies, eslintConfig, scripts } = await getConfig(ctx);

  await installDevelopmentDependencies(PACKAGE_NAME, ...dependencies);
  await addJsonFileToRoot(CONFIG_FILE_NAME, eslintConfig);
  await addScripts(...scripts);
};
