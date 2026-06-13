import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getReleaseWorkflowPreset } from '#src/categories/js/release-workflow/preset/index.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/release-workflow/release-workflow.const.ts';

export const releaseWorkflow = async () => {
  const { content } = getReleaseWorkflowPreset();

  await writeGithubWorkflow(WORKFLOW_FILENAME, content);
};
