import { addGithubWorkflow } from 'src/utils/github';
import { getConfig } from './test-workflow.config';

const WORKFLOW_FILENAME = 'test.yml';

export const testWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
