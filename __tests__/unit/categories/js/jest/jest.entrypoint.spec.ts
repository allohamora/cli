import { presetState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { jest } from '#src/categories/js/jest/jest.entrypoint.ts';
import { beforeEach, describe, expect, it } from 'vitest';

describe('jest.entrypoint', () => {
  beforeEach(() => {
    presetState.setJsPreset('default');
  });

  describe('jest', () => {
    it('installs jest dependencies and writes the default config file', async () => {
      await jest();

      expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', 'jest', '@types/jest']]]);
      expect(fileSystem.readFile('jest.config.cjs')).toBe(
        [
          `/** @type {import('jest').Config} */`,
          'module.exports = {',
          `  testEnvironment: 'node',`,
          `  testRegex: '.*\\\\.(spec|test)\\\\.js$',`,
          `  collectCoverageFrom: ['src/**/*.js'],`,
          '  passWithNoTests: true,',
          '};',
          '',
        ].join('\n'),
      );
    });

    it('adds test scripts to package.json', async () => {
      fileSystem.seed({ packageJson: { scripts: { lint: 'eslint "**/*.js"' } } });

      await jest();

      expect(fileSystem.readJson('package.json')).toEqual({
        scripts: {
          lint: 'eslint "**/*.js"',
          test: 'jest',
          'test:watch': 'jest --watch',
          'test:coverage': 'jest --coverage',
        },
      });
    });
  });
});
