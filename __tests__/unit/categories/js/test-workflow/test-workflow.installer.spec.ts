import { fileSystem, installationState } from '#__tests__/setup-test-context.ts';
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
          '      - name: Run tests',
          '        run: npm run test',
          '',
        ].join('\n'),
      );
    });

    it('writes node-version-file if nvmrc is installed', async () => {
      installationState.setSelectedInstallOptions(['nvmrc']);

      await testWorkflow();

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
          '      - name: Run tests',
          '        run: npm run test',
          '',
        ].join('\n'),
      );
    });

    it('writes node-version-file if .nvmrc exists', async () => {
      fileSystem.writeFile('.nvmrc', '24.14.1\n');

      await testWorkflow();

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
          '      - name: Run tests',
          '        run: npm run test',
          '',
        ].join('\n'),
      );
    });
  });
});
