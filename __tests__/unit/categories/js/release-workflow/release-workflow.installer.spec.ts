import { fileSystem, installationState, terminal } from '#__tests__/setup-test-context.ts';
import { releaseWorkflow } from '#src/categories/js/release-workflow/release-workflow.installer.ts';
import { describe, expect, it } from 'vitest';

const REPO_URL = 'https://github.com/allohamora/cli';

describe('release-workflow.installer', () => {
  describe('releaseWorkflow', () => {
    it('installs git-cliff', async () => {
      fileSystem.seed({ packageJson: { homepage: `${REPO_URL}#readme` } });

      await releaseWorkflow();

      expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', 'git-cliff']]]);
    });

    it('writes cliff.toml with the repo url from homepage', async () => {
      fileSystem.seed({ packageJson: { homepage: `${REPO_URL}#readme` } });

      await releaseWorkflow();

      const cliffToml = fileSystem.readFile('cliff.toml');
      expect(cliffToml).toContain(`{% set repo_url = "${REPO_URL}" %}`);
      expect(cliffToml).toContain('filter_unconventional = false');
      expect(cliffToml).toContain('{ message = "^Merge pull request", skip = true }');
      expect(cliffToml).toContain('{ message = "^Merge branch", skip = true }');
      expect(cliffToml).toContain('{ message = "^Merge remote-tracking branch", skip = true }');
    });

    it('writes release workflow', async () => {
      fileSystem.seed({ packageJson: { homepage: `${REPO_URL}#readme` } });

      await releaseWorkflow();

      expect(fileSystem.readFile('.github/workflows/release.yml')).toBe(
        [
          'name: release',
          '',
          'on:',
          '  workflow_dispatch:',
          '    inputs:',
          '      version:',
          '        description: Version (e.g. 1.2.3). Leave empty to auto-calculate',
          '        required: false',
          '        type: string',
          '',
          'concurrency:',
          '  group: release',
          '  cancel-in-progress: false',
          '',
          'jobs:',
          '  release:',
          '    runs-on: ubuntu-latest',
          '    timeout-minutes: 15',
          '    permissions:',
          '      contents: write',
          '      actions: write',
          '    steps:',
          '      - name: Restrict to default branch',
          '        if: github.ref_name != github.event.repository.default_branch',
          '        run: |-',
          "          echo \"Error: releases can only be run from the default branch '${{ github.event.repository.default_branch }}' (got '${{ github.ref_name }}').\"",
          '          exit 1',
          '',
          '      - name: Checkout code',
          '        uses: actions/checkout@v7',
          '        with:',
          '          fetch-depth: 0',
          '          fetch-tags: true',
          '',
          '      - name: Install node',
          '        uses: actions/setup-node@v6',
          '        with:',
          '          cache: npm',
          '',
          '      - name: Install dependencies',
          '        run: npm ci',
          '',
          '      - name: Validate version',
          "        if: inputs.version != ''",
          '        run: |-',
          '          if ! echo "${{ inputs.version }}" | grep -qE \'^[0-9]+\\.[0-9]+\\.[0-9]+$\'; then',
          '            echo "Error: version must be in X.Y.Z format (e.g. 1.2.3), got: ${{ inputs.version }}"',
          '            exit 1',
          '          fi',
          '          if git tag -l "v${{ inputs.version }}" | grep -q .; then',
          '            echo "Error: tag v${{ inputs.version }} already exists"',
          '            exit 1',
          '          fi',
          '',
          '      - name: Get version',
          '        id: version',
          '        run: |-',
          '          if [ -n "${{ inputs.version }}" ]; then',
          '            echo "version=${{ inputs.version }}" >> $GITHUB_OUTPUT',
          '          else',
          '            echo "version=$(npx --no-install git-cliff --bumped-version | sed \'s/^v//\')" >> $GITHUB_OUTPUT',
          '          fi',
          '',
          '      - name: Generate changelog',
          '        run: npx --no-install git-cliff --tag v${{ steps.version.outputs.version }} -o CHANGELOG.md',
          '',
          '      - name: Configure git',
          '        run: |-',
          "          git config user.name 'github-actions[bot]'",
          "          git config user.email '41898282+github-actions[bot]@users.noreply.github.com'",
          '',
          '      - name: Bump version in package.json',
          '        run: npm version ${{ steps.version.outputs.version }} --no-git-tag-version --workspaces --include-workspace-root',
          '',
          '      - name: Commit and tag',
          '        run: |-',
          '          git add .',
          "          git commit -m 'chore: release v${{ steps.version.outputs.version }}'",
          '          git tag v${{ steps.version.outputs.version }}',
          '          git push origin HEAD:${{ github.ref_name }}',
          '          git push origin v${{ steps.version.outputs.version }}',
          '',
          '      - name: Generate release notes',
          '        env:',
          '          REMOVE_TITLE: "true"',
          '        run: npx --no-install git-cliff --latest --strip header -o release-notes.md',
          '',
          '      - name: Create release',
          '        env:',
          '          GH_TOKEN: ${{ github.token }}',
          '        run: |-',
          '          gh release create v${{ steps.version.outputs.version }} \\',
          '            --title "${{ steps.version.outputs.version }}" \\',
          '            --notes-file release-notes.md',
          '',
        ].join('\n'),
      );
    });

    it('does not add trigger publish step when publish-workflow is not selected', async () => {
      fileSystem.seed({ packageJson: { homepage: `${REPO_URL}#readme` } });

      await releaseWorkflow();

      const content = fileSystem.readFile('.github/workflows/release.yml');
      expect(content).not.toContain('Trigger publish');
    });

    it('adds trigger publish step when publish-workflow is selected', async () => {
      fileSystem.seed({ packageJson: { homepage: `${REPO_URL}#readme` } });
      installationState.setSelectedInstallOptions(['publishWorkflow']);

      await releaseWorkflow();

      const content = fileSystem.readFile('.github/workflows/release.yml');
      expect(content).toContain('name: Trigger publish');
      expect(content).toContain('gh workflow run publish.yml --ref v${{ steps.version.outputs.version }}');
    });

    it('throws when homepage is missing', async () => {
      await expect(releaseWorkflow()).rejects.toThrow('homepage is missing in package.json');
    });
  });
});
