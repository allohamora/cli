import { writeRootJsonFile } from '#src/services/root.service.ts';
import { installDevelopmentDependencies } from '#src/utils/npm.ts';
import { getConfig } from '#src/categories/js/commitlint/commitlint.config.ts';
import { CONFIG_FILE_NAME, PACKAGE_NAME } from '#src/categories/js/commitlint/commitlint.const.ts';
import { huskyIntegration } from '#src/categories/js/commitlint/commitlint.service.ts';

export const commitlint = async () => {
  const { config, rules } = getConfig();

  await installDevelopmentDependencies(PACKAGE_NAME, rules);
  await writeRootJsonFile(CONFIG_FILE_NAME, config);
  await huskyIntegration();
};
