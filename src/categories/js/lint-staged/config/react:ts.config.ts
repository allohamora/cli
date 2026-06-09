import {
  eslintMutation,
  jestMutation,
  prettierMutation,
  stylelintMutation,
} from '#src/categories/js/lint-staged/lint-staged.utils.ts';
import type { Config } from '#src/categories/js/lint-staged/config/config.interface.ts';

export const reactTsConfig: Config = {
  config: {},
  mutations: [
    prettierMutation,
    stylelintMutation('*.{css,ts,tsx}'),
    eslintMutation('*.{ts,tsx}'),
    jestMutation('*.{ts,tsx}'),
  ],
};
