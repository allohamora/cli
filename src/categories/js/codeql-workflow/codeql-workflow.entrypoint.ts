import { addGithubWorkflow } from 'src/utils/github';
import { getConfig } from './codeql-workflow.config';
import { WORKFLOW_FILENAME } from './codeql-workflow.const';

export const codeQlWorkflow = async () => {
  const { content } = getConfig();

  await addGithubWorkflow(WORKFLOW_FILENAME, content);
};
