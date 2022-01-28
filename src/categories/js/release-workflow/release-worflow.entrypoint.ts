import { addGithubWorkflow } from 'src/utils/github';
import { getConfig } from './release-workflow.config';
import { WORKFLOW_FILENAME } from './release-workflow.const';

export const releaseWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
