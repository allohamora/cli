import { fileSystem, installationState } from '#__tests__/setup-test-context.ts';
import { checkWorkflow } from '#src/categories/js/check-workflow/check-workflow.installer.ts';
import { describe, expect, it } from 'vitest';

describe('check-workflow.installer', () => {
  describe('checkWorkflow', () => {
    it('writes the default check workflow', async () => {
      installationState.setSelectedInstallOptions(['eslint', 'prettier']);
      fileSystem.seed({ packageJson: { scripts: { typecheck: 'tsc --noEmit', build: 'rolldown -c' } } });

      await checkWorkflow();

      expect(fileSystem.getDirs()).toEqual(['.github', '.github/workflows']);
      expect(fileSystem.readFile('.github/workflows/check.yml')).toBe(
        [
          'name: check',
          '',
          'on:',
          '  push:',
          '    branches:',
          '      - "**"',
          '',
          'jobs:',
          '  check:',
          '    runs-on: ubuntu-latest',
          '    env:',
          '      CI: true',
          '    steps:',
          '      - name: Checkout code',
          '        uses: actions/checkout@v6',
          '',
          '      - name: Install node',
          '        uses: actions/setup-node@v6',
          '        with:',
          '          node-version-file: ".nvmrc"',
          '          cache: "npm"',
          '',
          '      - name: Install dependencies',
          '        run: npm ci',
          '',
          '      - name: Run lint',
          '        run: npm run lint',
          '',
          '      - name: Run format',
          '        run: npm run format',
          '',
          '      - name: Run typecheck',
          '        run: npm run typecheck',
          '',
          '      - name: Run build',
          '        run: npm run build',
          '',
        ].join('\n'),
      );
    });
  });
});
