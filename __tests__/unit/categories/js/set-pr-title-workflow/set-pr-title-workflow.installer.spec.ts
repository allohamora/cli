import { fileSystem } from '#__tests__/setup-test-context.ts';
import { setPrTitleWorkflow } from '#src/categories/js/set-pr-title-workflow/set-pr-title-workflow.installer.ts';
import { describe, expect, it } from 'vitest';

describe('set-pr-title-workflow.installer', () => {
  describe('setPrTitleWorkflow', () => {
    it('writes the default set-pr-title workflow', async () => {
      await setPrTitleWorkflow();

      expect(fileSystem.getDirs()).toEqual(['.github', '.github/workflows']);
      expect(fileSystem.readFile('.github/workflows/set-pr-title.yml')).toBe(
        [
          'name: set-pr-title',
          '',
          'on:',
          '  pull_request:',
          '    types:',
          '      - opened',
          '',
          'jobs:',
          '  set-pr-title:',
          '    runs-on: ubuntu-latest',
          '    permissions:',
          '      pull-requests: write',
          '    steps:',
          '      - name: Set PR title to branch name',
          '        uses: actions/github-script@v9',
          '        with:',
          '          script: |-',
          '            const userBranchPattern = /^\\w+\\/.+/; // e.g. feature/my-feature, bugfix/fix',
          '            const branch = context.payload.pull_request.head.ref;',
          '            if (!userBranchPattern.test(branch)) {',
          '              console.log(`Skipping branch: ${branch}`);',
          '              return;',
          '            }',
          '            const current = context.payload.pull_request.title;',
          '            const expected = branch.charAt(0).toUpperCase() + branch.slice(1);',
          '            if (current === expected) return;',
          '            await github.rest.pulls.update({',
          '              owner: context.repo.owner,',
          '              repo: context.repo.repo,',
          '              pull_number: context.payload.pull_request.number,',
          '              title: expected,',
          '            });',
          '',
        ].join('\n'),
      );
    });
  });
});
