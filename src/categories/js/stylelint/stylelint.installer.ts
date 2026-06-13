import { writeRootFile } from '#src/services/root.service.ts';
import { addNpmScripts, installDevDependencies } from '#src/services/npm.service.ts';
import { getStylelintPreset } from '#src/categories/js/stylelint/preset/index.ts';
import { STYLELINT_CONFIG_NAME, STYLELINT_IGNORE_NAME } from '#src/categories/js/stylelint/stylelint.const.ts';

export const stylelint = async () => {
  const preset = getStylelintPreset();

  for (const mutation of preset.mutations) {
    await mutation(preset);
  }

  const { stylelintConfig, stylelintIgnore, scripts, devDependencies } = preset;

  await installDevDependencies(...devDependencies);
  await addNpmScripts(...scripts);

  await writeRootFile(STYLELINT_CONFIG_NAME, JSON.stringify(stylelintConfig, null, 2));
  await writeRootFile(STYLELINT_IGNORE_NAME, stylelintIgnore);
};
