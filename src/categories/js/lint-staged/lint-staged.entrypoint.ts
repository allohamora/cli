import { applyMutations } from '#src/utils/mutation.ts';
import { addToPackageJson, installDevelopmentDependencies } from '#src/utils/npm.ts';
import { getConfig } from '#src/categories/js/lint-staged/lint-staged.config.ts';
import { PACKAGE_NAME } from '#src/categories/js/lint-staged/lint-staged.const.ts';
import { huskyIntegration } from '#src/categories/js/lint-staged/lint-staged.service.ts';

export const lintStaged = async () => {
  const { config, mutations } = getConfig();

  await applyMutations(config, mutations);

  await installDevelopmentDependencies(PACKAGE_NAME);
  await addToPackageJson(PACKAGE_NAME, config);
  await huskyIntegration();
};
