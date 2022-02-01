import { eslintMutation, jestMutation, prettierMutation } from '../lint-staged.utils';
import { Config } from './config.interface';

export const nodeTsConfig: Config = {
  config: {},
  mutations: [prettierMutation, eslintMutation('*.ts'), jestMutation('*.ts')],
};
