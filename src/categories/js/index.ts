import { jsCategoryState } from 'src/states/categories';
import { commitlint } from './commitlint/commitlint.entrypoint';
import { eslint } from './eslint/eslint.entrypoint';
import { husky } from './husky/husky.entrypoint';
import { lintStaged } from './lint-staged';
import { prettier } from './prettier/prettier.entrypoint';
import { standardVersion } from './standard-verstion';
import { releaseWorkflow } from './release-worflow';
import { jest } from './jest';
import { testWorkflow } from './test-workflow';

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
  testWorkflow,
};

export default {
  options,
  state: jsCategoryState,
};
