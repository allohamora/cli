import { eslintMutator, jestMutator, prettierMutator } from '../lint-staged.utils';
import { Config } from './config.interface';

export const nodeTsConfig: Config = {
  config: {},
  mutators: [prettierMutator, eslintMutator('*.ts'), jestMutator('*.ts')],
};
