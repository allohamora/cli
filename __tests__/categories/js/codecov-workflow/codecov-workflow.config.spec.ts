import { getConfig } from '#src/categories/js/codecov-workflow/codecov-workflow.config.ts';
import { expectGithubWorkflow } from '#__tests__/test-utils/github.ts';
import { expectJsConfig } from '#__tests__/test-utils/js-config.ts';

expectJsConfig(getConfig, [(config) => expectGithubWorkflow(config.content)]);
