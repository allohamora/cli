import { getTestWorkflowPreset } from '#src/categories/js/test-workflow/preset/index.ts';
import { expectGithubWorkflow } from '#__tests__/utils/github.utils.ts';
import { describe, expect, it } from 'vitest';

describe('test-workflow/preset', () => {
  it('returns the test workflow config', () => {
    expect(getTestWorkflowPreset().content).toEqual({
      name: 'test',
      on: {
        push: {
          branches: ['**'],
        },
      },
      jobs: {
        test: {
          'runs-on': 'ubuntu-latest',
          env: {
            CI: true,
          },
          steps: [
            {
              name: 'Checkout code',
              uses: 'actions/checkout@v4',
            },
            {
              name: 'Install node',
              uses: 'actions/setup-node@v4',
              with: {
                cache: 'npm',
              },
            },
            {
              name: 'Install dependencies',
              run: 'npm ci',
            },
            {
              name: 'Run tests',
              run: 'npm run test',
            },
          ],
        },
      },
    });
  });

  expectGithubWorkflow(getTestWorkflowPreset().content);
});
