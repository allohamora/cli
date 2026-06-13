import {
  eslintMutation,
  jestMutation,
  prettierMutation,
  stylelintMutation,
} from '#src/categories/js/lint-staged/lint-staged.service.ts';
import type { Preset } from '#src/categories/js/lint-staged/preset/preset.type.ts';

export const nodeTsPreset: Preset = {
  config: {},
  mutations: [prettierMutation, stylelintMutation('*.css'), eslintMutation('*.ts'), jestMutation('*.ts')],
};
