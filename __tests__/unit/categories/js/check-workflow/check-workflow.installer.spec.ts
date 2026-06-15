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
          '    steps:',
          '      - name: Checkout code',
          '        uses: actions/checkout@v6',
          '',
          '      - name: Install node',
          '        uses: actions/setup-node@v6',
          '        with:',
          '          cache: npm',
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

    it('writes node-version-file if nvmrc is installed', async () => {
      installationState.setSelectedInstallOptions(['nvmrc']);

      await checkWorkflow();

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
          '    steps:',
          '      - name: Checkout code',
          '        uses: actions/checkout@v6',
          '',
          '      - name: Install node',
          '        uses: actions/setup-node@v6',
          '        with:',
          '          cache: npm',
          '          node-version-file: .nvmrc',
          '',
          '      - name: Install dependencies',
          '        run: npm ci',
          '',
        ].join('\n'),
      );
    });

    it('writes node-version-file if .nvmrc exists', async () => {
      fileSystem.writeFile('.nvmrc', '24.14.1\n');

      await checkWorkflow();

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
          '    steps:',
          '      - name: Checkout code',
          '        uses: actions/checkout@v6',
          '',
          '      - name: Install node',
          '        uses: actions/setup-node@v6',
          '        with:',
          '          cache: npm',
          '          node-version-file: .nvmrc',
          '',
          '      - name: Install dependencies',
          '        run: npm ci',
          '',
        ].join('\n'),
      );
    });
  });
});
