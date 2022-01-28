import { prettyMultilineFormat } from 'src/utils/string';

const content = prettyMultilineFormat`
  name: test

  on:
    push:
      branches:
        - "**"

  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout code
          uses: actions/checkout@v2
        - name: Install node
          uses: actions/setup-node@v2
          with:
            cache: "npm"
        - name: Install dependencies
          run: npm i
        - name: Run tests
          run: npm run test
`;

export const defaultConfig = {
  content,
};
