import path from 'node:path';
import { fileSystem } from '#__tests__/setup-test-context.ts';
import {
  addGithubDirIfNotExists,
  addGithubWorkflow,
  addWorkflowsDirIfNotExists,
  addToGithubDir,
} from '#src/utils/github.ts';

describe('github', () => {
  const GITHUB_DIR_NAME = '.github';
  const GITHUB_WORKFLOWS_DIR_NAME = 'workflows';
  const GITHUB_RELATIVE_WORKFLOWS_PATH = path.join(GITHUB_DIR_NAME, GITHUB_WORKFLOWS_DIR_NAME);

  describe('addGithubDirIfNotExists', () => {
    it('adds .github dir to root if it does not exist', async () => {
      await addGithubDirIfNotExists();

      expect(fileSystem.getDirs()).toContain(GITHUB_DIR_NAME);
    });
  });

  describe('addWorkflowsDirIfNotExists', () => {
    it('adds .github/workflows to root if it does not exist', async () => {
      await addWorkflowsDirIfNotExists();

      expect(fileSystem.getDirs()).toEqual([GITHUB_DIR_NAME, GITHUB_RELATIVE_WORKFLOWS_PATH]);
    });
  });

  describe('addGithubWorkflow', () => {
    const filename = 'test.yml';
    const content = '__test__';
    const filePath = path.join(GITHUB_RELATIVE_WORKFLOWS_PATH, filename);

    it('creates .github/workflows if it does not exist', async () => {
      await addGithubWorkflow(filename, content);

      expect(fileSystem.getDirs()).toEqual([GITHUB_DIR_NAME, GITHUB_RELATIVE_WORKFLOWS_PATH]);
    });

    it(`adds workflow to ${GITHUB_RELATIVE_WORKFLOWS_PATH}`, async () => {
      await addGithubWorkflow(filename, content);

      expect(fileSystem.readFile(filePath)).toBe(`${content}\n`);
    });
  });

  describe('addToGithubDir', () => {
    const filename = 'test.yml';
    const content = '__test__';
    const filePath = path.join(GITHUB_DIR_NAME, filename);

    it('creates .github if it does not exist', async () => {
      await addToGithubDir(filename, content);

      expect(fileSystem.getDirs()).toContain(GITHUB_DIR_NAME);
    });

    it(`adds file to ${GITHUB_DIR_NAME}`, async () => {
      await addToGithubDir(filename, content);

      expect(fileSystem.readFile(filePath)).toBe(`${content}\n`);
    });
  });
});
