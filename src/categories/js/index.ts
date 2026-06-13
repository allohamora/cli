import { jsCategory } from '#src/services/state.service.ts';
import { commitlint } from '#src/categories/js/commitlint/commitlint.installer.ts';
import { eslint } from '#src/categories/js/eslint/eslint.installer.ts';
import { husky } from '#src/categories/js/husky/husky.installer.ts';
import { lintStaged } from '#src/categories/js/lint-staged/lint-staged.installer.ts';
import { stylelint } from '#src/categories/js/stylelint/stylelint.installer.ts';
import { prettier } from '#src/categories/js/prettier/prettier.installer.ts';
import { standardVersion } from '#src/categories/js/standard-version/standard-version.installer.ts';
import { jest } from '#src/categories/js/jest/jest.installer.ts';
import { docker } from '#src/categories/js/docker/docker.installer.ts';
import { releaseWorkflow } from '#src/categories/js/release-workflow/release-workflow.installer.ts';
import { testWorkflow } from '#src/categories/js/test-workflow/test-workflow.installer.ts';
import { buildWorkflow } from '#src/categories/js/build-workflow/build-workflow.installer.ts';
import { codecovWorkflow } from '#src/categories/js/codecov-workflow/codecov-workflow.installer.ts';
import { dependabot } from '#src/categories/js/dependabot/dependabot.installer.ts';

// order matters
const installers = {
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
  options: installers,
  state: jsCategory,
};
