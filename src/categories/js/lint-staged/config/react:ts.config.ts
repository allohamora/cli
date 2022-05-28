import { eslintMutation, jestMutation, prettierMutation, stylelintMutation } from '../lint-staged.utils';
import { Config } from './config.interface';

export const reactTsConfig: Config = {
  config: {},
  mutations: [
    prettierMutation,
    stylelintMutation('*.{ts,tsx}'),
    eslintMutation('*.{ts,tsx}'),
    jestMutation('*.{ts,tsx}'),
  ],
};
