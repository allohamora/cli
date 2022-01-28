import { getConfig } from './eslint.config';
import { addJsonFileToRoot } from 'src/utils/fs';
import { addScripts, installDevelopmentDependencies } from 'src/utils/npm';
import { CONFIG_FILE_NAME, PACKAGE_NAME } from './eslint.const';
import { applyMutators } from 'src/utils/mutator';

export const eslint = async () => {
  const config = getConfig();
  await applyMutators(config, config.mutators);

  const { dependencies, eslintConfig, scripts } = config;

  await installDevelopmentDependencies(PACKAGE_NAME, ...dependencies);
  await addJsonFileToRoot(CONFIG_FILE_NAME, eslintConfig);
  await addScripts(...scripts);
};
