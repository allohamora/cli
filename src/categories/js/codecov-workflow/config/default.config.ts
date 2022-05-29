import { readableMultilineString } from 'src/utils/string';

const content = readableMultilineString`
  name: codecov

  on: [push]

  jobs:
    codecov:
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
        - name: Collect coverage
          run: npm run test:coverage
        - name: Upload coverage to Codecov
          uses: codecov/codecov-action@v2
          with:
            token: \${{ secrets.CODECOV_TOKEN }}
`;

export const defaultConfig = {
  content,
};
