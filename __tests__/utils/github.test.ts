import path from 'node:path';
import { fileSystem } from '#__tests__/setup-test-context.ts';
import {
  addGithubDirIfNotExists,
  addGithubWorkflow,
  addWorkflowsDirIfNotExists,
  addToGithubDir,
} from '#src/utils/github.ts';

const GITHUB_DIR_NAME = '.github';
const GITHUB_WORKFLOWS_DIR_NAME = 'workflows';
const GITHUB_RELATIVE_WORKFLOWS_PATH = path.join(GITHUB_DIR_NAME, GITHUB_WORKFLOWS_DIR_NAME);

describe('addGithubDirIfNotExists', () => {
  test('should add .github dir to root if not exists', async () => {
    await addGithubDirIfNotExists();

    expect(fileSystem.getDirs()).toContain(GITHUB_DIR_NAME);
  });
});

describe('addWorkflowsDirIfNotExists', () => {
  test('should add .github/workflows to root if not exists', async () => {
    await addWorkflowsDirIfNotExists();

    expect(fileSystem.getDirs()).toEqual([GITHUB_DIR_NAME, GITHUB_RELATIVE_WORKFLOWS_PATH]);
  });
});

describe('addGithubWorkflow', () => {
  const filename = 'test.yml';
  const content = '__test__';
  const filePath = path.join(GITHUB_RELATIVE_WORKFLOWS_PATH, filename);

  test('should create .github/workflows if not exists', async () => {
    await addGithubWorkflow(filename, content);

    expect(fileSystem.getDirs()).toEqual([GITHUB_DIR_NAME, GITHUB_RELATIVE_WORKFLOWS_PATH]);
  });

  test(`should add workflow to ${GITHUB_RELATIVE_WORKFLOWS_PATH}`, async () => {
    await addGithubWorkflow(filename, content);

    expect(fileSystem.readFile(filePath)).toBe(`${content}\n`);
  });
});

describe('addToGithubDir', () => {
  const filename = 'test.yml';
  const content = '__test__';
  const filePath = path.join(GITHUB_DIR_NAME, filename);

  test('should create .github if not exists', async () => {
    await addToGithubDir(filename, content);

    expect(fileSystem.getDirs()).toContain(GITHUB_DIR_NAME);
  });

  test(`should add file to ${GITHUB_DIR_NAME}`, async () => {
    await addToGithubDir(filename, content);

    expect(fileSystem.readFile(filePath)).toBe(`${content}\n`);
  });
});
