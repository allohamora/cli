import { readableMultilineString } from 'src/utils/string';

const content = readableMultilineString`
  name: release

  on:
    push:
      tags:
        - "*.*.*"

  permissions:
    contents: write

  jobs:
    release:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout code
          uses: actions/checkout@v4
        - name: Get release notes from CHANGELOG.md
          uses: yashanand1910/standard-release-notes@v1.5.0
          id: get_release_notes
          with:
            version: \${{ github.ref }}
        - name: Release to github
          uses: softprops/action-gh-release@v2
          with:
            body: \${{ steps.get_release_notes.outputs.release_notes }}

`;

export const defaultConfig = {
  content,
};
