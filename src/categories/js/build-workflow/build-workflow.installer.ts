import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getBuildWorkflowPreset } from '#src/categories/js/build-workflow/preset/index.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/build-workflow/build-workflow.const.ts';

export const buildWorkflow = async () => {
  const { content } = getBuildWorkflowPreset();

  await writeGithubWorkflow(WORKFLOW_FILENAME, content);
};
