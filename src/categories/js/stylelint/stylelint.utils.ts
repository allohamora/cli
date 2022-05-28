import { isPrettierInstalled } from '../prettier/prettier.utils';
import { Config } from './config/config.interface';

export const prettierMutation = async (config: Config) => {
  if (await isPrettierInstalled()) {
    config.devDependencies.push('stylelint-config-prettier', 'stylelint-prettier');
    config.stylelintConfig.extends.push('stylelint-prettier/recommended');
  }
};
