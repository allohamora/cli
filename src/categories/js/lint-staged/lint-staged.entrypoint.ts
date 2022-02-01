import { applyMutations } from 'src/utils/mutation';
import { addToPackageJson, installDevelopmentDependencies } from 'src/utils/npm';
import { getConfig } from './lint-staged.config';
import { PACKAGE_NAME } from './lint-staged.const';
import { huskyIntegration } from './lint-staged.utils';

export const lintStaged = async () => {
  const { config, mutations } = getConfig();

  await applyMutations(config, mutations);

  await installDevelopmentDependencies(PACKAGE_NAME);
  await addToPackageJson(PACKAGE_NAME, config);
  await huskyIntegration();
};
