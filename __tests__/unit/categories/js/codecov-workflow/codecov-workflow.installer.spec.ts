import { fileSystem } from '#__tests__/setup-test-context.ts';
import { codecovWorkflow } from '#src/categories/js/codecov-workflow/codecov-workflow.installer.ts';
import { describe, expect, it } from 'vitest';

describe('codecov-workflow.installer', () => {
  describe('codecovWorkflow', () => {
    it('writes the default codecov workflow', async () => {
      await codecovWorkflow();

      expect(fileSystem.getDirs()).toEqual(['.github', '.github/workflows']);
      expect(fileSystem.readFile('.github/workflows/codecov.yml')).toBe(
        [
          'name: codecov',
          'on:',
          '  - push',
          'jobs:',
          '  codecov:',
          '    runs-on: ubuntu-latest',
          '    env:',
          '      CI: true',
          '    steps:',
          '      - name: Checkout code',
          '        uses: actions/checkout@v4',
          '      - name: Install node',
          '        uses: actions/setup-node@v4',
          '        with:',
          '          cache: npm',
          '      - name: Install dependencies',
          '        run: npm ci',
          '      - name: Collect coverage',
          '        run: npm run test:coverage',
          '      - name: Upload coverage to Codecov',
          '        uses: codecov/codecov-action@v4',
          '',
        ].join('\n'),
      );
    });
  });
});
