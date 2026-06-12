import { writeRootFile } from '#src/services/root.service.ts';
import { stringify } from '#src/utils/json.ts';
import { addScripts, installDevelopmentDependencies } from '#src/utils/npm.ts';
import { getConfig } from '#src/categories/js/stylelint/stylelint.config.ts';
import { CONFIG_NAME, IGNORE_NAME } from '#src/categories/js/stylelint/stylelint.const.ts';

export const stylelint = async () => {
  const config = getConfig();

  for (const mutation of config.mutations) {
    await mutation(config);
  }

  const { stylelintConfig, stylelintIgnore, scripts, devDependencies } = config;

  await installDevelopmentDependencies(...devDependencies);
  await addScripts(...scripts);

  await writeRootFile(CONFIG_NAME, stringify(stylelintConfig));
  await writeRootFile(IGNORE_NAME, stylelintIgnore);
};
