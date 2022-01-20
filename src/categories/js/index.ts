import { jsCategoryState } from 'src/utils/categories';
import { commitlint } from './commitlint';
import { eslint } from './eslint';
import { husky } from './husky';
import { lintStaged } from './lint-staged';
import { prettier } from './prettier';
import { standardVersion } from './standard-verstion';
import { releaseWorkflow } from './release-worflow';

// order have matter
const options = {
  husky,
  commitlint,
  prettier,
  standardVersion,
  eslint,
  lintStaged,
  releaseWorkflow,
};

export default {
  options,
  state: jsCategoryState,
};
