import { addGithubWorkflow } from 'src/utils/github';
import { getConfig, WORKFLOW_FILENAME } from './release-workflow.config';

export const releaseWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
