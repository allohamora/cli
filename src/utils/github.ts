import path from 'path';
import { addDirToRootIfNotExists, addFileToRoot } from './fs';

const GITHUB_DIR_NAME = '.github';
const GITHUB_WORKFLOWS_DIR_NAME = 'workflows';

const GITHUB_RELATIVE_WORKFLOWS_PATH = path.join(GITHUB_DIR_NAME, GITHUB_WORKFLOWS_DIR_NAME);

export const addGithubDirIfNotExists = async () => {
  await addDirToRootIfNotExists(GITHUB_DIR_NAME);
};

export const addWorkflowsDirIfNotExists = async () => {
  await addGithubDirIfNotExists();
  await addDirToRootIfNotExists(GITHUB_RELATIVE_WORKFLOWS_PATH);
};

export const addGithubWorkflow = async (filename: string, content: string) => {
  await addWorkflowsDirIfNotExists();

  const relativeFilePath = path.join(GITHUB_RELATIVE_WORKFLOWS_PATH, filename);
  await addFileToRoot(relativeFilePath, content);
};

export const addToGithubDir = async (filename: string, content: string) => {
  await addGithubDirIfNotExists();

  const relativeFilePath = path.join(GITHUB_DIR_NAME, filename);
  await addFileToRoot(relativeFilePath, content);
};
