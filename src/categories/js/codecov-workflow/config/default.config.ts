import dedent from 'dedent';

const content = dedent`
  name: codecov

  on: [push]

  jobs:
    codecov:
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
          run: npm ci
        - name: Collect coverage
          run: npm run test:coverage
        - name: Upload coverage to Codecov
          uses: codecov/codecov-action@v4
`;

export const defaultConfig = {
  content,
};
