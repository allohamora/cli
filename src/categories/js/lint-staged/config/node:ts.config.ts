import { eslintMutation, jestMutation, prettierMutation, stylelintMutation } from '../lint-staged.utils';
import { Config } from './config.interface';

export const nodeTsConfig: Config = {
  config: {},
  mutations: [prettierMutation, stylelintMutation('*.css'), eslintMutation('*.ts'), jestMutation('*.ts')],
};
