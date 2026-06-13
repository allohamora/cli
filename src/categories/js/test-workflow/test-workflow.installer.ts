import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getTestWorkflowConfig } from '#src/categories/js/test-workflow/config/index.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/test-workflow/test-workflow.const.ts';

export const testWorkflow = async () => {
  const { content } = getTestWorkflowConfig();

  await writeGithubWorkflow(WORKFLOW_FILENAME, content);
};
