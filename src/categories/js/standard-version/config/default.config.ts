export const defaultConfig = {
  createConfig: (repositoryUrl: string) => ({
    types: [
      { type: 'feat', section: 'Features' },
      { type: 'fix', section: 'Bug Fixes' },
      { type: 'chore', hidden: true },
      { type: 'docs', hidden: true },
      { type: 'style', hidden: true },
      { type: 'refactor', hidden: true },
      { type: 'perf', hidden: true },
      { type: 'test', hidden: true },
    ],
    commitUrlFormat: `${repositoryUrl}/commit/{{hash}}`,
    compareUrlFormat: `${repositoryUrl}/compare/{{previousTag}}...{{currentTag}}`,
  }),
  scripts: [
    { name: 'release', script: 'standard-version --tag-prefix=' },
    { name: 'release:minor', script: 'standard-version --release-as minor --tag-prefix=' },
    { name: 'release:patch', script: 'standard-version --release-as patch --tag-prefix=' },
    { name: 'release:major', script: 'standard-version --release-as major --tag-prefix=' },
  ],
};
