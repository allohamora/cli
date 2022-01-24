import { jsCategoryState } from 'src/libs/categories';
import { commitlint } from './commitlint';
import { eslint } from './eslint';
import { husky } from './husky';
import { lintStaged } from './lint-staged';
import { prettier } from './prettier';
import { standardVersion } from './standard-verstion';
import { releaseWorkflow } from './release-worflow';
import { jest } from './jest';

// order have matter
const options = {
  husky,
  commitlint,
  prettier,
  standardVersion,
  eslint,
  lintStaged,
  releaseWorkflow,
  jest,
};

export default {
  options,
  state: jsCategoryState,
};
