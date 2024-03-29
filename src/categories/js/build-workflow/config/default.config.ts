import { readableMultilineString } from 'src/utils/string';

const content = readableMultilineString`
  name: build

  on:
    push:
      branches:
        - "**"

  jobs:
    build:
      runs-on: ubuntu-latest
      env: 
        CI: true
      steps:
        - name: Checkout code
          uses: actions/checkout@v2
        - name: Install node
          uses: actions/setup-node@v2
          with:
            cache: "npm"
        - name: Install dependencies
          run: npm i
        - name: Run build
          run: npm run build
`;

export const defaultConfig = {
  content,
};
