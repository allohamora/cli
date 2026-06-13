import { fileSystem } from '#__tests__/setup-test-context.ts';
import { testWorkflow } from '#src/categories/js/test-workflow/test-workflow.installer.ts';
import { describe, expect, it } from 'vitest';

describe('test-workflow.installer', () => {
  describe('testWorkflow', () => {
    it('writes the default test workflow', async () => {
      await testWorkflow();

      expect(fileSystem.getDirs()).toEqual(['.github', '.github/workflows']);
      expect(fileSystem.readFile('.github/workflows/test.yml')).toBe(
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
          '',
        ].join('\n'),
      );
    });
  });
});
