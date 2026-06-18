import { fileSystem } from '#__tests__/setup-test-context.ts';
import { publishWorkflow } from '#src/categories/js/publish-workflow/publish-workflow.installer.ts';
import { describe, expect, it } from 'vitest';

describe('publish-workflow.installer', () => {
  describe('publishWorkflow', () => {
    it('writes publish workflow', async () => {
      await publishWorkflow();

      expect(fileSystem.readFile('.github/workflows/publish.yml')).toBe(
        [
          'name: publish',
          '',
          'on:',
          '  workflow_dispatch:',
          '',
          'concurrency:',
          '  group: publish',
          '  cancel-in-progress: false',
          '',
          'jobs:',
          '  publish:',
          '    runs-on: ubuntu-latest',
          '    timeout-minutes: 15',
          '    permissions:',
          '      id-token: write',
          '      contents: read',
          '    steps:',
          '      - name: Checkout code',
          '        uses: actions/checkout@v6',
          '',
          '      - name: Setup Node.js',
          '        uses: actions/setup-node@v6',
          '        with:',
          '          registry-url: https://registry.npmjs.org',
          '          package-manager-cache: false',
          '',
          '      - name: Install dependencies',
          '        run: npm ci',
          '',
          '      - name: Build',
          '        run: npm run build',
          '',
          '      - name: Publish to npm',
          '        run: npm publish',
          '',
        ].join('\n'),
      );
    });

    it('adds node-version-file when nvmrc exists', async () => {
      fileSystem.seed({ files: { '.nvmrc': '22' } });

      await publishWorkflow();

      const content = fileSystem.readFile('.github/workflows/publish.yml');
      expect(content).toContain('node-version-file: .nvmrc');
    });
  });
});
