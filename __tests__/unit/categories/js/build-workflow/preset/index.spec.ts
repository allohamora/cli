import { getBuildWorkflowPreset } from '#src/categories/js/build-workflow/preset/index.ts';
import { expectGithubWorkflow } from '#__tests__/utils/github.utils.ts';
import { describe, expect, it } from 'vitest';

describe('build-workflow/preset', () => {
  it('returns the build workflow content', () => {
    expect(getBuildWorkflowPreset().content).toBe(
      [
        'name: build',
        '',
        'on:',
        '  push:',
        '    branches:',
        '      - "**"',
        '',
        'jobs:',
        '  build:',
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
        '        run: npm i',
        '      - name: Run build',
        '        run: npm run build',
      ].join('\n'),
    );
  });

  expectGithubWorkflow(getBuildWorkflowPreset().content);
});
