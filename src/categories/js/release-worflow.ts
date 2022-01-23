import { jsCategoryState } from 'src/libs/categories';
import { addGithubWorkflow } from 'src/libs/github';

const content = `name: release

on:
  push:
    tags:
      - "*.*.*"

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Get release notes from CHANGELOG.md
        uses: yashanand1910/standard-release-notes@v1.2.1
        id: get_release_notes
        with:
          version: \${{ github.ref }}
      - name: Release to github
        uses: softprops/action-gh-release@v1
        with:
          body: \${{ steps.get_release_notes.outputs.release_notes }}

`;

const defaultConfig = {
  filename: 'release.yml',
  content,
};

const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});

export const releaseWorkflow = async () => {
  const { filename, content } = getConfig();

  await addGithubWorkflow(filename, content);
};
