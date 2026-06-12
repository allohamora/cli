import path from 'node:path';
import { ensureRootDir, writeRootFile } from '#src/services/root.service.ts';

const GITHUB_DIR_NAME = '.github';
const GITHUB_WORKFLOWS_DIR_NAME = 'workflows';

const GITHUB_RELATIVE_WORKFLOWS_PATH = path.join(GITHUB_DIR_NAME, GITHUB_WORKFLOWS_DIR_NAME);

export const addGithubDirIfNotExists = async () => {
  await ensureRootDir(GITHUB_DIR_NAME);
};

export const addWorkflowsDirIfNotExists = async () => {
  await addGithubDirIfNotExists();
  await ensureRootDir(GITHUB_RELATIVE_WORKFLOWS_PATH);
};

export const addGithubWorkflow = async (filename: string, content: string) => {
  await addWorkflowsDirIfNotExists();

  const relativeFilePath = path.join(GITHUB_RELATIVE_WORKFLOWS_PATH, filename);
  await writeRootFile(relativeFilePath, content);
};

export const addToGithubDir = async (filename: string, content: string) => {
  await addGithubDirIfNotExists();

  const relativeFilePath = path.join(GITHUB_DIR_NAME, filename);
  await writeRootFile(relativeFilePath, content);
};
