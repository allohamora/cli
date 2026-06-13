import { applyMutations } from '#src/utils/mutation.utils.ts';
import { installDevDependencies, setPackageJsonField } from '#src/services/npm.service.ts';
import { getLintStagedConfig } from '#src/categories/js/lint-staged/config/index.ts';
import { LINT_STAGED_PACKAGE_NAME } from '#src/categories/js/lint-staged/lint-staged.const.ts';
import { huskyIntegration } from '#src/categories/js/lint-staged/lint-staged.service.ts';

export const lintStaged = async () => {
  const { config, mutations } = getLintStagedConfig();

  await applyMutations(config, mutations);

  await installDevDependencies(LINT_STAGED_PACKAGE_NAME);
  await setPackageJsonField(LINT_STAGED_PACKAGE_NAME, config);
  await huskyIntegration();
};
