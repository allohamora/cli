import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getConfig } from '#src/categories/js/release-workflow/release-workflow.config.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/release-workflow/release-workflow.const.ts';

export const releaseWorkflow = async () => {
  const { content } = getConfig();

  await writeGithubWorkflow(WORKFLOW_FILENAME, content);
};
