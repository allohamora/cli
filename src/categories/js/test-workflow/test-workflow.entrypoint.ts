import { addGithubWorkflow } from 'src/utils/github';
import { getConfig } from './test-workflow.config';
import { WORKFLOW_FILENAME } from './test-workflow.const';

export const testWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
