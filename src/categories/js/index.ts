import { commitlint } from './commitlint';
import { eslint } from './eslint';
import { husky } from './husky';
import { lintStaged } from './lint-staged';
import { prettier } from './prettier';
import { standardVersion } from './standard-verstion';

export default {
  husky,
  commitlint,
  prettier,
  standardVersion,
  eslint,
  lintStaged
};