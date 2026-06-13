import { writeRootFile } from '#src/services/root.service.ts';
import { addNpmScripts, installDevDependencies } from '#src/services/npm.service.ts';
import { getStylelintConfig } from '#src/categories/js/stylelint/config/index.ts';
import { STYLELINT_CONFIG_NAME, STYLELINT_IGNORE_NAME } from '#src/categories/js/stylelint/stylelint.const.ts';

export const stylelint = async () => {
  const config = getStylelintConfig();

  for (const mutation of config.mutations) {
    await mutation(config);
  }

  const { stylelintConfig, stylelintIgnore, scripts, devDependencies } = config;

  await installDevDependencies(...devDependencies);
  await addNpmScripts(...scripts);

  await writeRootFile(STYLELINT_CONFIG_NAME, JSON.stringify(stylelintConfig, null, 2));
  await writeRootFile(STYLELINT_IGNORE_NAME, stylelintIgnore);
};
