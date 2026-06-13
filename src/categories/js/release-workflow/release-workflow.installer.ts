import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getReleaseWorkflowConfig } from '#src/categories/js/release-workflow/config/index.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/release-workflow/release-workflow.const.ts';

export const releaseWorkflow = async () => {
  const { content } = getReleaseWorkflowConfig();

  await writeGithubWorkflow(WORKFLOW_FILENAME, content);
};
