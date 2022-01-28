import { addGithubWorkflow } from 'src/utils/github';
import { getConfig, WORKFLOW_FILENAME } from './test-workflow.config';

export const testWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
