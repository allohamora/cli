import { createRootInstalledCheck } from '#src/services/installation.service.ts';
import { isPrettierInstalled } from '#src/categories/js/prettier/prettier.service.ts';
import type { Preset } from '#src/categories/js/stylelint/preset/preset.type.ts';
import { STYLELINT_PACKAGE_NAME, STYLELINT_CONFIG_NAME } from '#src/categories/js/stylelint/stylelint.const.ts';

export const isStylelintInstalled = createRootInstalledCheck(STYLELINT_PACKAGE_NAME, STYLELINT_CONFIG_NAME);

export const prettierMutation = async (preset: Preset) => {
  if (await isPrettierInstalled()) {
    preset.devDependencies.push('stylelint-prettier');
    preset.stylelintConfig.extends.push('stylelint-prettier/recommended');
  }
};
