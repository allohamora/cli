import { getConfig } from '#src/categories/js/test-workflow/config/index.ts';
import { expectGithubWorkflow } from '#__tests__/utils/github.utils.ts';

describe('test-workflow/config', () => {
  it('returns the test workflow content', () => {
    expect(getConfig().content).toBe(
      [
        'name: test',
        '',
        'on:',
        '  push:',
        '    branches:',
        '      - "**"',
        '',
        'jobs:',
        '  test:',
        '    runs-on: ubuntu-latest',
        '    env:',
        '      CI: true',
        '    steps:',
        '      - name: Checkout code',
        '        uses: actions/checkout@v4',
        '      - name: Install node',
        '        uses: actions/setup-node@v4',
        '        with:',
        '          cache: "npm"',
        '      - name: Install dependencies',
        '        run: npm ci',
        '      - name: Run tests',
        '        run: npm run test',
      ].join('\n'),
    );
  });

  expectGithubWorkflow(getConfig().content);
});
