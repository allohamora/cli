import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getCodecovWorkflowPreset } from '#src/categories/js/codecov-workflow/preset/index.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/codecov-workflow/codecov-workflow.const.ts';

export const codecovWorkflow = async () => {
  const { content } = getCodecovWorkflowPreset();

  await writeGithubWorkflow(WORKFLOW_FILENAME, content);
};
