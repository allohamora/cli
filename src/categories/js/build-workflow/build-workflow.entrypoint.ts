import { writeGithubWorkflow } from '#src/services/github.service.ts';
import { getConfig } from '#src/categories/js/build-workflow/build-workflow.config.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/build-workflow/build-workflow.const.ts';

export const buildWorkflow = async () => {
  const { content } = getConfig();

  await writeGithubWorkflow(WORKFLOW_FILENAME, content);
};
