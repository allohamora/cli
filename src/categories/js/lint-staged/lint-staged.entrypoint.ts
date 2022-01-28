import { addToPackageJson, installDevelopmentDependencies } from 'src/utils/npm';
import { LintStagedConfig, Mutator } from './config/config.interface';
import { getConfig, PACKAGE_NAME } from './lint-staged.config';
import { huskyIntegration } from './lint-staged.utils';

const applyMutators = async (config: LintStagedConfig, mutators: Mutator[]) => {
  await Promise.all(mutators.map(async (mutator) => await mutator(config)));
};

export const lintStaged = async () => {
  const { config, mutators } = getConfig();

  await applyMutators(config, mutators);

  await installDevelopmentDependencies(PACKAGE_NAME);
  await addToPackageJson(PACKAGE_NAME, config);
  await huskyIntegration();
};
