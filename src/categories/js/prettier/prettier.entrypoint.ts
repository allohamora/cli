import { getConfig } from "#src/categories/js/prettier/prettier.config.ts";
import {
  CONFIG_FILE_NAME,
  CONFIG_IGNORE_FILE_NAME,
  PACKAGE_NAME,
} from "#src/categories/js/prettier/prettier.const.ts";
import {
  writeRootFile,
  writeRootJsonFile,
} from "#src/services/root.service.ts";
import { addScripts, installDevelopmentDependencies } from "#src/utils/npm.ts";

export const prettier = async () => {
  const { config, ignore, scripts } = getConfig();

  await installDevelopmentDependencies(PACKAGE_NAME);
  await writeRootJsonFile(CONFIG_FILE_NAME, config);
  await writeRootFile(CONFIG_IGNORE_FILE_NAME, ignore.join("\n"));
  await addScripts(...scripts);
};
