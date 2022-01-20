import { jsCategoryState } from 'src/utils/categories';
import { commitlint } from './commitlint';
import { eslint } from './eslint';
import { husky } from './husky';
import { lintStaged } from './lint-staged';
import { prettier } from './prettier';
import { standardVersion } from './standard-verstion';
import { createReleaseAction } from './create-release-action';

// order have matter
const options = {
  husky,
  commitlint,
  prettier,
  standardVersion,
  eslint,
  lintStaged,
  createReleaseAction,
};

export default {
  options,
  state: jsCategoryState,
};
