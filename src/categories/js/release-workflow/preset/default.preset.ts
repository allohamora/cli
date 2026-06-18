import { nvmrcWorkflowMutation } from '#src/categories/js/nvmrc/nvmrc.service.ts';
import { publishWorkflowReleaseMutation } from '#src/categories/js/publish-workflow/publish-workflow.service.ts';

export const createCliffConfig = (repoUrl: string) =>
  String.raw`
# git-cliff ~ configuration file
# https://git-cliff.org/docs/configuration

[changelog]
header = """
# Changelog

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.
"""
postprocessors = [
    { pattern = '<!-- \d+ -->', replace = "" },
]
body = """\
{% set repo_url = "${repoUrl}" %}\
{% if get_env(name="REMOVE_TITLE", default="") == "" %}\
{% if version %}\
{% if previous.version %}\
\n## [{{ version | trim_start_matches(pat="v") }}]({{ repo_url }}/compare/{{ previous.version }}...{{ version }}) ({{ timestamp | date(format="%Y-%m-%d") }})\n\n\
{% else %}\
\n## {{ version | trim_start_matches(pat="v") }} ({{ timestamp | date(format="%Y-%m-%d") }})\n\n\
{% endif %}\
{% else %}\
\n## [Unreleased]\n\n\
{% endif %}\
{% endif %}\
{% for group, commits in commits | group_by(attribute="group") %}\
{% if not loop.first %}\
\n\
{% endif %}\
### {{ group | upper_first }}\n\
{% for commit in commits %}\
- {% if commit.scope %}**{{ commit.scope }}:** {% endif %}{{ commit.message | split(pat="\n") | first | upper_first }}{% if commit.breaking_description and commit.breaking_description != commit.message %} → {{ commit.breaking_description }}{% endif %} ([{{ commit.id | truncate(length=7, end="") }}]({{ repo_url }}/commit/{{ commit.id }}))\n\
{% endfor %}\
{% endfor %}
"""

[git]
filter_unconventional = false
commit_parsers = [
    { message = "^\\w+(\\([^)]*\\))?!:", group = "<!-- 00 -->⚠ BREAKING CHANGES" },
    { footer = "^BREAKING CHANGE:", group = "<!-- 00 -->⚠ BREAKING CHANGES" },
    { message = "^feat", group = "<!-- 01 -->Features" },
    { message = "^fix", group = "<!-- 02 -->Bug Fixes" },
    { message = "^perf", group = "<!-- 03 -->Performance" },
    { message = "^refactor", group = "<!-- 04 -->Refactor" },
    { message = "^doc", group = "<!-- 05 -->Documentation" },
    { message = "^style", group = "<!-- 06 -->Styling" },
    { message = "^test", group = "<!-- 07 -->Testing" },
    { message = "^revert", group = "<!-- 08 -->Revert" },
    { message = "^chore: release v\\d+\\.\\d+\\.\\d+", skip = true },
    { message = "^Merge pull request", skip = true },
    { message = "^ci", group = "<!-- 09 -->Continuous Integration" },
    { message = "^chore", group = "<!-- 10 -->Chores" },
    { message = ".*", group = "<!-- 11 -->Other" },
]
`.trim();

export const content = {
  name: 'release',
  on: {
    workflow_dispatch: {
      inputs: {
        version: {
          description: 'Version (e.g. 1.2.3). Leave empty to auto-calculate',
          required: false,
          type: 'string',
        },
      },
    },
  },
  concurrency: {
    group: 'release',
    'cancel-in-progress': false,
  },
  jobs: {
    release: {
      'runs-on': 'ubuntu-latest',
      'timeout-minutes': 15,
      permissions: {
        contents: 'write',
        actions: 'write',
      },
      steps: [
        {
          name: 'Checkout code',
          uses: 'actions/checkout@v6',
          with: {
            'fetch-depth': 0,
            'fetch-tags': true,
          },
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
          name: 'Validate version',
          if: "inputs.version != ''",
          run: [
            'if ! echo "${{ inputs.version }}" | grep -qE \'^[0-9]+\\.[0-9]+\\.[0-9]+$\'; then',
            '  echo "Error: version must be in X.Y.Z format (e.g. 1.2.3), got: ${{ inputs.version }}"',
            '  exit 1',
            'fi',
            'if git tag -l "v${{ inputs.version }}" | grep -q .; then',
            '  echo "Error: tag v${{ inputs.version }} already exists"',
            '  exit 1',
            'fi',
          ].join('\n'),
        },
        {
          name: 'Get version',
          id: 'version',
          run: [
            'if [ -n "${{ inputs.version }}" ]; then',
            '  echo "version=${{ inputs.version }}" >> $GITHUB_OUTPUT',
            'else',
            '  echo "version=$(npx --no-install git-cliff --bumped-version | sed \'s/^v//\')" >> $GITHUB_OUTPUT',
            'fi',
          ].join('\n'),
        },
        {
          name: 'Generate changelog',
          run: 'npx --no-install git-cliff --tag v${{ steps.version.outputs.version }} -o CHANGELOG.md',
        },
        {
          name: 'Configure git',
          run: [
            "git config user.name 'github-actions[bot]'",
            "git config user.email '41898282+github-actions[bot]@users.noreply.github.com'",
          ].join('\n'),
        },
        {
          name: 'Bump version in package.json',
          run: 'npm version ${{ steps.version.outputs.version }} --no-git-tag-version --workspaces --include-workspace-root',
        },
        {
          name: 'Commit and tag',
          run: [
            'git add .',
            "git commit -m 'chore: release v${{ steps.version.outputs.version }}'",
            'git tag v${{ steps.version.outputs.version }}',
            'git push origin HEAD:${{ github.ref_name }}',
            'git push origin v${{ steps.version.outputs.version }}',
          ].join('\n'),
        },
        {
          name: 'Generate release notes',
          env: {
            REMOVE_TITLE: 'true',
          },
          run: 'npx --no-install git-cliff --latest --strip header -o release-notes.md',
        },
        {
          name: 'Create release',
          env: {
            GH_TOKEN: '${{ github.token }}',
          },
          run: [
            'gh release create v${{ steps.version.outputs.version }} \\',
            '  --title "${{ steps.version.outputs.version }}" \\',
            '  --notes-file release-notes.md',
          ].join('\n'),
        },
      ],
    },
  },
};

export const defaultPreset = {
  createCliffConfig,
  content,
  mutations: [nvmrcWorkflowMutation, publishWorkflowReleaseMutation],
};
