import { jsCategoryState } from 'src/states/categories';
import { commitlint } from './commitlint/commitlint.entrypoint';
import { eslint } from './eslint/eslint.entrypoint';
import { husky } from './husky/husky.entrypoint';
import { lintStaged } from './lint-staged/lint-staged.entrypoint';
import { prettier } from './prettier/prettier.entrypoint';
import { standardVersion } from './standard-version/standard-version.entrypoint';
import { releaseWorkflow } from './release-workflow/release-worflow.entrypoint';
import { jest } from './jest/jest.entrypoint';
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
