import { readableMultilineString } from 'src/utils/string';

const content = readableMultilineString`
  name: test

  on:
    push:
      branches:
        - "**"

  jobs:
    test:
      runs-on: ubuntu-latest
      env:
        CI: true
      steps:
        - name: Checkout code
          uses: actions/checkout@v4
        - name: Install node
          uses: actions/setup-node@v4
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
