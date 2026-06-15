import path from 'node:path';
import { ensureRootDir, writeRootFile } from '#src/services/root.service.ts';
import { stringify } from 'yaml';

export const GITHUB_DIR_NAME = '.github';
export const GITHUB_WORKFLOWS_DIR_NAME = 'workflows';
export const GITHUB_WORKFLOWS_PATH = path.join(GITHUB_DIR_NAME, GITHUB_WORKFLOWS_DIR_NAME);

export const ensureGithubDir = async () => {
  await ensureRootDir(GITHUB_DIR_NAME);
};

export const ensureGithubWorkflowsDir = async () => {
  await ensureGithubDir();
  await ensureRootDir(GITHUB_WORKFLOWS_PATH);
};

export const writeGithubWorkflow = async (filename: string, content: Record<string, unknown>) => {
  await ensureGithubWorkflowsDir();

  const relativeFilePath = path.join(GITHUB_WORKFLOWS_PATH, filename);
  await writeRootFile(relativeFilePath, stringify(content));
};

export const writeGithubFile = async (filename: string, content: string) => {
  await ensureGithubDir();

  const relativeFilePath = path.join(GITHUB_DIR_NAME, filename);
  await writeRootFile(relativeFilePath, content);
};
