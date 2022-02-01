import { eslintMutation, jestMutation, prettierMutation } from '../lint-staged.utils';
import { Config } from './config.interface';

export const defaultConfig: Config = {
  config: {},
  mutations: [prettierMutation, eslintMutation('*.js'), jestMutation('*.js')],
};
