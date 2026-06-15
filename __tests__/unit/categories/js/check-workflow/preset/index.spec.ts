import { getCheckWorkflowPreset } from '#src/categories/js/check-workflow/preset/index.ts';
import { expectGithubWorkflow } from '#__tests__/utils/github.utils.ts';
import { describe, expect, it } from 'vitest';

const expectedContent = {
  name: 'check',
  on: {
    push: {
      branches: ['**'],
    },
  },
  jobs: {
    check: {
      'runs-on': 'ubuntu-latest',
      env: {
        CI: true,
      },
      steps: [
        {
          name: 'Checkout code',
          uses: 'actions/checkout@v6',
        },
        {
          name: 'Install node',
          uses: 'actions/setup-node@v6',
          with: {
            cache: 'npm',
          },
        },
        {
          name: 'Install dependencies',
          run: 'npm ci',
        },
      ],
    },
  },
};

describe('check-workflow/preset', () => {
  it('returns the base check workflow config', () => {
    expect(getCheckWorkflowPreset().content).toEqual(expectedContent);
  });

  expectGithubWorkflow(getCheckWorkflowPreset().content);
});
