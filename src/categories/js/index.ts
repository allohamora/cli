import { commitLint } from './commitlint';
import { eslint } from './eslint';
import { husky } from './husky';
import { lintStaged } from './lint-staged';
import { prettier } from './prettier';
import { standardVersion } from './standard-verstion';

export default {
  husky,
  commitLint,
  prettier,
  standardVersion,
  eslint,
  lintStaged
};