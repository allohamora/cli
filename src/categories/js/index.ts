import { jsCategoryState } from 'src/states/categories';
import { commitlint } from './commitlint/commitlint.entrypoint';
import { eslint } from './eslint/eslint.entrypoint';
import { husky } from './husky/husky.entrypoint';
import { lintStaged } from './lint-staged/lint-staged.entrypoint';
import { prettier } from './prettier/prettier.entrypoint';
import { standardVersion } from './standard-version/standard-version.entrypoint';
import { releaseWorkflow } from './release-workflow/release-worflow.entrypoint';
import { jestEntrypoint } from './jest/jest.entrypoint';
import { testWorkflow } from './test-workflow/test-workflow.entrypoint';
import { codeqlWorkflow } from './codeql-workflow/codeql-workflow.entrypoint';
import { buildWorkflow } from './build-workflow/build-workflow.entrypoint';

// order have matter
const options = {
  husky,
  commitlint,
  prettier,
  standardVersion,
  eslint,
  lintStaged,
  releaseWorkflow,
  // named jestEntrypoint because in test environment jest name is reserved
  jest: jestEntrypoint,
  testWorkflow,
  codeqlWorkflow,
  buildWorkflow,
};

export default {
  options,
  state: jsCategoryState,
};
