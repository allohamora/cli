import { isInstalledAndInRootCheck } from 'src/utils/installed';
import { isPrettierInstalled } from '../prettier/prettier.utils';
import { Config } from './config/config.interface';
import { PACKAGE_NAME, CONFIG_NAME } from './stylelint.const';

export const isStylelintInstalled = isInstalledAndInRootCheck(PACKAGE_NAME, CONFIG_NAME);

export const prettierMutation = async (config: Config) => {
  if (await isPrettierInstalled()) {
    config.devDependencies.push('stylelint-config-prettier', 'stylelint-prettier');
    config.stylelintConfig.extends.push('stylelint-prettier/recommended');
  }
};
