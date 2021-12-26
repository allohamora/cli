import { jsCategoryState } from 'src/utils/categories';
import { addJsonFileToRoot } from 'src/utils/fs';
import { addScripts, addToPackageJson, getPackageJson, installDevelopmentDependencies } from 'src/utils/npm';

const defaultConfig = {
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
  packageJsonConfig: {
    skip: { tag: true },
  },
  scripts: [
    { name: 'release', script: 'standard-version --tag-prefix=' },
    { name: 'release:minor', script: 'standard-version --release-as minor --tag-prefix=' },
    { name: 'release:patch', script: 'standard-version --release-as patch --tag-prefix=' },
    { name: 'release:major', script: 'standard-version --release-as major --tag-prefix=' },
  ],
};

const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});

export const standardVersion = async () => {
  const { createConfig, packageJsonConfig, scripts } = getConfig();

  await installDevelopmentDependencies('standard-version');

  const packageJson = await getPackageJson();
  const repositoryUrl = packageJson.homepage?.replace(/#.+$/, '') ?? '<repository url>';
  const config = createConfig(repositoryUrl);

  await addJsonFileToRoot('.versionrc.json', config);
  await addToPackageJson('standard-version', packageJsonConfig);
  await addScripts(...scripts);
};
