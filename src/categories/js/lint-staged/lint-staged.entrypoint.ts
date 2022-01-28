import { addToPackageJson, installDevelopmentDependencies } from 'src/utils/npm';
import { LintStagedConfig, Mutator } from './config/config.interface';
import { getConfig } from './lint-staged.config';
import { huskyIntegrationHandler } from './lint-staged.utils';

const applyMutators = async (config: LintStagedConfig, mutators: Mutator[]) => {
  await Promise.all(mutators.map(async (mutator) => await mutator(config)));
};

export const lintStaged = async () => {
  const { config, mutators } = getConfig();

  await applyMutators(config, mutators);

  await installDevelopmentDependencies('lint-staged');
  await addToPackageJson('lint-staged', config);
  await huskyIntegrationHandler();
};
