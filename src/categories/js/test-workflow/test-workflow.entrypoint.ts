import { addGithubWorkflow } from '#src/utils/github.ts';
import { getConfig } from '#src/categories/js/test-workflow/test-workflow.config.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/test-workflow/test-workflow.const.ts';

export const testWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
