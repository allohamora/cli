import { writeRootFile } from '#src/services/root.service.ts';
import { addNpmScripts, installDevDependencies } from '#src/services/npm.service.ts';
import { getConfig } from '#src/categories/js/stylelint/stylelint.config.ts';
import { CONFIG_NAME, IGNORE_NAME } from '#src/categories/js/stylelint/stylelint.const.ts';

export const stylelint = async () => {
  const config = getConfig();

  for (const mutation of config.mutations) {
    await mutation(config);
  }

  const { stylelintConfig, stylelintIgnore, scripts, devDependencies } = config;

  await installDevDependencies(...devDependencies);
  await addNpmScripts(...scripts);

  await writeRootFile(CONFIG_NAME, JSON.stringify(stylelintConfig, null, 2));
  await writeRootFile(IGNORE_NAME, stylelintIgnore);
};
