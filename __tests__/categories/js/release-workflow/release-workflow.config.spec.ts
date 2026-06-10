import { getConfig } from '#src/categories/js/release-workflow/release-workflow.config.ts';
import { expectGithubWorkflow } from '#__tests__/test-utils/github.ts';
import { expectJsConfig } from '#__tests__/test-utils/js-config.ts';

describe('release-workflow.config', () => {
  expectJsConfig(getConfig, [(config) => expectGithubWorkflow(config.content, 'parses config.content')]);
});
