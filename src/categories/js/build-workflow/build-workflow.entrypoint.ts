import { addGithubWorkflow } from 'src/utils/github';
import { getConfig } from './build-workflow.config';
import { WORKFLOW_FILENAME } from './build-workflow.const';

export const buildWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
