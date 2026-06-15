import { getCodecovWorkflowPreset } from '#src/categories/js/codecov-workflow/preset/index.ts';
import { expectGithubWorkflow } from '#__tests__/utils/github.utils.ts';
import { nvmrcWorkflowMutation } from '#src/categories/js/nvmrc/nvmrc.service.ts';
import { describe, expect, it } from 'vitest';

describe('codecov-workflow/preset', () => {
  it('returns the codecov workflow config', () => {
    expect(getCodecovWorkflowPreset().content).toEqual({
      name: 'codecov',
      on: ['push'],
      jobs: {
        codecov: {
          'runs-on': 'ubuntu-latest',
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
            {
              name: 'Collect coverage',
              run: 'npm run test:coverage',
            },
            {
              name: 'Upload coverage to Codecov',
              uses: 'codecov/codecov-action@v7',
            },
          ],
        },
      },
    });
    expect(getCodecovWorkflowPreset().mutations).toEqual([nvmrcWorkflowMutation]);
  });

  expectGithubWorkflow(getCodecovWorkflowPreset().content);
});
