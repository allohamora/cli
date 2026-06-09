import { addGithubWorkflow } from '#src/utils/github.ts';
import { getConfig } from '#src/categories/js/release-workflow/release-workflow.config.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/release-workflow/release-workflow.const.ts';

export const releaseWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
