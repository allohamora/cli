import { isInstalledAndInRootCheck } from '#src/utils/installed.ts';
import { isPrettierInstalled } from '#src/categories/js/prettier/prettier.utils.ts';
import type { Config } from '#src/categories/js/stylelint/config/config.interface.ts';
import { PACKAGE_NAME, CONFIG_NAME } from '#src/categories/js/stylelint/stylelint.const.ts';

export const isStylelintInstalled = isInstalledAndInRootCheck(PACKAGE_NAME, CONFIG_NAME);

export const prettierMutation = async (config: Config) => {
  if (await isPrettierInstalled()) {
    config.devDependencies.push('stylelint-prettier');
    config.stylelintConfig.extends.push('stylelint-prettier/recommended');
  }
};
