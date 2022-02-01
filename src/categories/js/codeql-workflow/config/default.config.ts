import { readableMultilineString } from 'src/utils/string';

const content = readableMultilineString`
  name: codeql

  on: push

  jobs:
    analyse:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout code
          uses: actions/checkout@v2
        - name: Initialize CodeQL
          uses: github/codeql-action/init@v1
        - name: Run CodeQL analyze
          uses: github/codeql-action/analyze@v1
`;

export const defaultConfig = {
  content,
};
