import { fileSystem } from '#__tests__/setup-test-context.ts';
import { releaseWorkflow } from '#src/categories/js/release-workflow/release-workflow.installer.ts';
import { describe, expect, it } from 'vitest';

describe('release-workflow.installer', () => {
  describe('releaseWorkflow', () => {
    it('writes the default release workflow', async () => {
      await releaseWorkflow();

      expect(fileSystem.getDirs()).toEqual(['.github', '.github/workflows']);
      expect(fileSystem.readFile('.github/workflows/release.yml')).toBe(
        [
          'name: release',
          '',
          'on:',
          '  push:',
          '    tags:',
          '      - "*.*.*"',
          '',
          'permissions:',
          '  contents: write',
          '',
          'jobs:',
          '  release:',
          '    runs-on: ubuntu-latest',
          '    steps:',
          '      - name: Checkout code',
          '        uses: actions/checkout@v6',
          '',
          '      - name: Get release notes from CHANGELOG.md',
          '        uses: yashanand1910/standard-release-notes@v1.5.0',
          '        id: get_release_notes',
          '        with:',
          '          version: ${{ github.ref }}',
          '',
          '      - name: Release to github',
          '        uses: softprops/action-gh-release@v3',
          '        with:',
          '          body: ${{ steps.get_release_notes.outputs.release_notes }}',
          '',
        ].join('\n'),
      );
    });
  });
});
