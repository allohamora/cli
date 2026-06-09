import { addFileToRoot, addJsonFileToRoot } from "#src/utils/fs.ts";
import { addScripts, installDevelopmentDependencies } from "#src/utils/npm.ts";
import { getConfig } from "#src/categories/js/prettier/prettier.config.ts";
import {
  PACKAGE_NAME,
  CONFIG_FILE_NAME,
  CONFIG_IGNORE_FILE_NAME,
} from "#src/categories/js/prettier/prettier.const.ts";

export const prettier = async () => {
  const { config, ignore, scripts } = getConfig();

  await installDevelopmentDependencies(PACKAGE_NAME);
  await addJsonFileToRoot(CONFIG_FILE_NAME, config);
  await addFileToRoot(CONFIG_IGNORE_FILE_NAME, ignore.join("\n"));
  await addScripts(...scripts);
};
