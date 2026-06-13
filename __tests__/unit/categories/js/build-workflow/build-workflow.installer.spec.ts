import { fileSystem } from '#__tests__/setup-test-context.ts';
import { buildWorkflow } from '#src/categories/js/build-workflow/build-workflow.installer.ts';
import { describe, expect, it } from 'vitest';

describe('build-workflow.installer', () => {
  describe('buildWorkflow', () => {
    it('writes the default build workflow', async () => {
      await buildWorkflow();

      expect(fileSystem.getDirs()).toEqual(['.github', '.github/workflows']);
      expect(fileSystem.readFile('.github/workflows/build.yml')).toBe(
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
          '',
        ].join('\n'),
      );
    });
  });
});
