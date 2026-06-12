import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getConfig } from '#src/categories/js/test-workflow/test-workflow.config.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/test-workflow/test-workflow.const.ts';

export const testWorkflow = async () => {
  const { content } = getConfig();

  await writeGithubWorkflow(WORKFLOW_FILENAME, content);
};
