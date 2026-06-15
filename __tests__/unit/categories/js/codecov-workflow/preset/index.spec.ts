import { getCodecovWorkflowPreset } from '#src/categories/js/codecov-workflow/preset/index.ts';
import { expectGithubWorkflow } from '#__tests__/utils/github.utils.ts';
import { describe, expect, it } from 'vitest';

describe('codecov-workflow/preset', () => {
  it('returns the codecov workflow config', () => {
    expect(getCodecovWorkflowPreset().content).toEqual({
      name: 'codecov',
      on: ['push'],
      jobs: {
        codecov: {
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
              name: 'Collect coverage',
              run: 'npm run test:coverage',
            },
            {
              name: 'Upload coverage to Codecov',
              uses: 'codecov/codecov-action@v4',
            },
          ],
        },
      },
    });
  });

  expectGithubWorkflow(getCodecovWorkflowPreset().content);
});
