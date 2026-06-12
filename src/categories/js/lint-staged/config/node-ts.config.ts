import {
  eslintMutation,
  jestMutation,
  prettierMutation,
  stylelintMutation,
} from '#src/categories/js/lint-staged/lint-staged.service.ts';
import type { Config } from '#src/categories/js/lint-staged/config/config.interface.ts';

export const nodeTsConfig: Config = {
  config: {},
  mutations: [prettierMutation, stylelintMutation('*.css'), eslintMutation('*.ts'), jestMutation('*.ts')],
};
