import path from 'node:path';
import { fileSystem } from '#__tests__/setup-test-context.ts';
import { describe, expect, it } from 'vitest';
import {
  ensureGithubDir,
  ensureGithubWorkflowsDir,
  GITHUB_DIR_NAME,
  GITHUB_WORKFLOWS_DIR_NAME,
  GITHUB_WORKFLOWS_PATH,
  writeGithubFile,
  writeGithubWorkflow,
} from '#src/services/github.service.ts';

describe('github.service', () => {
  describe('constants', () => {
    it('exposes the github directory names and workflows path', () => {
      expect(GITHUB_DIR_NAME).toBe('.github');
      expect(GITHUB_WORKFLOWS_DIR_NAME).toBe('workflows');
      expect(GITHUB_WORKFLOWS_PATH).toBe(path.join(GITHUB_DIR_NAME, GITHUB_WORKFLOWS_DIR_NAME));
    });
  });

  describe('ensureGithubDir', () => {
    it('adds the .github directory to the root if it does not exist', async () => {
      await ensureGithubDir();

      expect(fileSystem.getDirs()).toContain(GITHUB_DIR_NAME);
    });
  });

  describe('ensureGithubWorkflowsDir', () => {
    it('adds .github/workflows to the root if it does not exist', async () => {
      await ensureGithubWorkflowsDir();

      expect(fileSystem.getDirs()).toEqual([GITHUB_DIR_NAME, GITHUB_WORKFLOWS_PATH]);
    });
  });

  describe('writeGithubWorkflow', () => {
    const filename = 'test.yml';
    const content = {
      name: '__test__',
      on: {
        push: {
          branches: ['**'],
        },
      },
    };
    const filePath = path.join(GITHUB_WORKFLOWS_PATH, filename);

    it('creates .github/workflows if it does not exist', async () => {
      await writeGithubWorkflow(filename, content);

      expect(fileSystem.getDirs()).toEqual([GITHUB_DIR_NAME, GITHUB_WORKFLOWS_PATH]);
    });

    it(`adds workflow to ${GITHUB_WORKFLOWS_PATH}`, async () => {
      await writeGithubWorkflow(filename, content);

      expect(fileSystem.readFile(filePath)).toBe(
        ['name: __test__', '', 'on:', '  push:', '    branches:', '      - "**"', ''].join('\n'),
      );
    });

    it('keeps configured workflow events as a map', async () => {
      await writeGithubWorkflow(filename, {
        name: '__test__',
        on: {
          push: {
            branches: ['main'],
          },
        },
      });

      expect(fileSystem.readFile(filePath)).toBe(
        ['name: __test__', '', 'on:', '  push:', '    branches:', '      - main', ''].join('\n'),
      );
    });

    it('keeps workflow event sequences unchanged', async () => {
      await writeGithubWorkflow(filename, {
        name: '__test__',
        on: ['push'],
      });

      expect(fileSystem.readFile(filePath)).toBe(['name: __test__', '', 'on:', '  - push', ''].join('\n'));
    });

    it('stringifies non-map content without workflow formatting', async () => {
      await writeGithubWorkflow(filename, ['push'] as unknown as Record<string, unknown>);

      expect(fileSystem.readFile(filePath)).toBe(['- push', ''].join('\n'));
    });

    it('only adds empty lines between top-level entries', async () => {
      await writeGithubWorkflow(filename, {
        name: '__test__',
        permissions: {
          contents: 'read',
          packages: 'write',
        },
        jobs: {},
      });

      expect(fileSystem.readFile(filePath)).toBe(
        ['name: __test__', '', 'permissions:', '  contents: read', '  packages: write', '', 'jobs: {}', ''].join('\n'),
      );
    });

    it('adds empty lines between workflow steps', async () => {
      await writeGithubWorkflow(filename, {
        name: '__test__',
        jobs: {
          test: {
            'runs-on': 'ubuntu-latest',
            steps: [
              {
                name: 'Checkout code',
                uses: 'actions/checkout@v7',
              },
              {
                name: 'Install dependencies',
                run: 'npm ci',
              },
              {
                name: 'Build',
                run: 'npm run build',
              },
            ],
          },
        },
      });

      expect(fileSystem.readFile(filePath)).toBe(
        [
          'name: __test__',
          '',
          'jobs:',
          '  test:',
          '    runs-on: ubuntu-latest',
          '    steps:',
          '      - name: Checkout code',
          '        uses: actions/checkout@v7',
          '',
          '      - name: Install dependencies',
          '        run: npm ci',
          '',
          '      - name: Build',
          '        run: npm run build',
          '',
        ].join('\n'),
      );
    });
  });

  describe('writeGithubFile', () => {
    const filename = 'test.yml';
    const content = '__test__';
    const filePath = path.join(GITHUB_DIR_NAME, filename);

    it('creates .github if it does not exist', async () => {
      await writeGithubFile(filename, content);

      expect(fileSystem.getDirs()).toContain(GITHUB_DIR_NAME);
    });

    it(`adds file to ${GITHUB_DIR_NAME}`, async () => {
      await writeGithubFile(filename, content);

      expect(fileSystem.readFile(filePath)).toBe(`${content}\n`);
    });
  });
});
