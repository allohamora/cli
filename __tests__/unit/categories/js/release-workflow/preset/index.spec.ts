import { getReleaseWorkflowPreset } from '#src/categories/js/release-workflow/preset/index.ts';
import { expectGithubWorkflow } from '#__tests__/utils/github.utils.ts';
import { describe, expect, it } from 'vitest';

describe('release-workflow/preset', () => {
  it('returns the release workflow config', () => {
    expect(getReleaseWorkflowPreset().content).toEqual({
      name: 'release',
      on: {
        push: {
          tags: ['*.*.*'],
        },
      },
      permissions: {
        contents: 'write',
      },
      jobs: {
        release: {
          'runs-on': 'ubuntu-latest',
          steps: [
            {
              name: 'Checkout code',
              uses: 'actions/checkout@v6',
            },
            {
              name: 'Get release notes from CHANGELOG.md',
              uses: 'yashanand1910/standard-release-notes@v1.5.0',
              id: 'get_release_notes',
              with: {
                version: '${{ github.ref }}',
              },
            },
            {
              name: 'Release to github',
              uses: 'softprops/action-gh-release@v3',
              with: {
                body: '${{ steps.get_release_notes.outputs.release_notes }}',
              },
            },
          ],
        },
      },
    });
  });

  expectGithubWorkflow(getReleaseWorkflowPreset().content);
});
