import { applyMutations } from '#src/utils/mutation.utils.ts';
import { installDevDependencies, setPackageJsonField } from '#src/services/npm.service.ts';
import { getConfig } from '#src/categories/js/lint-staged/lint-staged.config.ts';
import { PACKAGE_NAME } from '#src/categories/js/lint-staged/lint-staged.const.ts';
import { huskyIntegration } from '#src/categories/js/lint-staged/lint-staged.service.ts';

export const lintStaged = async () => {
  const { config, mutations } = getConfig();

  await applyMutations(config, mutations);

  await installDevDependencies(PACKAGE_NAME);
  await setPackageJsonField(PACKAGE_NAME, config);
  await huskyIntegration();
};
