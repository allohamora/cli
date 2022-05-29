import { jsCategoryState } from 'src/states/categories';
import { commitlint } from './commitlint/commitlint.entrypoint';
import { eslint } from './eslint/eslint.entrypoint';
import { husky } from './husky/husky.entrypoint';
import { lintStaged } from './lint-staged/lint-staged.entrypoint';
import { stylelint } from './stylelint/stylelint.entrypoint';
import { prettier } from './prettier/prettier.entrypoint';
import { standardVersion } from './standard-version/standard-version.entrypoint';
import { jestEntrypoint } from './jest/jest.entrypoint';
import { docker } from './docker/docker.entrypoint';
import { releaseWorkflow } from './release-workflow/release-workflow.entrypoint';
import { testWorkflow } from './test-workflow/test-workflow.entrypoint';
import { codeqlWorkflow } from './codeql-workflow/codeql-workflow.entrypoint';
import { buildWorkflow } from './build-workflow/build-workflow.entrypoint';
import { codecovWorkflow } from './codecov-workflow/codecov-workflow.entrypoint';
import { dependabot } from './dependabot/dependabot.entrypoint';

// order have matter
const options = {
  husky,
  commitlint,
  prettier,
  standardVersion,
  eslint,
  lintStaged,
  stylelint,
  // named jestEntrypoint because in test environment jest name is reserved
  jest: jestEntrypoint,
  docker,
  releaseWorkflow,
  testWorkflow,
  codeqlWorkflow,
  buildWorkflow,
  codecovWorkflow,
  dependabot,
};

export default {
  options,
  state: jsCategoryState,
};
