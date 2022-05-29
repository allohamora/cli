import { addGithubWorkflow } from 'src/utils/github';
import { getConfig } from './codecov-workflow.config';
import { WORKFLOW_FILENAME } from './codecov-workflow.const';

export const codecovWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
