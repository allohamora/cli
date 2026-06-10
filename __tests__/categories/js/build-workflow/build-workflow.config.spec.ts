import { getConfig } from '#src/categories/js/build-workflow/build-workflow.config.ts';
import { expectGithubWorkflow } from '#__tests__/test-utils/github.ts';
import { expectJsConfig } from '#__tests__/test-utils/js-config.ts';

describe('build-workflow.config', () => {
  expectJsConfig(getConfig, [(config) => expectGithubWorkflow(config.content)]);
});
