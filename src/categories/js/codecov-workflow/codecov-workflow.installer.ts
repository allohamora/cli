import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getConfig } from '#src/categories/js/codecov-workflow/config/index.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/codecov-workflow/codecov-workflow.const.ts';

export const codecovWorkflow = async () => {
  const { content } = getConfig();

  await writeGithubWorkflow(WORKFLOW_FILENAME, content);
};
