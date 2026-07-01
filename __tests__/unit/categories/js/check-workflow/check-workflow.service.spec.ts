import { fileSystem, installationState } from '#__tests__/setup-test-context.ts';
import {
  CheckScriptName,
  getAvailableCheckScripts,
  isBuildAvailable,
  isCheckAvailable,
  isFormatAvailable,
  isLintAvailable,
  isTypecheckAvailable,
} from '#src/categories/js/check-workflow/check-workflow.service.ts';
import { describe, expect, it } from 'vitest';

describe('check-workflow.service', () => {
  describe('availability checks', () => {
    it('returns lint as available if eslint is selected for install', async () => {
      installationState.setSelectedInstallOptions(['eslint']);

      expect(await isLintAvailable()).toBe(true);
    });

    it('returns lint as available if lint script exists', async () => {
      fileSystem.seed({ packageJson: { scripts: { lint: 'eslint "**/*.ts"' } } });

      expect(await isLintAvailable()).toBe(true);
    });

    it('returns lint as unavailable if only eslint config exists', async () => {
      fileSystem.writeFile('eslint.config.mjs', '');

      expect(await isLintAvailable()).toBe(false);
    });

    it('returns format as available if prettier is selected for install', async () => {
      installationState.setSelectedInstallOptions(['prettier']);

      expect(await isFormatAvailable()).toBe(true);
    });

    it('returns format as available if format script exists', async () => {
      fileSystem.seed({ packageJson: { scripts: { format: 'prettier . --check' } } });

      expect(await isFormatAvailable()).toBe(true);
    });

    it('returns format as unavailable if only prettier config exists', async () => {
      fileSystem.writeFile('.prettierrc', '');

      expect(await isFormatAvailable()).toBe(false);
    });

    it('returns check as available only if check script exists', async () => {
      expect(await isCheckAvailable()).toBe(false);

      fileSystem.seed({ packageJson: { scripts: { check: 'astro check' } } });

      expect(await isCheckAvailable()).toBe(true);
    });

    it('returns typecheck as available only if typecheck script exists', async () => {
      expect(await isTypecheckAvailable()).toBe(false);

      fileSystem.seed({ packageJson: { scripts: { typecheck: 'tsc --noEmit' } } });

      expect(await isTypecheckAvailable()).toBe(true);
    });

    it('returns build as available only if build script exists', async () => {
      expect(await isBuildAvailable()).toBe(false);

      fileSystem.seed({ packageJson: { scripts: { build: 'rolldown -c' } } });

      expect(await isBuildAvailable()).toBe(true);
    });
  });

  describe('getAvailableCheckScripts', () => {
    it('returns available scripts in check workflow order', async () => {
      installationState.setSelectedInstallOptions(['eslint', 'prettier']);
      fileSystem.seed({
        packageJson: { scripts: { check: 'astro check', typecheck: 'tsc --noEmit', build: 'rolldown -c' } },
      });

      const actual = await getAvailableCheckScripts();

      expect(actual).toEqual([
        CheckScriptName.Lint,
        CheckScriptName.Format,
        CheckScriptName.Typecheck,
        CheckScriptName.Check,
        CheckScriptName.Build,
      ]);
    });

    it('returns an empty list if no checks are available', async () => {
      expect(await getAvailableCheckScripts()).toEqual([]);
    });
  });
});
