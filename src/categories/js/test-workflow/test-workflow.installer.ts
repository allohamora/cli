import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getTestWorkflowPreset } from '#src/categories/js/test-workflow/preset/index.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/test-workflow/test-workflow.const.ts';

export const testWorkflow = async () => {
  const { content } = getTestWorkflowPreset();

  await writeGithubWorkflow(WORKFLOW_FILENAME, content);
};
