import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getCodecovWorkflowConfig } from '#src/categories/js/codecov-workflow/config/index.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/codecov-workflow/codecov-workflow.const.ts';

export const codecovWorkflow = async () => {
  const { content } = getCodecovWorkflowConfig();

  await writeGithubWorkflow(WORKFLOW_FILENAME, content);
};
