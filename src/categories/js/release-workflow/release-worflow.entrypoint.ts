import { addGithubWorkflow } from 'src/utils/github';
import { getConfig } from './release-workflow.config';

const WORKFLOW_FILENAME = 'release.yml';

export const releaseWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
