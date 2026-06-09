import { addGithubWorkflow } from '#src/utils/github.ts';
import { getConfig } from '#src/categories/js/codecov-workflow/codecov-workflow.config.ts';
import { WORKFLOW_FILENAME } from '#src/categories/js/codecov-workflow/codecov-workflow.const.ts';

export const codecovWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
