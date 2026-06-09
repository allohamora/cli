import { addGithubWorkflow } from '#src/utils/github.ts';
import { getConfig } from '#src/categories/js/build-workflow/build-workflow.config.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/build-workflow/build-workflow.const.ts';

export const buildWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
