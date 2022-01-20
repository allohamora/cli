import { jsCategoryState } from 'src/utils/categories';
import { addGithubAction } from 'src/utils/github';

const content = `name: Create Release

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
      - name: Parse CHANGELOG.md
        id: changelog
        uses: coditory/changelog-parser@v1
      - name: Release to github
        uses: softprops/action-gh-release@v1
        with:
          body: \${{ steps.changelog.outputs.description }}
`;

const defaultConfig = {
  filename: 'release.yml',
  content,
};

const [getConfig] = jsCategoryState.useConfigState({
  default: defaultConfig,
});

export const createReleaseAction = async () => {
  const { filename, content } = getConfig();

  await addGithubAction(filename, content);
};
