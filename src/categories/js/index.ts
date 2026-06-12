import { jsCategory } from '#src/services/state.service.ts';
import { commitlint } from '#src/categories/js/commitlint/commitlint.entrypoint.ts';
import { eslint } from '#src/categories/js/eslint/eslint.entrypoint.ts';
import { husky } from '#src/categories/js/husky/husky.entrypoint.ts';
import { lintStaged } from '#src/categories/js/lint-staged/lint-staged.entrypoint.ts';
import { stylelint } from '#src/categories/js/stylelint/stylelint.entrypoint.ts';
import { prettier } from '#src/categories/js/prettier/prettier.entrypoint.ts';
import { standardVersion } from '#src/categories/js/standard-version/standard-version.entrypoint.ts';
import { jest } from '#src/categories/js/jest/jest.entrypoint.ts';
import { docker } from '#src/categories/js/docker/docker.entrypoint.ts';
import { releaseWorkflow } from '#src/categories/js/release-workflow/release-workflow.entrypoint.ts';
import { testWorkflow } from '#src/categories/js/test-workflow/test-workflow.entrypoint.ts';
import { buildWorkflow } from '#src/categories/js/build-workflow/build-workflow.entrypoint.ts';
import { codecovWorkflow } from '#src/categories/js/codecov-workflow/codecov-workflow.entrypoint.ts';
import { dependabot } from '#src/categories/js/dependabot/dependabot.entrypoint.ts';

// order matters
const options = {
  husky,
  commitlint,
  prettier,
  standardVersion,
  eslint,
  lintStaged,
  stylelint,
  jest,
  docker,
  releaseWorkflow,
  testWorkflow,
  buildWorkflow,
  codecovWorkflow,
  dependabot,
};

export default {
  options,
  state: jsCategory,
};
