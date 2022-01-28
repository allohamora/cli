import { prettierMutator } from '../lint-staged.utils';
import { Config } from './config.interface';

export const defaultConfig: Config = {
  config: {},
  mutators: [prettierMutator],
};
