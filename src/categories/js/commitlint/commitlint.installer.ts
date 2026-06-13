import { writeRootJsonFile } from '#src/services/root.service.ts';
import { installDevDependencies } from '#src/services/npm.service.ts';
import { getConfig } from '#src/categories/js/commitlint/config/index.ts';
import { CONFIG_FILE_NAME, PACKAGE_NAME } from '#src/categories/js/commitlint/commitlint.const.ts';
import { huskyIntegration } from '#src/categories/js/commitlint/commitlint.service.ts';

export const commitlint = async () => {
  const { config, rules } = getConfig();

  await installDevDependencies(PACKAGE_NAME, rules);
  await writeRootJsonFile(CONFIG_FILE_NAME, config);
  await huskyIntegration();
};
