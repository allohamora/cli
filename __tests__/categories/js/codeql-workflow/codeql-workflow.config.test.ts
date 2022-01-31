import { getConfig } from 'src/categories/js/codeql-workflow/codeql-workflow.config';
import { expectGithubWorkflow } from '__tests__/test-utils/github';
import { expectJsConfig } from '__tests__/test-utils/js-config';

expectJsConfig(getConfig, [(config) => expectGithubWorkflow(config.content)]);
