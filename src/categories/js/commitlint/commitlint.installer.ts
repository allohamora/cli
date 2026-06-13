import { writeRootJsonFile } from '#src/services/root.service.ts';
import { installDevDependencies } from '#src/services/npm.service.ts';
import { getCommitlintConfig } from '#src/categories/js/commitlint/config/index.ts';
import {
  COMMITLINT_CONFIG_FILE_NAME,
  COMMITLINT_PACKAGE_NAME,
} from '#src/categories/js/commitlint/commitlint.const.ts';
import { huskyIntegration } from '#src/categories/js/commitlint/commitlint.service.ts';

export const commitlint = async () => {
  const { config, rules } = getCommitlintConfig();

  await installDevDependencies(COMMITLINT_PACKAGE_NAME, rules);
  await writeRootJsonFile(COMMITLINT_CONFIG_FILE_NAME, config);
  await huskyIntegration();
};
